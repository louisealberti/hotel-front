import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Room } from "src/app/shared/models/room";
import { RoomService } from "../room.service";
import { ValidateBlanksService } from "src/app/shared/component/blanks/validate-blanks.service";

@Component({
    selector: 'app-room-editor',
    templateUrl: './room-editor.component.html'
})
export class RoomEditorComponent implements OnInit {

    _id!: number;
    roomForm!: FormGroup;
    submitted = false;


    constructor(public validate: ValidateBlanksService,
        private fb: FormBuilder,
        private roomService: RoomService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    get f() {
        return this.roomForm.controls;
    }

    get getControl() {
        return this.roomForm.controls;
    }

    ngOnInit() {
        this._id = this.activatedRoute.snapshot.params['id'];
        if (this._id) {
            this.roomService.getRoom(this._id)
                .subscribe((room: Room) => this.createForm(room));
        } else {
            console.log('error');
        }
    }

    submit(): void {
        this.submitted = true;

        // stops if form is invalid
        if (this.roomForm.invalid) {
            return;
        }

        const room = this.roomForm.getRawValue() as Room;
        this.updateRoom(room);

        this.router.navigateByUrl('dashboard/room/list');
    }

    private createForm(room: Room) {
        this.roomForm = this.fb.group({
            number: [room.number, [Validators.required]],
            type: [room.type, [Validators.required]],
            arrival: [room.arrival, [Validators.required]],
            departure: [room.departure, [Validators.required]],
        });
    }

    private updateRoom(room: Room): void {
        this.roomService.updateRoom(room).subscribe(() => {
            alert('SUCESSO!!');
        },
            () => {
                alert('FALHA!!');
            });
    }

}