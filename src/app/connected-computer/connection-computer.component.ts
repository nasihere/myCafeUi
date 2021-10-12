import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'connected.computer-component.html' })
export class ConnectedComputerComponent implements OnInit  {
    adminPassword: boolean = false;
    disconnectSession: boolean = false;
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
    onDisconnectSession() {
        //@ts-ignore
        electronDisconnectSession();
        console.log('onDisconnectSession');
        const returnUrl = '/checkinout';
        this.router.navigate([returnUrl]);

    }
    onConnectedSession() {
      //@ts-ignore
      electronConnectSession();

  }
}
