import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RoomCreateComponent } from "./room-create/room-create.component";
import { RoomEditorComponent } from "./room-editor/room-editor.component";
import { RoomListComponent } from "./room-list/room-list.component";
import { RoomProfileComponent } from "./room-profile/room-profile.component";


const routes: Routes = [
    { path: 'room/profile/:id', component: RoomProfileComponent },
    { path: 'room/editor', component: RoomEditorComponent },
    { path: 'room/list', component: RoomListComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [
      RouterModule
    ]
  })
  export class RoomRoutingModule { }