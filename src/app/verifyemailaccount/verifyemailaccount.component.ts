import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AuthenticationService, FormService } from '../_services';

@Component({ templateUrl: 'verifyemailaccount.component.html' })
export class VerifyEmailAccountComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    authFailed: boolean = false;
    authEmailVerify: boolean = false;
    filter$: any;
    constructor(
        public formService: FormService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
       
    }
   
    ngOnInit() {
        
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            verify: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(6)])
          });

          
        this.filter$ = this.route.params.subscribe(params => {
                this.f.username.setValue(params['accountemailid']);
                return params['accountemailid']
            });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.loginForm.controls[controlName].hasError(errorName);
      }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
         
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f.username.value, this.f.verify.value)
        const payload = {
            "username": this.f.username.value,
            "code": this.f.verify.value
        }
        this.formService.authEmailVerify(payload).subscribe( res => {
            console.log('res', res)
            const returnUrl = '/admindashboard';
            this.router.navigate([returnUrl]);
            this.authEmailVerify = false;
        }, err => {
            //422 Unprocessable Entity (wrong email and password)
            //400 Bad Request (right email and password)
            console.log(err, 'error')
            this.authEmailVerify = true;
            this.formService.hideLoading();
        });
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             // // get return url from route parameters or default to '/'
        //             // const returnUrl = '/checkinout';
        //             // this.router.navigate([returnUrl]);
        //         },
        //         error: error => {
        //             this.error = error;
        //             this.loading = false;
        //         }
        //     });
    }
}
