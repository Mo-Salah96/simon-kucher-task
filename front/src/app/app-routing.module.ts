import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'customer-detail/:id',
    component: CustomerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
