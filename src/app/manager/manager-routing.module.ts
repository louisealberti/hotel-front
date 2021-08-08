import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from '../customer/customer-list/customer-list.component';
import { CustomerProfileEditorComponent } from '../customer/customer-profile-editor/customer-profile-editor.component';
import { CustomerRegistrationComponent } from '../customer/customer-registration/customer-registration.component';
import { RoomCreateComponent } from '../room/room-create/room-create.component';
import { RoomEditorComponent } from '../room/room-editor/room-editor.component';
import { RoomListComponent } from '../room/room-list/room-list.component';

import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerIdComponent } from './manager-id/manager-id.component';

const routes: Routes = [
    { path: '', component: ManagerIdComponent },
    {
        path: 'dashboard', 
        component: ManagerDashboardComponent,
        children: [
            {
                path: 'customer/list',
                component: CustomerListComponent,
            },
            {
                path: 'customer/registration',
                component: CustomerRegistrationComponent,
            },
            {
                path: 'customer:id/profile/editor',
                component: CustomerProfileEditorComponent,
            },
            {
                path: 'room/list',
                component: RoomListComponent,
            },
            {
                path: 'room/create',
                component: RoomCreateComponent,
            },
            {
                path: 'room/edit',
                component: RoomEditorComponent,
            },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [
        RouterModule
    ]
})
export class ManagerRoutingModule { }