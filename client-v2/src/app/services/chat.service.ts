import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private url = 'http://localhost:3000';
    private socket = io(this.url);

    // CHANNELS

    public requestChannels() {
        this.socket.emit('getChannels');
    }

    public getChannels() {
        let observable = new Observable(observer => {
            this.socket.on('getChannels', (channels) => {
                observer.next(channels);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    public createChannel(channel) {
        this.socket.emit('newChannel', channel);
    }

    public getNewChannel() {
        let observable = new Observable(observer => {
            this.socket.on('newChannel', (channel) => {
                observer.next(channel);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    public editChannel(channel) {
        this.socket.emit('editChannel', channel);
    }

    public getEditChannel() {
        let observable = new Observable(observer => {
            this.socket.on('editChannel', (channel) => {
                observer.next(channel);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    public deleteChannel(channel) {
        this.socket.emit('deleteChannel', channel);
    }

    public getDeleteChannel() {
        let observable = new Observable(observer => {
            this.socket.on('deleteChannel', (channel) => {
                observer.next(channel);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    // MESSAGES

    public sendMessage(message){
        this.socket.emit('newHistory', message);
    }

    public getNewMessage() {
        let observable = new Observable(observer => {
            this.socket.on('newHistory', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
}
