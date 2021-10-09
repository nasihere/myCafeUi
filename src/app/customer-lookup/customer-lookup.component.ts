import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'customer-lookup.component.html' })
export class CustomerLookupComponent {
    constructor(        private router: Router,

        ) { 
           
        }
    onCheckIn() {
        if (window.location.href.indexOf('selfcheckin') != -1) {
            const returnUrl = '/connectedcomputer';
            this.router.navigate([returnUrl]);    
        }
        else {
            const returnUrl = '/computerselection';
            this.router.navigate([returnUrl]);
        }
        
    }
}
