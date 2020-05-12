import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private http: ApiService
  ) { }

  notify(data): Observable<any> {
    return this.http.post('https://fcm.googleapis.com/fcm/send', data);
  }
}
