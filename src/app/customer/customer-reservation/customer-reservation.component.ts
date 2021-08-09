import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoomService } from "src/app/room/room.service";
import { ValidateBlanksService } from "src/app/shared/component/blanks/validate-blanks.service";
import { Customer } from "src/app/shared/models/customer";
import { Room } from "src/app/shared/models/room";
import { CustomerService } from "../customer.service";

@Component({
    selector: 'app-customer-reservation',
    templateUrl: './customer-reservation.component.html'
})
export class CustomerReservationComponent {

    profileForm!: FormGroup;
    submitted = false;

    _customers: Customer[] = [];
    _rooms: Room[] = [];
    _filterBy: string = "";
    filteredCustomers: Customer[] = [];
    
    
    constructor(private customerService: CustomerService, 
                private roomService: RoomService,
                private fb: FormBuilder, 
                private validateBlanks: ValidateBlanksService,
                private router: Router) { }

    get f() {
        return this.profileForm.controls;
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe((customers: Customer[]) =>this._customers = customers);
        this.roomService.getRooms().subscribe((rooms: Room[]) =>this._rooms = rooms);
    }
    
    submit(): void {
        this.submitted = true;

        this.profileForm = this.fb.group({
            room: ['', [Validators.required]]
        });
        
        // stops if form is invalid
        if(this.profileForm.invalid) {
            return;
        }
       
        const customer = this.profileForm.getRawValue() as Customer;
        this.updateCustomer(customer);

        this.profileForm.reset();
        this.router.navigateByUrl('dashboard/customer/list');
    }

    updateCustomer(customer: Customer){
        this._customers = this._customers.filter(h => h !== customer); 
        this.customerService.updateCustomer(customer).subscribe();
    }

    set filter(value: string) {
        this._filterBy = value;
        this.filteredCustomers = this._customers.filter((customer: Customer) => customer.firstName.toLowerCase().indexOf(this._filterBy.toLowerCase()) < -1);
    }

}