import { Injectable } from '@angular/core';
import { InstantMessage } from './instant-message';

@Injectable()
export class InstantMessagingService {
  private messages: InstantMessage[] = [];
  private socket: WebSocket;

  private onInstantMessage(message: InstantMessage) {
    this.messages.push(message);
  }

  private onMessage(data: string) {
    const message = JSON.parse(data);
    switch (message.type) {
      case 'instant_message': this.onInstantMessage(message.data); break;
    }
  }

  public constructor() {
    this.socket = new WebSocket('ws:/localhost:4201');
    this.socket.onmessage =
      (event: MessageEvent) => this.onMessage(event.data);
  }

  public  getMessages(): InstantMessage[] {
    return this.messages;
  }

  public sendMessage(type: string, data: any) {
    const message = {type: type, data: data};
    this.socket.send(JSON.stringify(message));
  }

  public sendInstantMessage(content: string) {
    this.sendMessage('instant_message', content);
  }
}