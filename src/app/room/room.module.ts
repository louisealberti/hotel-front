import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { RoomCreateComponent } from "./room-create/room-create.component";
import { RoomEditorComponent } from "./room-editor/room-editor.component";
import { RoomListComponent } from "./room-list/room-list.component";
import { RoomProfileComponent } from "./room-profile/room-profile.component";
import { RoomRoutingModule } from "./room-routing.module";


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RoomRoutingModule,
    ],
    declarations: [
        RoomCreateComponent,
        RoomEditorComponent,
        RoomListComponent,
        RoomProfileComponent,
    ],
    exports: [
        RoomCreateComponent,
        RoomEditorComponent,
        RoomListComponent,
        RoomProfileComponent,
        RoomRoutingModule,
    ]
})
export class RoomModule { }