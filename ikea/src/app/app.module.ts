import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Pdf417BarcodeModule } from "pdf417-barcode";
// modules

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { InterceptorService } from './Services/interceptor/interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

// token tokenGetter

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Pdf417BarcodeModule,
    NgxBarcode6Module,
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line:object-literal-shorthand
        tokenGetter: tokenGetter
        // whitelistedDomains: [],
        // blacklistedRoutes: []
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
