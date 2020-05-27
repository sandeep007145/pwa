import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
  ) { }

  //  http service is used for all httpClient methods to avoid writing large
  //  number of test cases and minium usage of httpClient

  public get(url: string, body?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (body) {
      Object.keys(body).forEach((key) => {
        httpParams = httpParams.append(key, body[key]);
      });
    }
    return this.http.get<any>(url, { params: httpParams });
  }
  public post(url: string, body?: any, headers?: any): Observable<any> {
    return this.http.post(url, body);
  }
  public put(url: string, body: any = {}): Observable<any> {
    return this.http.put(url, body);
  }
  public delete(url: string, body?: any): Observable<any> {
    return this.http.delete(url);
  }
  public patch(url: string, body?: any): Observable<any> {
    return this.http.patch(url, body);
  }
}
