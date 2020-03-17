import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import { InstantMessageComponent } from './instant-message/instant-message.component';
import { NewMessageFormComponent } from './new-message-form/new-message-form.component';
import { InstantMessagingService } from './instant-messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    InstantMessageComponent,
    NewMessageFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [InstantMessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
