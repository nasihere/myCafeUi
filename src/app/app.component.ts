import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { FormService } from './_services/form.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    appPage: boolean = true;
    showHeader: boolean = true;
    readFromCache = key => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)) || null

      ngOnInit() {
       
      }
    constructor(public formService: FormService,private router: Router,private authenticationService: AuthenticationService,  private route: ActivatedRoute,) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.router.events.subscribe(
            (event: any) => {
              if (event instanceof NavigationEnd) {
               
                if (this.router.url == '/') {
                    if (this.formService.response.resAuthSignIn == null) {
                        this.formService.response.resAuthSignIn = this.readFromCache('resAuthSignIn')
                      }
                      if ( this.formService.response.resAuthSignIn == null) {
                        window.location.href = 'assets/website';
                      }
                  }
                }
               
            }
          );
    }

    
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    hideheaders() {
      this.showHeader = false;
    }
    showHeaders() {
      this.showHeader = true;
    }
}