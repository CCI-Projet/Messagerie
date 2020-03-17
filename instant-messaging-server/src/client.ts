import {connection as WebSocketConnection} from 'websocket';
import { Server } from './server';

export class Client {
    public constructor(private server: Server, private connection: WebSocketConnection) {
        connection.on('message', (message)=>this.onMessage(message.utf8Data));
        connection.on('close', ()=>server.removeClient(this));
    }

    private sendMessage(type: string, data: any): void {
        const message = {type: type, data: data};
        this.connection.send(JSON.stringify(message));
    }

    public sendInstantMessage(content: string, author: string, date: Date) {
        const instantMessage = { content: content, author: author, date: date };
        this.sendMessage('instant_message', instantMessage);
    }

    private onInstantMessage(content: string): void {
        if (!(typeof 'content' === 'string')) return;
        this.server.broadcastInstantMessage(content, 'Anonymous');
    }

    private onMessage(utf8Data: string): void {
        const message = JSON.parse(utf8Data);
        switch (message.type) {
            case 'instant_message': this.onInstantMessage(message.data); break;
        }
    }

}