import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidateBlanksService } from "src/app/shared/component/blanks/validate-blanks.service";
import { Customer } from "src/app/shared/models/customer";
import { CustomerService } from "../customer.service";

@Component({
    selector: 'app-customer-profile-editor',
    templateUrl: './customer-profile-editor.component.html'
})
export class CustomerProfileEditorComponent implements OnInit {

    _id!: number;
    _customer!: Customer;
    profileForm!: FormGroup;

    submitted: boolean = false;

    constructor(public validate: ValidateBlanksService,
        private fb: FormBuilder,
        private customerService: CustomerService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    get f() {
        return this.profileForm.controls;
    }

    get getControl() {
        return this.profileForm.controls;
    }

    ngOnInit(): void {
        this._id = this.activatedRoute.snapshot.params['id'];
        if (this._id) {
            this.customerService.getCustomer(this._id)
                .subscribe((customer: Customer) => this.createForm(customer));
        } else {
            console.log('error');
        }
    }

    submit(): void {
        this.submitted = true;

        // stops if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        const customer = this.profileForm.getRawValue() as Customer;
        this.updateCustomer(customer);

        this.router.navigateByUrl('dashboard/customer/list');
    }

    private createForm(customer: Customer){
        this.profileForm = this.fb.group({
            firstName: [customer.firstName, [Validators.required, Validators.minLength(3)]],
            lastName: [customer.lastName, [Validators.required, Validators.minLength(3)]],
            email: [customer.email, [Validators.required]],
            cpf: [customer.cpf, [Validators.required]],
            phone: [customer.phone, [Validators.required]],
            address: [customer.address, [Validators.required]],
            password: [customer.password, [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: ['', [Validators.required]]
        });
    }

    updateCustomer(customer: Customer): void {
        this.customerService.updateCustomer(customer).subscribe(() => {
            alert('SUCESSO!!');
        },
            () => {
                alert('FALHA!!');
            });
    }
}