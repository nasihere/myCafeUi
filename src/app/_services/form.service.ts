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
        resCustomer: null
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
                return res
            }, res => {
                this.hideLoading();
                return res;
            }))
    }
}