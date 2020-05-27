import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookie: CookieService) { }

  // storage service is used to set and remove data in localStoarge,
  // if in any case browser dosnt support local stoarge application will use cookies
  // automatically based on this service usage

  localStorage() {
    try {
      localStorage.setItem('key', 'value');
    } catch (e) {
      return false;
    }
    // tslint:disable-next-line:no-string-literal
    delete window.localStorage['key'];
    return true;
  }
  setData(key: string, value) {
    this.localStorage() ? window.localStorage[key] = value : this.cookie.set(key, value);
  }
  getData(key: string) {
    if (this.localStorage()) {
      return window.localStorage[key];
    } else {
      return this.cookie.get(key) || null;
    }
  }
  removeData(key: string) {
    this.localStorage() ? delete window.localStorage[key] : this.cookie.delete(key);
  }
  removeAllData() {
    this.localStorage() ? window.localStorage.clear() : this.cookie.deleteAll();
  }
}
