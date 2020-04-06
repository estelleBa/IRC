import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'IRC';
    public user;


    constructor(private router: Router,
    private authenticationService: AuthenticationService,
    ) {
        this.user = this.authenticationService.user;
    }

    ngOnInit() {
        this.authenticationService
        .getLogin()
        .subscribe((data) => {
            console.log(data)
            this.user = data;
            //this.router.navigate(['/']);
        });
        this.authenticationService
        .getRegister()
        .subscribe((data) => {
            console.log(data)
            this.user = data;
        });
        this.authenticationService
        .getLogout()
        .subscribe((data) => {
            console.log(data)
            this.user = null;
        });
    }

    public logout() {
        console.log(this.user)
        this.authenticationService.logout({user: this.user});
    }
}
