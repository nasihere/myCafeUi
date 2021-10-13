import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'customer.component.html' })
export class CustomerComponent implements OnInit {
    step:number = 1;
    form: FormGroup;
    loading: boolean;
    picUploader(id: string) {
        document.getElementById(id).click();

    }



    constructor(     public formService: FormService,        private router: Router,

        ) { 
           
        }
        ngOnInit() {
            this.form = new FormGroup({
                name: new FormControl('', [Validators.required]),
                idprofilepic: new FormControl('', []),
                profilepic: new FormControl('', []),
                email: new FormControl('', [Validators.required, Validators.email]),
                cellphone: new FormControl('', [Validators.required,  Validators.minLength(7), Validators.maxLength(12)]),
                address: new FormControl('', [Validators.required]),
                gender: new FormControl('m', [Validators.required]),
                iddirivinlicenseno: new FormControl('', []),
                idpancard: new FormControl('', []),
                idadharcard: new FormControl('', []),
                idothercard: new FormControl('', []),

                picdirivinlicenseno: new FormControl('', []),
                picpancard: new FormControl('', []),
                picadharcard: new FormControl('', []),
                picothercard: new FormControl('', []),
              });
    
        }
    
        public hasError = (controlName: string, errorName: string) =>{
            return this.form.controls[controlName].hasError(errorName);
          }
        // convenience getter for easy access to form fields
        get f() { return this.form.controls; }
    
        onSubmit() {
            // const returnUrl = '/checkinout';
            // this.router.navigate([returnUrl]);
            console.log(this.f.name.value,
                
                this.f.idprofilepic.value,
                this.f.profilepic.value,
                this.f.email.value,
                this.f.cellphone.value,
                this.f.address.value,
                this.f.gender.value,
                this.f.iddirivinlicenseno.value,
                this.f.idpancard.value,
                this.f.idadharcard.value,
                this.f.idothercard.value,
                this.f.picdirivinlicenseno.value,
                this.f.picpancard.value,
                this.f.picadharcard.value,
                this.f.picothercard.value
                )
            // stop here if form is invalid
            if (this.form.invalid) {
                console.log('form is invalid ')
                return;
            }
            this.formService.createCustomer(this.form.value).subscribe( res => {
                console.log('res', res)
                const returnUrl = `/admindashboard`;
                this.router.navigate([returnUrl]);
                
            }, err => {
                
            });
            this.loading = true;
           
            
    
        }
}