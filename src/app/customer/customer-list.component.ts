import { Component, OnInit } from "@angular/core";

import { Customer } from "./customer";
import { CustomerService } from "./customer.service";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: []
})
export class CustomerListComponent implements OnInit {

    _customers: Customer[] = [];
    _filterBy: string = "";
    filteredCustomers: Customer[] = [];

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void { 
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService.getCustomers()
        .subscribe(customers => this._customers = customers);
    }

    deleteCustomer(customer: Customer): void {
        this._customers = this._customers.filter(h => h !== customer); 
        this.customerService.deleteCustomer(customer.id).subscribe();
    }

    set filter(value: string) {
        this._filterBy = value;
        this.filteredCustomers = this._customers.filter((customer: Customer) => customer.firstName.toLowerCase().indexOf(this._filterBy.toLowerCase()) < -1);
    }

    get filter() {
        return this._filterBy;
    }
}