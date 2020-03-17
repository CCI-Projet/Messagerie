"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(server, connection) {
        this.server = server;
        this.connection = connection;
        connection.on('message', (message) => this.onMessage(message.utf8Data));
        connection.on('close', () => server.removeClient(this));
    }
    sendMessage(type, data) {
        const message = { type: type, data: data };
        this.connection.send(JSON.stringify(message));
    }
    sendInstantMessage(content, author, date) {
        const instantMessage = { content: content, author: author, date: date };
        this.sendMessage('instant_message', instantMessage);
    }
    onInstantMessage(content) {
        if (!(typeof 'content' === 'string'))
            return;
        this.server.broadcastInstantMessage(content, 'Anonymous');
    }
    onMessage(utf8Data) {
        const message = JSON.parse(utf8Data);
        switch (message.type) {
            case 'instant_message':
                this.onInstantMessage(message.data);
                break;
        }
    }
}
exports.Client = Client;
