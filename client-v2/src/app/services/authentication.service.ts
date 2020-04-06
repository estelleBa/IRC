import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private url = 'http://localhost:3000';
    private socket = io(this.url);
    public user;

    public login(data) {
        this.socket.emit('login', data);
    }

    public getLogin() {
      let observable = new Observable(observer => {
          this.socket.on('login', (data) => {
              console.log(data)
              this.user = data;
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          };
      })
      return observable;
    }

    public register(data) {
        this.socket.emit('newUser', data);
    }

    public getRegister() {
        let observable = new Observable(observer => {
            this.socket.on('newUser', (data) => {
                console.log(data)
                this.user = data;
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    public logout(data) {
        this.socket.emit('logout', data);
    }

    public getLogout() {
        let observable = new Observable(observer => {
            this.socket.on('logout', (data) => {
                console.log(data)
                this.user = null;
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
}
