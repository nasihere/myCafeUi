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
  accountDetail: any = true;
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
             if (!res.customerid) {
               this.customerDetail = res;
               this.findSettings(this.customerDetail.username);

             }
             else {
              this.findCustomerById(res.customerid) 
             }
             
          }
          
      });
    }
    findCustomerById(customerId) {
      if (!customerId) {
        this.customerDetail = [];
        return;
      };
      const payload = {
          id: customerId,
          username: this.formService.response.resAuthSignIn.data.Item.username
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
           if (res.data.Item.product1 == undefined) {
            this.accountDetail = null;   
            return;
           }
           this.accountDetail = res.data.Item;
           
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
          agentid: this.billingDetail.agentid,
          productCode1: this.getProduct(1),
          productCode2: this.getProduct(2),
          productCode3: this.getProduct(3),
          productCode4: this.getProduct(4),
          productCode5: this.getProduct(5),
          productCode6: this.getProduct(6),
          productCode7: this.getProduct(7),
          productCode8: this.getProduct(8),
          productCode9: this.getProduct(9),


          productCost1: this.getCost(1),
          productCost2: this.getCost(2),
          productCost3: this.getCost(3),
          productCost4: this.getCost(4),
          productCost5: this.getCost(5),
          productCost6: this.getCost(6),
          productCost7: this.getCost(7),
          productCost8: this.getCost(8),
          productCost9: this.getCost(9),

          productQty1: this.getQtyVal(1),
          productQty2: this.getQtyVal(2),
          productQty3: this.getQtyVal(3),
          productQty4: this.getQtyVal(4),
          productQty5: this.getQtyVal(5),
          productQty6: this.getQtyVal(6),
          productQty7: this.getQtyVal(7),
          productQty8: this.getQtyVal(8),
          productQty9: this.getQtyVal(9)
          
          
          ///start here...
        }
        // const returnUrl = '/admindashboard';
        // this.router.navigate([returnUrl]);
       this.formService.makeBillpaid(payload).subscribe( res => {
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
    getQtyVal(index) {
      if (!this.accountDetail) return null;
      if (document.getElementById(`txtQty${index}`)) {
        //@ts-ignore
        if ( Number(document.getElementById(`txtQty${index}`).value)) {
          //@ts-ignore
          return Number(document.getElementById(`txtQty${index}`).value);
        }
        else {
          return null;
        }
        
      }
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
