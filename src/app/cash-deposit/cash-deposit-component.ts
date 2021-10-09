import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'cash-deposit-component.html' })
export class CashDepositComponent implements OnInit  {
    overlaybackground:boolean = false;  
    paymentMaking: boolean = false;
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

        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
             
          });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    onPaidMoney() {
        console.log('onPaidMoney');
        this.paymentMaking = true;
        // const returnUrl = '/admindashboard';
        // this.router.navigate([returnUrl]);

    }
    onRouteAdminDashboard() {
      console.log('onRouteAdminDashboard');
        this.paymentMaking = false;
        const returnUrl = '/admindashboard';
        this.router.navigate([returnUrl]);
    }
}
