import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'customer-lookup.component.html' })
export class CustomerLookupComponent {
    data = null;
    cellphone: number = null;
    ref: string = '';
    constructor(   private route: ActivatedRoute,      public formService: FormService,     private router: Router,

        ) { 
          
        }

    ngOnInit() {
        
        this.data = this.formService.response.resCustomer;
              
        this.route.params.subscribe(params => {
            this.cellphone = params['cellphone'];
            this.ref = '/'+params['ref'];
            this.getCustomerInfo(this.cellphone);
            return params;
        });
    
        }   
        
    onCheckIn() {
        if (window.location.href.indexOf('selfcheckin') != -1) {
            const returnUrl = '/hoursselection';
            this.router.navigate([returnUrl]);    
        }
        else {
            const returnUrl = '/computerselection';
            this.router.navigate([returnUrl]);
        }
        
    }
    getCustomerInfo(cellphone) {
        this.formService.findByCellPhone({cellphone}).subscribe( res => {
            if (res) {
                this.data = res;
            }
            else {
               this.data = null;    
            }
        })
    }
}
