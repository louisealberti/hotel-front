import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ManagerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
  )
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
