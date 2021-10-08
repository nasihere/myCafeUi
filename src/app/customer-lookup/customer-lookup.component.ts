import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'customer-lookup.component.html' })
export class CustomerLookupComponent {
    constructor(        private router: Router,

        ) { 
           
        }
    onCheckIn() {
        const returnUrl = '/computerselection';
        this.router.navigate([returnUrl]);
    }
}
