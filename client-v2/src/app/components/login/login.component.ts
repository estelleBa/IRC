import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
      selector: 'app-login',
      templateUrl: './login.component.html'//,
     // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public user;
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.user;
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
        
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.loginForm.value)
        this.authenticationService.login(this.loginForm.value);
    }
}
