import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [HomeComponent, LandingPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
