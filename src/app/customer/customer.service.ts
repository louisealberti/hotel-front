import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, retry, tap } from "rxjs/operators";

import { Customer } from "../shared/models/customer";
import { MessageService } from "../shared/component/messages/message.service";


@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    private customersUrl: string = 'http://localhost:8080/api/customer/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json', 'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }

    /** GET customers from the server */
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.customersUrl)
            .pipe(
                tap(_ => this.log('fetched customer')),
                catchError(this.handleError<Customer[]>('getCustomers', []))
            );
    }

    /** GET customer by id. Return `undefined` when id not found */
    getCustomerNo404<Data>(id: number): Observable<Customer> {
        const url = `${this.customersUrl}/${id}`;
        return this.http.get<Customer[]>(url)
            .pipe(
                map(customers => customers[0]),
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} customer id=${id}`);
                }),
                catchError(this.handleError<Customer>(`getCustomer id=${id}`))
            );
    }

    /** GET customer by id. Will 404 if not found */
    getCustomer(id: number): Observable<Customer> {
        const url = `${this.customersUrl}/${id}`;
        return this.http.get<Customer>(url).pipe(
            tap(_ => this.log(`fetched customer id=${id}`)),
            catchError(this.handleError<Customer>(`getRoom id=${id}`))
        );
    }

    /** GET customers whose name contains the search term */
    searchCustomers(term: string): Observable<Customer[]> {
        if (term.trim()) {
            return of([]);
        }
        return this.http.get<Customer[]>(`${this.customersUrl}/?name=${term}`).pipe(
            tap(x => x.length ?
                this.log(`found customers matching "${term}"`) :
                this.log(`no customers matching "${term}`)),
            catchError(this.handleError<Customer[]>('searchCustomers', []))
        );
    }

    /** POST: add a new customer to the server */
    addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.customersUrl, JSON.stringify(customer), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError<Customer>('addCustomer'))
            );
    }

    /** DELETE: delete the customer from the server */
    deleteCustomer(id: number): Observable<Customer> {
        const url = `${this.customersUrl}/${id}`;

        return this.http.delete<Customer>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted customer id=${id}`)),
                catchError(this.handleError<Customer>('deleteCustomer'))
            );
    }

    /** PUT: update the customer on the server Returns the updated customer upon success. */
    updateCustomer(customer: Customer): Observable<any> {
        return this.http.put(this.customersUrl, customer, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated customer id=${customer.id}`)),
                catchError(this.handleError<any>('updateCustomer'))
            );
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a CustomerService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
