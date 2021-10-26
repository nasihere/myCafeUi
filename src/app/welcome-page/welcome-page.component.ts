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
  ngOnInit(): void {
  
  }

}
