import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnemRoutingModule } from './onem-routing.module';
import { OnecmComponent } from './onecm/onecm.component';


@NgModule({
  declarations: [OnecmComponent],
  imports: [
    CommonModule,
    OnemRoutingModule
  ]
})
export class OnemModule { }
