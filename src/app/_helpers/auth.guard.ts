import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService, FormService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        public formService: FormService,
         private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    readFromCache = key => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)) || null

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUserValue;
        // if (currentUser) {
        //     // logged in so return true
        //     return true;
        // }

        // not logged in so redirect to login page with the return url
        if (this.formService.response.resAuthSignIn == null) {
            this.formService.response.resAuthSignIn = this.readFromCache('resAuthSignIn')
        }
        return true;
    }
}