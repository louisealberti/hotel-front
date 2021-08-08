import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { ManagerRoutingModule } from "./manager-routing.module";
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";
import { ManagerIdComponent } from "./manager-id/manager-id.component";
import { RoomModule } from "../room/room.module";
import { AppRoutingModule } from "../app-routing.module";
import { CoreModule } from "../core/core.module";
import { CustomerModule } from "../customer/customer.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ManagerRoutingModule,

    ],
    declarations: [
        ManagerDashboardComponent,
        ManagerIdComponent,
    ],
    exports: [
        ManagerDashboardComponent,
    ]
})
export class ManagerModule { }