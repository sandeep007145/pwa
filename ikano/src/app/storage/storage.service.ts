import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  CACHE_NAME = 'card';
  TOKEN_KEY = 'cardDetails';
  FAKE_TOKEN = 'sRKWQu6hCJgR25lslcf5s12FFVau0ugi';
  FAKE_ENDPOINT = '/card-details';

  constructor() { }

  async setcache(data) {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const responseBody = JSON.stringify({
        [this.TOKEN_KEY]: data
      });
      const response = new Response(responseBody);
      await cache.put(this.FAKE_ENDPOINT, response);
      console.log('Token saved! 🎉');
    } catch (error) {
      console.log('saveToken error:', { error });
    }
  }

  async getCache() {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(this.FAKE_ENDPOINT);
      if (!response) {
        return null;
      }
      const responseBody = await response.json();
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
    localStorage.setItem('check', data);
  }

  returnLocal() {
   return localStorage.getItem('check');
  }
}
