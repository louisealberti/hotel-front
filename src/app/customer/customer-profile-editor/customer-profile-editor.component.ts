import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../customer.service";

@Component({
    selector: 'app-customer-profile-editor',
    templateUrl: './customer-profile-editor.component.html'
})
export class CustomerProfileEditorComponent {

    profileForm = this.fb.group({
        firstName: ['', Validators.required, Validators.minLength(3)],
        lastName: ['', Validators.required, Validators.minLength(3)],
        email: ['', Validators.required],
        cpf: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        password: ['', Validators.required, Validators.minLength(8)],
        passwordConfirmation: ['', Validators.required]
    });

    constructor(private fb: FormBuilder, private customerService: CustomerService) { }

    updateProfile() {
        this.profileForm.patchValue({
            firstName: '',
            lastName: '',
            email: '',
            cpf: '',
            phone: '',
            address: '',
            password: '',
            passwordConfirmation: ''

        });
    }
}