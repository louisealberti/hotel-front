import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core/core.module';
import { MessageComponent } from './shared/component/messages/message.component';
import { RoomModule } from './room/room.module';
import { ManagerModule } from './manager/manager.module';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CustomerModule,
    RoomModule,
    ManagerModule,
    CoreModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
