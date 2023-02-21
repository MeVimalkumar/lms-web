import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PrintErrorModule } from '../print-error/print-error.module';
import { UserFormComponent } from './user-form.component';



@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    PrintErrorModule
  ],
  exports: [
    UserFormComponent
  ]
})
export class UserFormModule { }
