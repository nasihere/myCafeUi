import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'admin-dashboard-component.html' })
export class AdminDashboardComponent implements OnInit  {
    adminPassword: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    customerNotFound: boolean = false;
    constructor(    public formService: FormService,    private router: Router,

    ) { 
       
    }
    ngOnInit() {

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

    onSubmit() {
        
        this.submitted = true;
   

        this.loading = true;
        if (!this.f.search.valid) {
            return;
        }
        console.log(this.f.search.value)
        this.customerNotFound = false;
        this.formService.findByCustomerSearchText({searchText: this.f.search.value}).subscribe( res => {
        if (res) {
            
            const returnUrl = '/customerlookup/' + this.formService.response.resCustomer.cellphone + '/admindashboard';
            this.router.navigate([returnUrl]);
        }
        else {
                console.log('cant find the customer')   
                this.customerNotFound = true;
            }
        })
            
        
        

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
    onVerifyAdminPassword() {
        
        console.log(this.f.password.value)
        console.log('onVerifyAdminPassword');
        const returnUrl = '/computerselection';
        this.router.navigate([returnUrl]);
    }
}
