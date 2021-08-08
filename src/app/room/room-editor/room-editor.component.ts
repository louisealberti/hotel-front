import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Room } from "src/app/shared/models/room";
import { RoomService } from "../room.service";
import { ValidateBlanksService } from "src/app/shared/component/blanks/validate-blanks.service";

@Component({
    selector: 'app-room-editor',
    templateUrl: './room-editor.component.html'
})
export class RoomEditorComponent implements OnInit {

    roomForm!: FormGroup;
    submitted = false;


    constructor(public validate: ValidateBlanksService, private fb: FormBuilder,
        private roomService: RoomService, private router: Router) { }

    get f() {
        return this.roomForm.controls;
    }

    ngOnInit() {

        this.roomForm = this.fb.group({
            number: ['', [Validators.required]],
            type: ['', [Validators.required]],
            arrival: ['', [Validators.required]],
            departure: ['', [Validators.required]],
        });
    }

    get getControl() {
        return this.roomForm.controls;
    }

    submit(): void {
        this.submitted = true;

        // stops if form is invalid
        if (this.roomForm.invalid) {
            return;
        }

        const room = this.roomForm.getRawValue() as Room;
        this.updateRoom(room);

        this.router.navigateByUrl('room/list');
    }

    onReset(): void {
        this.submitted = false;
        this.roomForm.reset();
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