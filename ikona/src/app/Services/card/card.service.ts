import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  alldata;
  cardData;
  constructor(
    private http: HttpService
  ) { }

  getCardDetails(): Observable<any> {
    return this.http.get(environment.base_url + 'pwa/load');
  }

  sendDeviceInfo(data): Observable<any> {
    return this.http.post(environment.base_url + 'common/invitations/open', data);
  }
}