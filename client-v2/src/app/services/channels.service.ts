import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChannelsService {
    private url = 'http://localhost:3000';
    private socket = io(this.url);

    public createChannel(channel) {
      console.log("CREATE CHANNEL SERVICE CHANNEL")
      console.log(channel)
        this.socket.emit('newChannel', channel);
    }

    public getChannels() {
        let observable = new Observable(observer => {
            this.socket.on('newChannel', (data) => {
              console.log("dat")
                console.log(data)
                let channel = data
                observer.next(channel);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
}
