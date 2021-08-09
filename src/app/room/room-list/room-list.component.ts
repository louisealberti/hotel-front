import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Room } from "src/app/shared/models/room";
import { RoomService } from "../room.service";

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {

    _id!: number;
    _rooms: Room[] = [];
    _filterBy: string = "";
    filteredRooms: Room[] = [];

    constructor(private roomService: RoomService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void { 
        this.roomService.getRooms().subscribe((rooms: Room[]) =>this._rooms = rooms);
    }

    edit(room: Room): void {
        this.router.navigateByUrl('dashboard/room/edit/' + room.id);
    }

    deleteRoom(room: Room): void {
        this._rooms = this._rooms.filter(h => h !== room); 
        this.roomService.deleteRoom(room.id).subscribe();
    }
}