import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerHomeComponent } from './customer-home.component';
import { CustomerListComponent } from './customer-list.component';
import { CustomerProfileEditorComponent } from './customer-profile-editor.component';
import { CustomerProfileComponent } from './customer-profile.component';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { CustomerReservationComponent } from './customer-reservation.component';

const routes: Routes = [
  { path: 'home', component: CustomerHomeComponent },
  { path: 'customer/profile/:id', component: CustomerProfileComponent },
  { path: 'customer/profile', component: CustomerProfileComponent },
  { path: 'customer/profile/editor', component: CustomerProfileEditorComponent },
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/registration', component: CustomerRegistrationComponent },
  { path: 'customer/reservation', component: CustomerReservationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class CustomerRoutingModule { }