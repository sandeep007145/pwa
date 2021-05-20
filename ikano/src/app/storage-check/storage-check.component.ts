import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage-check',
  templateUrl: './storage-check.component.html',
  styleUrls: ['./storage-check.component.scss']
})
export class StorageCheckComponent implements OnInit {

  stores = [];

  CACHE_NAME = 'card';
  TOKEN_KEY = 'cardDetails';
  FAKE_TOKEN = 'sRKWQu6hCJgR25lslcf5s12FFVau0ugi';
  FAKE_ENDPOINT = '/card-details';

  constructor() { }

  ngOnInit() {
    this.setStorage();
    setTimeout(() => {
      this.getStorage();
    }, 1000);
  }

  setStorage() {
    if (!this.isInStandaloneMode()) {
      this.stores.push('Stand Alone Mode(In App): No');
      this.checkLocal(new Date().toUTCString());
      this.setcache(new Date().toUTCString());
    }
  }

  async getStorage() {
    if (this.isInStandaloneMode()) {
      this.stores.push('Stand Alone Mode(In App): Yes');
      this.returnLocal();
      this.getCache();
    }
  }

  isInStandaloneMode() {
    return ((window as any).clientInformation.standalone) ||
      (window.matchMedia('(display-mode: standalone)').matches) ||
      // tslint:disable-next-line:no-string-literal
      (navigator['standalone'] === true);
  }


  async setcache(data) {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      this.stores.push('Cache Availble: Available');
      const responseBody = JSON.stringify({
        [this.TOKEN_KEY]: data
      });
      const response = new Response(responseBody);
      await cache.put(this.FAKE_ENDPOINT, response);
      this.stores.push('Endpoint Used in cache: '  +  this.FAKE_ENDPOINT);
      this.stores.push('Value Stored in cache: ' + data);
    } catch (error) {
      this.stores.push('Cache Availble: Not available');
    }
  }

  async getCache() {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      this.stores.push('Cache Availble: Available');
      const response = await cache.match(this.FAKE_ENDPOINT);
      this.stores.push('Endpoint Used to get cache: '  +  this.FAKE_ENDPOINT);
      if (!response) {
        this.stores.push('Cache Found: No');
        return null;
      }
      this.stores.push('Cache Found: Yes');
      const responseBody = await response.json();
      this.stores.push('Value Retained From Cache: ' + responseBody[this.TOKEN_KEY]);
      return responseBody[this.TOKEN_KEY];
    } catch (error) {
      console.log('getToken error:', { error });
    }
  }

  async clearCache() {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(this.FAKE_ENDPOINT);
      if (!response) {
        return null;
      }
      cache.delete(this.FAKE_ENDPOINT);
    } catch (error) {
      console.log('getToken error:', { error });
    }
  }

  async displayCachedData() {
    const cachedToken = await this.getCache();
    return cachedToken;
  }

  checkLocal(data) {
    try {
      localStorage.setItem('localStorage', data);
      this.stores.push('Local Storage Available: Yes');
      this.stores.push('Key Used In LocalStorage: localStorage');
      this.stores.push('Value Stored in Local: ' + data);
    } catch {
      this.stores.push('Local Storage Available: No');
    }
  }

  returnLocal() {
    try {
      localStorage.getItem('localStorage');
      this.stores.push('Local Storage Available: Yes');
      this.stores.push('Key Used to retain LocalStorage: localStorage');
      this.stores.push('Value Retained from Local: ' + localStorage.getItem('localStorage'));
    } catch {
      this.stores.push('Local Storage Available: No');
    }
  }


}
