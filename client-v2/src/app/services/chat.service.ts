import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private url = 'http://localhost:3000';
    private socket = io(this.url);

    public sendMessage(message){
        this.socket.emit('message', message);
    }

    public getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                let message = {
                    "text": data,
                    "user_id": "",
                    "chan": ""
                }
                observer.next(message);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
}
