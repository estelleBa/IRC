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

    logout() {
        // remove user from local storage and set current user to null
        // localStorage.removeItem('currentUser');
        // this.currentUserSubject.next(null);
    }
}
