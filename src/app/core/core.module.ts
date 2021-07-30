import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomerModule } from "../customer/customer.module";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@NgModule({
    declarations: [
        NavBarComponent,
    ],
    imports: [
        CustomerModule,
        RouterModule,
    ],
    exports: [
        NavBarComponent,
    ]
})
export class CoreModule {
    
}