import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Customer } from "./customer";

import { CustomerService } from "./customer.service";

@Component({
    selector: 'app-customer-registration',
    templateUrl: './customer-registration.component.html',
})
export class CustomerRegistrationComponent implements OnInit {

    profileForm!: FormGroup;
    submitted = false;
    
    constructor(private fb: FormBuilder, private customerService: CustomerService) {
        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            cpf: [''],
            phone: [''],
            address: [''],
            password: ['', ],
            passwordConf: ['']
        }); 
     }

    ngOnInit(): void {
        
    }

    get getControl() {
        return this.profileForm.controls;
      }
    
    onSubmit(): void {
        this.submitted = true;
        
        // stops if form is invalid
        if(this.profileForm.invalid) {
            return;
        }
       
        console.log(JSON.stringify(this.profileForm.value, null, 2));
    }

    onReset(): void {
        this.submitted = false;
        this.profileForm.reset();
      }

    private addCustomer() {
        const data = {
            id: this.profileForm.value.id,
            firstName: this.profileForm.value.firstName,
            lastName: this.profileForm.value.lastName,
            email: this.profileForm.value.email,
            cpf: this.profileForm.value.cpf,
            phone: this.profileForm.value.phone,
            address: this.profileForm.value.address,
            password: this.profileForm.value.password
        } as Customer;

        this.customerService.addCustomer(data).subscribe(() => {
        });
    }

}