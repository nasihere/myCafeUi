import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

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

@NgModule({
    
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerComponent,
        DashboardComponent,
        DashboardV2Component,
        CheckInOutComponent,
        CustomerLookupComponent,
        ComputerSelectionComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }