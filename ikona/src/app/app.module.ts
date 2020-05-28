import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslatePipe } from './pipes/translate/translate.pipe';
import { CardComponent } from './card/card/card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './Services/interceptor/interceptor.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Pdf417BarcodeModule } from "pdf417-barcode";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
