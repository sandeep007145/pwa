import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-storage-check',
  templateUrl: './storage-check.component.html',
  styleUrls: ['./storage-check.component.scss']
})
export class StorageCheckComponent implements OnInit {

  stores = [];

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.setStorage();
    setTimeout(() => {
      this.getStorage();
    }, 1000);
  }

  setStorage() {
    if (!this.isInStandaloneMode()) {
      this.storageService.checkLocal(JSON.stringify({ data: 'Working' }));
      this.storageService.setcache(JSON.stringify({ data: 'Working' }));
    }
  }

  async getStorage() {
    if (this.isInStandaloneMode()) {
      this.stores.push('In stand Alone mode');
      this.stores.push('local: ' + this.storageService.returnLocal());
      this.stores.push('cache: ' + await this.storageService.displayCachedData());
    } else {
      this.stores.push('Not in stand Alone mode');
    }
  }

  isInStandaloneMode() {
    return ((window as any).clientInformation.standalone) ||
      (window.matchMedia('(display-mode: standalone)').matches) ||
      // tslint:disable-next-line:no-string-literal
      (navigator['standalone'] === true);
  }


}
