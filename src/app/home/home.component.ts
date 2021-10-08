import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    constructor(        private router: Router,

    ) { 
       
    }
    ngOnInit() {
        this.form = new FormGroup({
            cellphone: new FormControl('', [Validators.required,  Validators.minLength(7), Validators.maxLength(12)]),
            orgname: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required,
              Validators.minLength(5),
              Validators.maxLength(30)])
          });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        const returnUrl = '/login';
        this.router.navigate([returnUrl]);
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f.cellphone.value, this.f.email.value, this.f.orgname.value, this.f.password.value, this.f.username.value)
        

    }
}