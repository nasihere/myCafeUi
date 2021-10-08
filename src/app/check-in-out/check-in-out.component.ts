import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'check-in-out.component.html' })
export class CheckInOutComponent implements OnInit  {
    step: number = 1;
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
            otpverify: new FormControl('', [Validators.required]),
             search: new FormControl('', [Validators.required]),
            cellphone: new FormControl('', [Validators.required,  Validators.minLength(7), Validators.maxLength(12)]),
               
          });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        const returnUrl = '/customerlookup';
        this.router.navigate([returnUrl]);
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f.search.value)
        

    }
    onSendOTP() {
        console.log(this.f.cellphone.value)
        console.log('onSendOTP');
        this.step = 3;
    }
    onVerifyOTP() {
        console.log(this.f.otpverify.value)
        console.log('onVerifyOTP');
        const returnUrl = '/customerlookup';
        this.router.navigate([returnUrl]);
    }
}
