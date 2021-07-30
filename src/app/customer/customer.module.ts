import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { CustomerHomeComponent } from "./customer-home.component";
import { CustomerListComponent } from "./customer-list.component";
import { CustomerProfileComponent } from "./customer-profile.component";
import { CustomerRegistrationComponent } from "./customer-registration.component";
import { CustomerReservationComponent } from "./customer-reservation.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerProfileEditorComponent } from "./customer-profile-editor.component";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CustomerRoutingModule,
    ],
    declarations: [
        CustomerHomeComponent,
        CustomerListComponent,
        CustomerProfileComponent,
        CustomerProfileEditorComponent,
        CustomerRegistrationComponent,
        CustomerReservationComponent,
    ]
})
export class CustomerModule { }