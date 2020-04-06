import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
      selector: 'app-register',
      templateUrl: './register.component.html'//,
     // styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
    public user;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.user;
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });

    }

    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm.value)
        this.authenticationService.register(this.registerForm.value);
    }
}
