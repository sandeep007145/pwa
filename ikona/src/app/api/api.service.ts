import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  tokenrefreshCalled = false;
  private readonly onLoginStateChange: any[] = [];

  constructor(
    private readonly http: HttpClient,
  ) { }

  public get(url: string, body?): Observable<any> {
   
      return this.http.get(url, { params: body });
  }

  public getFiles(url: string, body?): Observable<any> {
   
      return this.http.get(url, { responseType: 'blob', observe: 'response' });
  }

  public post(url: string, body?, headers?: any): Observable<any> {
   
      return this.http.post(url, body);
  }
  public put(url: string, body?): Observable<any> {
   
      return this.http.put(url, body);
  }
  public delete(url: string, body?): Observable<any> {
   
      return this.http.delete(url, { params: body });
  }
  public patch(url: string, body?): Observable<any> {
   
      return this.http.patch(url, body);
  }
  public getHeaders(url, body): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('data', body);
    return this.http.get(url, { headers: header });
  }

}
