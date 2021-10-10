import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'setings.component.html' })
export class SettingsComponent implements OnInit  {
    displayedColumns = ['product', 'desc', 'perCost', 'action'];
    adminPassword: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    dataSource = null;
    constructor(        private router: Router,

    ) { 
       
    }
    ngOnInit() {
        this.dataSource = [
            {perCost: 30, desc: "$10 Per Hour", product: "Internet",action: ""},
            {perCost: 1, desc: "$0.01 Per Page", product: "Printer",action: ""},
            {perCost: 1, desc: "$0.11 Per Page", product: "Scanner",action: ""},
            {perCost: 1, desc: "$20 Per Console", product: "Game",action: ""}
        ];
        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
            otpverify: new FormControl('', [Validators.required]),
             search: new FormControl('', [Validators.required]),
            cellphone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern(MOBILE_PATTERN)]),
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

}
