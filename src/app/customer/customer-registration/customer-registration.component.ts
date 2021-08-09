import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidateBlanksService } from "../../shared/component/blanks/validate-blanks.service";
import { Customer } from "../../shared/models/customer";

import { CustomerService } from "../customer.service";

@Component({
    selector: 'app-customer-registration',
    templateUrl: './customer-registration.component.html',
})
export class CustomerRegistrationComponent implements OnInit {

    profileForm!: FormGroup;
    submitted = false;
    
    
    constructor(public validate: ValidateBlanksService, private fb: FormBuilder, 
                private customerService: CustomerService, private router: Router) { }

    get f() {
        return this.profileForm.controls;
    }

    ngOnInit() {

        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConf: ['', [Validators.required]]
        }); 
    }

    get getControl() {
        return this.profileForm.controls;
      }
    
    submit(): void {
        this.submitted = true;
        
        // stops if form is invalid
        if(this.profileForm.invalid) {
            return;
        }
       
        const customer = this.profileForm.getRawValue() as Customer;
        this.addCustomer(customer);

        this.router.navigateByUrl('dashboard/customer/list');
    }

    private addCustomer(customer: Customer): void {
        this.customerService.addCustomer(customer).subscribe(() => {
            alert('SUCESSO!!');
        },
        () => {
            alert('FALHA!!');
        });
    }

}