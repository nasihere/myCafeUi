import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(  private router: Router,public formService: FormService,) { }
  readFromCache = key => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)) || null
  ngOnInit(): void {
    if (this.formService.response.resAuthSignIn == null) {
      this.formService.response.resAuthSignIn = this.readFromCache('resAuthSignIn')
    }
    if ( this.formService.response.resAuthSignIn == null) {
      window.location.href = 'assets/website';
    }
    else {
      const returnUrl = `/admindashboard`;
      this.router.navigate([returnUrl]);
    }
  }

}
