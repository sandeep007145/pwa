import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { TranslatePipe } from './pipes/translate/translate.pipe';
import { Pdf417BarcodeModule } from 'pdf417-barcode';


@NgModule({
  declarations: [
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcode6Module,
    Pdf417BarcodeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxBarcode6Module,
    TranslatePipe,
    Pdf417BarcodeModule
  ]
})
export class SharedModule { }