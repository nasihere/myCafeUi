import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'customer-lookup.component.html' })
export class CustomerLookupComponent {
    data = null;
    cellphone: number = null;
    ref: string = '';
    singleCustomer: boolean = false;
    resCustomerList: any;
    dataList: any;
    userData: any;
    agentId: string;
    constructor(   private route: ActivatedRoute,      public formService: FormService,     private router: Router,

        ) { 
          
        }

    ngOnInit() {
        if (this.formService.response.resAuthSignIn == null) {
            const returnUrl = `/login`;
            this.router.navigate([returnUrl]);
            return;
        }

        if (this.formService.response.resCustomerList == null) {
            const returnUrl = '/admindashboard';
            this.router.navigate([returnUrl]);    
            return;
        }
        
        this.userData = this.formService.response.resAuthSignIn.data.Item;

        this.dataList = this.formService.response.resCustomerList;
        this.singleCustomer = this.formService.response.resCustomerList && 
                                this.formService.response.resCustomerList.length == 1;      
        this.route.params.subscribe(params => {
            this.cellphone = params['cellphone'];
            this.ref = '/'+params['ref'];
            if (params['ref'] == 'checkinout') {
                this.ref = `/checkinout/${params['agentId']}`;
            }
            this.getCustomerInfo(this.cellphone);
            return params;
        });
    
        }   
        
    onCheckIn(custid) {
        if (window.location.href.indexOf('selfcheckin') != -1) {
            const returnUrl = '/hoursselection';
            this.router.navigate([returnUrl]);    
        }
        else {
            const returnUrl = '/computerselection/'+ custid;
            this.router.navigate([returnUrl]);
        }
        
    }
    getCustomerInfo(cellphone) {
        this.formService.findByCellPhone({cellphone, username: this.userData.username}).subscribe( res => {
            if (res) {
                this.data = [res];
            }
            else {
               this.data = null;    
            }
        })
    }
}
