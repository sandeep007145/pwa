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
    this.getStorage();
  }

  setStorage() {
    this.storageService.checkLocal(JSON.stringify({ data: 'Working' }));
    this.storageService.setcache(JSON.stringify({ data: 'Working' }));
  }

 async getStorage() {
    this.stores.push('local: ' +  this.storageService.returnLocal());
    this.stores.push('cache: ' + await this.storageService.displayCachedData());
  }


}
