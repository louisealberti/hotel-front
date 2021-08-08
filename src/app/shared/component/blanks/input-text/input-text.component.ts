import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidateBlanksService } from "../validate-blanks.service";

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['input-text.component.css']
})
export class InputTextComponent {

    @Input() name!: string;
    @Input() formGroup!: FormGroup;
    @Input() controlName!: string;
    
    constructor(public validate: ValidateBlanksService) { }

    get formControl(): AbstractControl {
        return this.formGroup.controls[this.controlName];
    }
}