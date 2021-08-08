import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, retry, tap } from "rxjs/operators";

import { MessageService } from "../shared/component/messages/message.service";
import { Room } from "../shared/models/room";

@Injectable({
    providedIn: 'root',
})
export class RoomService {

    private roomsUrl: string = 'http://localhost:8080/api/room/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json', 'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }

    /** GET rooms from the server */
    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.roomsUrl)
            .pipe(
                tap(_ => this.log('fetched customer')),
                catchError(this.handleError<Room[]>('getRooms', []))
            );
    }

    /** GET room by id. Return `undefined` when id not found */
    getRoomNo404<Data>(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.get<Room[]>(url)
            .pipe(
                map(rooms => rooms[0]),
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} room id=${id}`);
                }),
                catchError(this.handleError<Room>(`getRoom id=${id}`))
            );
    }

    /** GET room by id. Will 404 if not found */
    getRoom(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.get<Room>(url).pipe(
            tap(_ => this.log(`fetched room id=${id}`)),
            catchError(this.handleError<Room>(`getRoom id=${id}`))
        );
    }

    /** GET room whose type contains the search term */
    searchRooms(term: string): Observable<Room[]> {
        if (term.trim()) {
            return of([]);
        }
        return this.http.get<Room[]>(`${this.roomsUrl}/?type=${term}`).pipe(
            tap(x => x.length ?
                this.log(`found rooms matching "${term}"`) :
                this.log(`no rooms matching "${term}`)),
            catchError(this.handleError<Room[]>('searchRooms', []))
        );
    }

    /** POST: add a new room to the server */
    addRoom(room: Room): Observable<Room> {
        return this.http.post<Room>(this.roomsUrl, JSON.stringify(room), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError<Room>('addRoom'))
            );
    }

    /** DELETE: delete the room from the server */
    deleteRoom(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/${id}`;

        return this.http.delete<Room>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted room id=${id}`)),
                catchError(this.handleError<Room>('deleteRoom'))
            );
    }

    /** PUT: update the customer on the server Returns the updated customer upon success. */
    updateRoom(room: Room): Observable<any> {
        return this.http.put(this.roomsUrl, room, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated customer id=${room.id}`)),
                catchError(this.handleError<any>('updateRoom'))
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