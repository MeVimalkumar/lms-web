import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrintErrorComponent } from './print-error.component';

@NgModule({
  declarations: [
    PrintErrorComponent
  ],
  imports: [
    CommonModule,
  ], exports: [
    PrintErrorComponent
  ]
})
export class PrintErrorModule { }
