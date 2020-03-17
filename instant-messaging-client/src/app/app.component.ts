import { Component } from '@angular/core';
import { InstantMessage } from './instant-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private messages: InstantMessage[] = [];

  private sendMessage(content: string) {
    const message = new InstantMessage(content, 'Jim', new Date());
    this.messages.push(message);
  }
}