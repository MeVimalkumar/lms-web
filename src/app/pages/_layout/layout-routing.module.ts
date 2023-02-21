import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
      },
      {
        path: 'courses',
        pathMatch: 'full',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'users',
        pathMatch: 'full',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
