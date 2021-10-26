import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { FormService } from './_services/form.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    appPage: boolean = true;
    
    
      ngOnInit() {
      
      }
    constructor(public formService: FormService,private router: Router,private authenticationService: AuthenticationService,  private route: ActivatedRoute,) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.router.events.subscribe(
            (event: any) => {
              if (event instanceof NavigationEnd) {
                console.log('this.router.url', this.router.url);
                if (this.router.url == '/welcome') {
                    this.appPage = false;
                }
              }
            }
          );
    }

    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}