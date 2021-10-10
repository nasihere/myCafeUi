import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';
import { CustomerLookupComponent } from './customer-lookup/customer-lookup.component';
import { ComputerSelectionComponent } from './computer-selection/computer-selection.component';
import { AgentSetupComponent } from './agent-setup/agent-setup.component';
import {  AdminDashboardComponent } from './admin-dashboard/admin-dashboard-component';
import { ConnectedComputerComponent } from './connected-computer/connection-computer.component';
import { CashDepositComponent } from './cash-deposit/cash-deposit-component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'connectedcomputer', component: ConnectedComputerComponent, canActivate: [AuthGuard] },
    { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'agentsetup', component: AgentSetupComponent, canActivate: [AuthGuard] },
    { path: 'cashdeposit', component: CashDepositComponent, canActivate: [AuthGuard] },
    
    { path: 'computerselection', component: ComputerSelectionComponent, canActivate: [AuthGuard] },
    { path: 'customerlookup', component: CustomerLookupComponent, canActivate: [AuthGuard] },
    { path: 'customerlookup/:ref', component: CustomerLookupComponent, canActivate: [AuthGuard] },
    { path: 'checkinout', component: CheckInOutComponent, canActivate: [AuthGuard] },
    { path: 'dashboardv2', component: DashboardV2Component, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'register', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
