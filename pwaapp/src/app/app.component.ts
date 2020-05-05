import { Component } from '@angular/core';
import { PwaService } from './pwa/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sw: PwaService) {
    // check the service worker for updates
    this.sw.checkForUpdates();
  }
}
