import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../_services';

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
    paramId: number = null;
  customerDetail: any;
  agentDetail: any;
    constructor( public formService: FormService,       private route: ActivatedRoute,        private router: Router,

    ) { 
       
    }
    ngOnInit() {

        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
             
          });
          this.route.params.subscribe(params => {
            this.paramId = params['agentId'];
            this.findAgentDetail(true);
            return params;
        });
    }
    findCustomerById(customerId) {
      
      const payload = {
          id: customerId
      }
      this.formService.findCustomerById(payload).subscribe( res => {
          if (res) {
             this.customerDetail = res;
              
          }
          
      }, err => {
        this.onDisconnectPC();
      });
    }
    
    onDisconnectPC() {
      const item = this.agentDetail;
      item.id = this.paramId;
      item.agentid = this.paramId;
      item.accessCode = null;
      item.accessAt = null;
      item.timer = null;
      item.customerId = null;    
      item.pcstatus = 'finished';
      console.log('onDisconnectPC', item);
     
      this.formService.bookAgent(item).subscribe( res => {
          if (res) {
            const returnUrl = '/checkinout/'+ item.id;
            this.router.navigate([returnUrl]);

            
          }
          else {
             
          }
      })
  }
    findAgentDetail(execute) {
      if (!this.paramId) return;
      const payload = {
          id: this.paramId
      }
      this.formService.findAgent(payload).subscribe( res => {
          if (res) {
              this.agentDetail = res;
              if (res.pcstatus != 'busy') {
                  const returnUrl = '/checkinout/'+ res.id;
                  this.router.navigate([returnUrl]);
  
                  return;
              }
              else {
                this.findCustomerById(res.customerId);
              }
          }
          
      });
  }
    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    onDisconnectSession() {
        console.log('onDisconnectSession');
         this.onDisconnectPC();
        // const item = {
        //   id: 
        // };
        // item.lastResponseAt = new Date().toISOString();
        
            
        // item.pcstatus = 'ready';
        // console.log('onCancelWaiting', item);
        // this.selectedAgent = item;
        // this.formService.bookAgent(item).subscribe( res => {
        //     if (res) {
              
              
        //     }
        //     else {
               
        //     }
        // })
        // const returnUrl = '/checkinout';
        // this.router.navigate([returnUrl]);
        
        //@ts-ignore
        electronDisconnectSession();

    }
    onConnectedSession() {
      //@ts-ignore
      electronConnectSession();

  }
}
