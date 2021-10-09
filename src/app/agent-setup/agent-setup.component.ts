import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'agent-setup.component.html' })
export class AgentSetupComponent implements OnInit {
    form: FormGroup;
    step: number = 2;
    constructor(        private router: Router,

        ) { 
           
        }

        ngOnInit() {
            this.form = new FormGroup({
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
    

    onVerifyAdminPassword() {
        console.log(this.f.password.value)
        this.step = 2;
        // const returnUrl = '/computerselection';
        // this.router.navigate([returnUrl]);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

    }
    onDownloadLinkEmail() {
        console.log(this.f.email.value)
        this.step = 3;
        // const returnUrl = '/computerselection';
        // this.router.navigate([returnUrl]);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    }

}
