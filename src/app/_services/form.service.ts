import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FormService {
    loading: boolean = false;
    response = {
        resAuthSignUp: null,
        resAuthSignIn: null,
        resCustomer: null,
        resPCSelected: null,
        resCustomerList: null,
        resPCCreated: null,
        resAllPCs: null,
        resAgent: null,
        resBilling: null,
        resLatestBilling: null
    }
    
    constructor(private http: HttpClient) { }
    showLoading() {
        this.loading = true;
    }
    hideLoading() {
        this.loading = false;
    }
    createRegister(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/signup`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resAuthSignUp = payload;
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
            
        
    }
    authSignIn(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/signin`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resAuthSignIn = res;
                localStorage.setItem('resAuthSignIn', JSON.stringify(res));
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    getSettings(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/settings`, payload).pipe(
            map(res => { 
                this.hideLoading();
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    authEmailVerify(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/verify`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resAuthSignIn = res;
                localStorage.setItem('resAuthSignIn', JSON.stringify(res));
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }

    getCafeAccount(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/signin`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resAuthSignIn = res;
                localStorage.setItem('resAuthSignIn', JSON.stringify(res));
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    updateUser(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/auth/updateuser`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resAuthSignIn.data.Item = { ...this.response.resAuthSignIn.data.Item, ...res['req']};
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }

    createCustomer(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/customer/create`, payload).pipe(
            map(res => { 
                this.hideLoading();
                this.response.resCustomer = res;
                this.response.resCustomerList = res;
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findCustomerById(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/customer/findCustomerById`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data']) {
                    this.response.resCustomer = res['data'].Item;
                    this.response.resCustomerList = [res['data'].Item];
                }
                else {
                    this.response.resCustomer = null;
                    this.response.resCustomerList = null;
                }
                
                return this.response.resCustomer;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findByCellPhone(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/customer/findByCellPhone`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data'].Count) {
                    this.response.resCustomer = res['data'].Items[0];
                    this.response.resCustomerList = res['data'].Items;
                }
                else {
                    this.response.resCustomer = null;
                    this.response.resCustomerList = null;
                }
                
                return this.response.resCustomer;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findByCustomerSearchText(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/customer/findBySearchText`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data'].Count) {
                    this.response.resCustomer = res['data'].Items[0];
                    this.response.resCustomerList = res['data'].Items;
                    
                }
                
                else {
                    this.response.resCustomer = null;
                    this.response.resCustomerList = null;
                }
                
                return this.response.resCustomer;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findByPCName(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/findByPCName`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data'].Count) {
                    this.response.resPCSelected = res['data'].Items[0];
                }
                else {
                    this.response.resPCSelected = null;
                }
                
                return this.response.resPCSelected;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    createAgent(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/create`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data'].Count) {
                    this.response.resPCCreated = res['data'].Item;
                }
                else {
                    this.response.resPCCreated = null;
                }
                
                return this.response.resPCCreated;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    getAllAgentPC(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/findAllPcs`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data'].Count) {
                    this.response.resAllPCs = res['data'].Items;
                }
                else {
                    this.response.resAllPCs = null;
                }
                
                return this.response.resAllPCs;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    onlineAgent(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/onlineAgent`, payload).pipe(
            map(res => { 
                this.hideLoading();
                return res;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findAgent(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/findAgentDetail`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res) {
                    this.response.resAgent = res['data'].Item;
                }
                else {
                    this.response.resAgent  = null;
                }
                
                return this.response.resAgent ;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    
    billingStart(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/billingStart`, payload).pipe(
            map(res => { 
                this.hideLoading();
                return res;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    bookAgent(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/bookAgent`, payload).pipe(
            map(res => { 
                this.hideLoading();
               
                
                return res;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    unlockAgent(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/unlockAgent`, payload).pipe(
            map(res => { 
                this.hideLoading();
                return res;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    findBillingDetail(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/customer/findBillingId`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data']) {
                    this.response.resBilling = res['data'].Item;
                }
                else {
                    this.response.resBilling = null;
                }
                
                return this.response.resBilling;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    
    makeBillpaid(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/billpaid`, payload).pipe(
            map(res => { 
                this.hideLoading();
               
                return res;
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
    getLatestBilling(payload): Observable<any> {
        this.showLoading();
        return this.http.post(`${environment.apiUrl}/agent/billingSessions`, payload).pipe(
            map(res => { 
                this.hideLoading();
                if (res['data']) {
                    if (res['data'].Count) {
                        this.response.resLatestBilling = res['data'].Items;
                    }
                }
                
                return this.response.resLatestBilling;
            }, res => {
                this.hideLoading();
                this.response.resLatestBilling = null;
                return res;
            }))
    }
}