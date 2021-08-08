import { Component, OnInit } from "@angular/core";

import { Room } from "src/app/shared/models/room";
import { RoomService } from "../room.service";

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {

    _rooms: Room[] = [];
    _filterBy: string = "";
    filteredRooms: Room[] = [];

    constructor(private customerService: RoomService) { }

    ngOnInit(): void { 
        this.customerService.getRooms().subscribe((rooms: Room[]) =>this._rooms = rooms);
    }

    editRoom(room: Room): void {
        
    }

    deleteRoom(room: Room): void {
        this._rooms = this._rooms.filter(h => h !== room); 
        this.customerService.deleteRoom(room.id).subscribe();
    }
}