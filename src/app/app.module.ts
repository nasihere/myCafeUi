import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {WebcamModule} from 'ngx-webcam';
import { ChartsModule } from 'ng2-charts';

// used to create fake backend

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';

import { LoginComponent } from './login';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { CustomerLookupComponent } from './customer-lookup/customer-lookup.component';
import { ComputerSelectionComponent } from './computer-selection/computer-selection.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgentSetupComponent } from './agent-setup/agent-setup.component';
import {  AdminDashboardComponent } from './admin-dashboard/admin-dashboard-component';
import { ConnectedComputerComponent } from './connected-computer/connection-computer.component';
import { SettingsComponent } from './settings/settings.component';

import { CashDepositComponent } from './cash-deposit/cash-deposit-component';
import { HoursSelectionComponent} from './hour-cost/hour.cost-component';
import { VerifyEmailAccountComponent} from './verifyemailaccount/verifyemailaccount.component';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';;
import { WebcamPicturesComponent } from './webcam-pictures/webcam-pictures.component'
;
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CutomerActivityComponent } from './cutomer-activity/cutomer-activity.component'


@NgModule({
    
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        WebcamModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ChartsModule    ],
    declarations: [
        
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerComponent,
        DashboardComponent,
        DashboardV2Component,
        CheckInOutComponent,
        CustomerLookupComponent,
        ComputerSelectionComponent,
        AgentSetupComponent,
        AdminDashboardComponent,
        ConnectedComputerComponent,
        CashDepositComponent,
        SettingsComponent,
        HoursSelectionComponent,
        VerifyEmailAccountComponent
,
        WebcamPicturesComponent
,
        WelcomePageComponent ,
        CutomerActivityComponent   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }