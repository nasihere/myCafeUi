import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { FormService } from './_services/form.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
  
    
    
      ngOnInit() {
      
      }
    constructor(
        public formService: FormService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}