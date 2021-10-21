import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'agent-setup.component.html' })
export class AgentSetupComponent implements OnInit {
    form: FormGroup;
    step: number = 1;
    data: any;
    pcNameExists: boolean = false;
    pcCreated: any;
    adminValidPassword: boolean = false;
    constructor(    public formService: FormService,        private router: Router,

        ) { 
           
        }

        ngOnInit() {
            if (!this.formService.response.resAuthSignIn) {
                const returnUrl = '/login';
                this.router.navigate([returnUrl]);
                return;
           }

           this.data = this.formService.response.resAuthSignIn.data.Item;
            
            this.form = new FormGroup({
                computerName: new FormControl('', [Validators.required]),
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
        
        // const returnUrl = '/computerselection';
        // this.router.navigate([returnUrl]);
        // stop here if form is invalid
        if (this.f.password.value != this.data.password) {
            this.adminValidPassword = true;
            return;
        }
        else {
            this.adminValidPassword = false;
            
        }
        const payload = {
            "pcname": this.f.computerName.value,
            "username":this.data.username
        }
        this.formService.findByPCName(payload).subscribe( res => {
            if (res) {
                this.pcNameExists = true;
            }
            else {
               this.pcNameExists = false;
               this.step = 2;
            }
        })

    }
    onDownloadLinkEmail() {
        console.log(this.f.email.value)
        this.step = 3;
        // const returnUrl = '/computerselection';
        // this.router.navigate([returnUrl]);
        // stop here if form is invalid
        if (!this.f.email.valid) {
            return;
        }
        const payload = {
            username: this.data.username,
            pcname: this.f.computerName.value,
        }
        this.formService.createAgent(payload).subscribe( res => {
            if (res) {
               this.pcCreated = res;
               this.step = 3;
            }
        })
    }

}
