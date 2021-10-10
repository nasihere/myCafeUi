import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({selector: 'terminal-status', templateUrl: 'computer-selection.component.html' })
export class ComputerSelectionComponent  implements OnInit {
    form: FormGroup;
    step: number = 1;
    cashDeposit: boolean = false;
    pcCode: number = 0;
    constructor(        private router: Router,

        ) { 
           
        }

        ngOnInit() {
            this.form = new FormGroup({
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
    

        onVerifyAdminPassword() {
        console.log('onVerifyAdminPassword terminal ');
        console.log(this.f.password.value)

        if (this.form.invalid) {
            return;
        }
    }
    onAvailablePC() {
        console.log('onAvailablePC');
        this.pcCode = Math.floor(1000 + Math.random() * 9000);
    }
    onPCCodeVerify() {
        console.log('onPCCodeVerify');
        this.pcCode = 0;
          const returnUrl = '/checkinout';
        this.router.navigate([returnUrl]);
    }
    onCashDepposit() {
        console.log('onCashDepposit');
        this.cashDeposit = true;
          const returnUrl = '/checkinout';
        this.router.navigate([returnUrl]);
    }
}
