/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'ikona';
  displayToken: string;
  @ViewChild('gmap', {static: true}) gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;


  constructor(updates: SwUpdate, push: SwPush, private notify: NotifyService) {
    updates.available.subscribe(_ => updates.activateUpdate().then(() => {
      console.log('reload for update');
      document.location.reload();
    }));
    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
      navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr));
    }
  }

  ngOnInit() {
  }

  permitToNotify() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => {
        this.displayToken = token
        const data = { 
          "notification": {
           "title": "Hello World", 
           "body": "This is Message from Admin"
          },
          "to" : token
         };
         this.notify.notify(data);
        }))
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
  }

  
}
