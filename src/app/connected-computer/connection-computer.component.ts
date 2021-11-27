import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
  billingDetail: any;
  displayCountDown: any;
  countDownDate: any;
  lastFiveMin: boolean = false;
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
      if (item.pcstatus == 'finished')  return;
      item.id = this.paramId;
      item.agentid = this.paramId;
      item.accessCode = null;
      item.accessAt = null;
      item.timer = null;
      //item.customerId = null;    
      if(this.customerDetail && this.customerDetail.name) {
        item.customerName = this.customerDetail.name;
      }
      
      item.pcstatus = 'finished';
      console.log('onDisconnectPC', item);
     
      this.formService.bookAgent(item).subscribe( res => {
          if (res) {
            this.disconnectSession = false;
            const returnUrl = '/checkinout/'+ item.id;
            this.router.navigate([returnUrl]);

            
          }
          else {
             this.disconnectSession = false;
          }
      })
  }
  findBillingId(billingId) {
      
    const payload = {
        id: billingId
    }
    this.formService.findBillingDetail(payload).subscribe( res => {
        if (res) {
           this.billingDetail = res;
           this.startTimer();
        }
        
    });
  }
   startTimer() {
   // Set the date we're counting down to

      const timerTime = moment(this.billingDetail.checkIn).add(this.billingDetail.timer, 'minutes')
      const checkInTime =  moment(this.billingDetail.checkIn).toDate().getTime();
      var countDownDate = moment(timerTime).toDate().getTime();
      const self = this;
      // Update the count down every 1 second
      var x = setInterval(function() {
       
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        
        var distance2 =  now - checkInTime ;

        var hours1 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes1 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
        var seconds1 = Math.floor((distance2 % (1000 * 60)) / 1000);

        self.countDownDate = hours1 + "h "
        + minutes1 + "m " + seconds1 + "s ";

        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        self.displayCountDown = hours + "h "
        + minutes + "m " + seconds + "s ";

        if (minutes == 4 && seconds <= 59 && seconds >= 50) {
           self.lastFiveMin  = true;
           //@ts-ignore
           electronShowAgent();
        }
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          self.displayCountDown  = "EXPIRED";
          //@ts-ignore
          electronShowAgent();
          self.onDisconnectSession();
        }
      }, 1000);
    }

  
    findAgentDetail(execute) {
      if (!this.paramId) return;
      const payload = {
          id: this.paramId
      }
      this.formService.findAgent(payload).subscribe( res => {
          if (res) {
              this.agentDetail = res;
              this.findBillingId(this.agentDetail.billingId);
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
        //@ts-ignore
        electronCleanSession();
        //@ts-ignore
        electronShowAgent();
        // //@ts-ignore
        // electronLogOffSession()

    }
    onConnectedSession() {
      //@ts-ignore
      electronConnectSession();
      //@ts-ignore
      electronHideAgent();

  }
}
