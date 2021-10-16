import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'cash-deposit-component.html' })
export class CashDepositComponent implements OnInit  {
    overlaybackground:boolean = false;  
    paymentMaking: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
  paramId: any;
  billingDetail: any;
  customerDetail: any;
  accountDetail: any;
  totalSum: number = 0;
    constructor(   public formService: FormService,       private route: ActivatedRoute,             private router: Router,

    ) { 
       
    }
    ngOnInit() {

        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
             
          });
          this.route.params.subscribe(params => {
            this.paramId = params['billingid'];
            this.findBillingId(this.paramId);
            
            return params;
        });
    }
    findBillingId(billingId) {
      
      const payload = {
          id: billingId
      }
      this.formService.findBillingDetail(payload).subscribe( res => {
          if (res) {
             this.billingDetail = res;
             this.findCustomerById(res.customerid) 
          }
          
      });
    }
    findCustomerById(customerId) {
      
      const payload = {
          id: customerId
      }
      this.formService.findCustomerById(payload).subscribe( res => {
          if (res) {
             this.customerDetail = res;
             this.findSettings(this.customerDetail.username);
          }
          
      });
    }
    findSettings(username) {
      this.formService.getSettings({username,password:'abc'}).subscribe( res => {
           this.accountDetail = res.data.Item;
           if (!this.accountDetail.product3) {
            this.accountDetail.product3 = null;
           }
        }, err => {
          this.accountDetail = null;
        });
    }
    
    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    onPaidMoney() {
        console.log('onPaidMoney');
        const payload = {
          billingId: this.billingDetail.id,
          billTotal: this.totalSum,
          ///start here...
        }
        // const returnUrl = '/admindashboard';
        // this.router.navigate([returnUrl]);
       this.formService.makeBillpaid({}).subscribe( res => {
            if (res) {
              
              this.paymentMaking = true;
            }
            
        });
    }
    onRouteAdminDashboard() {
      console.log('onRouteAdminDashboard');
        this.paymentMaking = false;
        const returnUrl = '/admindashboard';
        this.router.navigate([returnUrl]);
    }
    getProduct(index) {
      if (!this.accountDetail) return null;
      return this.accountDetail[`product${index}`] ? this.accountDetail[`product${index}`] : null ;
    }
    getDescription(index) {
      if (!this.accountDetail) return null;
      return  this.accountDetail[`desc${index}`] ? this.accountDetail[`desc${index}`] : null ;
    }
    getCost(index) {
      if (!this.accountDetail) return null;
      return this.accountDetail[`perCost${index}`] ? this.accountDetail[`perCost${index}`] : null ;
    }
    onCalculate() {
      this.totalSum = 0;
      if (document.getElementById('txtQty1')) {
        //@ts-ignore
        this.totalSum +=  Number(document.getElementById('txtQty1').value) * this.getCost(1);
      }
      if (document.getElementById('txtQty2')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty2').value) * this.getCost(2);
      }
      if (document.getElementById('txtQty3')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty3').value) * this.getCost(3);
      }
      if (document.getElementById('txtQty4')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty4').value) * this.getCost(4);
      }
      if (document.getElementById('txtQty5')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty5').value) * this.getCost(5);
      }
      if (document.getElementById('txtQty6')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty6').value) * this.getCost(6);
      }
      if (document.getElementById('txtQty7')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty7').value) * this.getCost(7);
      }
      if (document.getElementById('txtQty8')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty8').value) * this.getCost(8);
      }
      if (document.getElementById('txtQty9')) {
        //@ts-ignore
        this.totalSum += Number(document.getElementById('txtQty9').value) * this.getCost(9);
      }

    }
}
