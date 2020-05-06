import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent = null;
  constructor(public updates: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      console.log(event);
      
      this.promptEvent = event;
    });
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload()); 
  }
}
