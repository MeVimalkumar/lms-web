import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { UserFormModule } from 'src/app/modules/user-form/user-form.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DynamicDialogModule,
    UserFormModule,
    ConfirmDialogModule
  ],
  providers: [
    DialogService,
    ConfirmationService
  ]
})
export class UsersModule { }
