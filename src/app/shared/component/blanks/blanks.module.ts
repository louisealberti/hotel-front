import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputDateComponent } from "./input-date/input-date.component";
import { InputNumberComponent } from "./input-number/input-number.component";
import { InputTextComponent } from "./input-text/input-text.component";
import { ValidateBlanksService } from "./validate-blanks.service";

@NgModule({
    declarations: [
        InputDateComponent,
        InputNumberComponent,
        InputTextComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        InputDateComponent,
        InputNumberComponent,
        InputTextComponent,
    ]
})
export class BlanksModule { }