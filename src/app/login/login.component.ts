import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
       
    }
   
    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
            password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
          });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.loginForm.controls[controlName].hasError(errorName);
      }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        const returnUrl = '/checkinout';
        this.router.navigate([returnUrl]);
        
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f.username.value, this.f.password.value)
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from route parameters or default to '/'
                    const returnUrl = '/checkinout';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
