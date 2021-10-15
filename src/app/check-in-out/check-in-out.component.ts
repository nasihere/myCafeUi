import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ViewEncapsulation } from '@angular/core';
import { FormService } from '../_services';

@Component({ templateUrl: 'check-in-out.component.html', encapsulation: ViewEncapsulation.None })
export class CheckInOutComponent implements OnInit  {
    adminPassword: boolean = false;
    helpPageNewCustomer: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    paramId: number = null;
    agentVerified: boolean = false;
    agentDetail: any;
    accessCodeVerified: boolean = true;
    constructor(     public formService: FormService,
        private route: ActivatedRoute,     private router: Router,

    ) { 
       
    }
    ngOnInit() {

        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
            accessCode: new FormControl('', [Validators.required]),
            otpverify: new FormControl('', [Validators.required]),
             search: new FormControl('', [Validators.required]),
            cellphone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern(MOBILE_PATTERN)]),
            password: new FormControl('',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)])
          });
          this.route.params.subscribe(params => {
                this.paramId = params['agentId'];
                this.findAgentDetail(true);
                return params;
            });
    
    }
    findAgentDetail(execute) {
        if (!this.paramId) return;
        const payload = {
            id: this.paramId
        }
        this.formService.findAgent(payload).subscribe( res => {
            if (res) {
                this.agentDetail = res;
                this.agentVerified = true;
                if (res.pcstatus == 'busy') {
                    const returnUrl = '/connectedcomputer';
                    this.router.navigate([returnUrl]);
    
                    return;
                }
                if (execute) {
                    this.onlineAgent();
                }
                
            }
            else {
                this.agentDetail = null;
                this.agentVerified = false;
            
            }
            
        });
    }
    onlineAgent() {
       
        if (!this.paramId) return;
        const payload = {
            id: this.paramId,
            online: true
        }
        this.formService.onlineAgent(payload).subscribe( res => {
            if (res.success) {
                this.agentVerified = true;
                this.findAgentDetail(false);
            }
            else {
                this.agentVerified = false;
            
            }
            
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
        const returnUrl = '/customerlookup/selfcheckin';
        this.router.navigate([returnUrl]);
    }
    onVerifyAdminPassword() {
        
        console.log(this.f.password.value)
        console.log('onVerifyAdminPassword');
        const returnUrl = '/computerselection';
        this.router.navigate([returnUrl]);
    }
    onAccessCodeLogin() {
        if (!this.paramId) return;
        const payload = {
            id: this.paramId,
            accessCode: this.f.accessCode.value
        }
        this.formService.unlockAgent(payload).subscribe( res => {
            if (res.data.Count) {
                this.accessCodeVerified = true;
                this.onCafeTimerStart(res.data.Items[0]);            
               
            }
            else {
                this.accessCodeVerified = false;
            
            }
            
        });
    }
    
    onCafeTimerStart(item) {
        
        
        item.accessCode = null;
        item.accessAt = new Date().toISOString();
        item.pcstatus = 'busy';
        
        
        this.formService.bookAgent(item).subscribe( res => {
            if (res) {
                const returnUrl = '/connectedcomputer';
                this.router.navigate([returnUrl]);
              
            }
            else {
               
            }
        })
    }
}
