import { Component } from '@angular/core';
import { PwaService } from './pwa/pwa.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  deviceInfo = null;
  constructor(private sw: PwaService, private deviceService: DeviceDetectorService, private http: HttpClient) {
    // check the service worker for updates
    this.sw.checkForUpdates();
    this.epicFunction();
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    this.deviceInfo = Object.assign(this.deviceInfo, {isMobile: isMobile, isTablet: isTablet, isDesktopDevice: isDesktopDevice})
    console.log(this.deviceInfo, this.deviceService.device);
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
})
  }
}
