/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { NotifyService } from './notify.service';
// import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ikona';
  interval;
  distance = 0;
  isNotified = false;
  displayToken: string;
  @ViewChild('gmap', {static: true}) gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;
  currentLatmoved: any;
  currentLongmoved: any;
  marker: google.maps.Marker;
  deferredPrompt;


  constructor(updates: SwUpdate, push: SwPush, public notify: NotifyService) {
    updates.available.subscribe(_ => updates.activateUpdate().then(() => {
      console.log('reload for update');
      document.location.reload();
    }));
    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
      navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr)).catch(err => {
        console.log('error occurs');
      });
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.showInstallPromotion();
    });
  }

  ngOnInit() {
  }

  showInstallPromotion() {
    if(this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      })
    }
  }

  notifyUser(token) {
    const data = {notification: {title: 'baba', body: 'Staty home stay safe', click_action: this.naviagteUser()},
     to: token ? token : 
     'cIvd6BicPKvNNpzf9Pu74k:APA91bHaVrosIer37htXL_K2HoS8CEBof2dYRitxXfuxg8U2IMOO9bxzh3HWZDN58QiEBv_jNXY9rxf9uRPvbl_tue_tq9Dj12ICQqsna7z-0iY17EiP3f_Zgj3C9aew1bwUxg9Jzk6a'}
    this.notify.notify(data).subscribe(res => {console.log(res);})
  }

  naviagteUser() {
    window.location.href = 'https://demoofpwa.herokuapp.com/'
  }

  permitToNotify() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => {
        this.displayToken = token
        }))
      .catch(err => {
        console.log('Unable to get permission to notify.');
      });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
   this.trackMe();
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
      console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
      console.log(this.getDistanceFromLatLonInKm(this.currentLat, this.currentLong, position.coords.latitude, position.coords.longitude));
       this.distance = this.getDistanceFromLatLonInKm(this.currentLat, this.currentLong, position.coords.latitude, position.coords.longitude);
      // this.currentLat = position.coords.latitude;
      // this.currentLong = position.coords.longitude;
      if(this.distance > 6000 && !this.isNotified) {
        this.isNotified = true;
        this.notifyUser(this.displayToken)
      }
  }

   getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000
  }

  ngOnDestroy() {
  }

  
}
