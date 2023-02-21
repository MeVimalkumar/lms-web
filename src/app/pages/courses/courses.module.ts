import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
  ]
})
export class CoursesModule { }
