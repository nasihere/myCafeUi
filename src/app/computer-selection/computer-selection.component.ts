import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({selector: 'terminal-status', templateUrl: 'computer-selection.component.html' })
export class ComputerSelectionComponent  implements OnInit {
    form: FormGroup;
    step: number = 1;
    cashDeposit: boolean = false;
    pcCode: number = 0;
    data: any;
    pcAgentsList: any = [
        {
          "createdAt": "2021-10-14T19:14:51.940Z",
          "username": "nasz.letter@gmail.com",
          "pcname": "PC - 442",
          "id": "01d3b640-2d23-11ec-a9bb-195273d63f97",
          "lastResponseAt": null
        },
        {
          "createdAt": "2021-10-14T19:26:01.473Z",
          "username": "nasz.letter@gmail.com",
          "pcname": "PC - 429",
          "id": "90e65710-2d24-11ec-8f1c-41101a9fce7b",
          "lastResponseAt": null
        },
        {
          "createdAt": "2021-10-14T14:24:07.995Z",
          "username": "nasz.letter@gmail.com",
          "pcname": "PC - 939",
          "id": "646cf0b0-2cfa-11ec-85bb-bd84721c532e",
          "lastResponseAt": "2021-10-14T14:24:07.996Z"
        }
      ]
      ;
    infoSetupIncomplete: boolean = false;
    constructor(   public formService: FormService,      private router: Router,

        ) { 
           
        }

        ngOnInit() {
            // this.data = this.formService.response.resAuthSignIn.data.Item;
            // this.form = new FormGroup({
            //     password: new FormControl('',[Validators.required,
            //         Validators.minLength(5),
            //         Validators.maxLength(30)])
            //   });
            // this.getAllAgentPC();
        }
        
        getAllAgentPC() {
            const payload = {
                username: this.data.username
            }
            this.formService.getAllAgentPC(payload).subscribe( res => {
                if (res) {
                    this.pcAgentsList = res;
                }
                else {
                   this.pcAgentsList = null;
                }
            })
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
}
