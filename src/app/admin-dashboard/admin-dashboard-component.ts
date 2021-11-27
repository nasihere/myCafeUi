import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';



@Component({ templateUrl: 'admin-dashboard-component.html' })
export class AdminDashboardComponent implements OnInit  {
    adminPassword: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    customerNotFound: boolean = false;
    smsTotalBalance: number = 0;
    smsUserBalance: number = 0;
    smsFlag: boolean = false;
    resAuth: any = null;


    public doughnutChartLabels: Label[] = ['Total SMS', 'Used SMS'];
    public doughnutChartData: MultiDataSet = [
      [350, 450],
    ];

    public doughnutChartLabelsUnPaid: Label[] = ['Paid', 'UnPaid'];
    public doughnutChartDataUnPaid: MultiDataSet = [
      [350, 450],
    ];
    public doughnutChartType: ChartType = 'doughnut';

    public barChartOptions: any = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      };
      public barChartLabels: Label[] = [];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
    
      public barChartData: any[] =[
        { data: [], label: 'Income' }
      ]
    
    
    constructor(    public formService: FormService,    private router: Router,

    ) { 
       
    }
    reload() {
        window.location.reload()
    }
    ngOnInit() {
        if (this.formService.response.resAuthSignIn == null) {
            const returnUrl = `/login`;
            this.router.navigate([returnUrl]);
            return;
        }
        this.resAuth = this.formService.response.resAuthSignIn['data']['Item'];
        this.getBillingHistory();
        this.drawPieSMS();
        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
            otpverify: new FormControl('', [Validators.required]),
             search: new FormControl('', [Validators.required]),
            cellphone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern(MOBILE_PATTERN)]),
            password: new FormControl('',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)])
          });

    }

    getBillingHistory() {
        
   
        const payload = {
            username: this.formService.response.resAuthSignIn.data.Item.username
        }
        this.formService.getBillingHistory(payload).subscribe( res => {
            this.drawBusinessValue();

        })
            
        
        
      
      }
    drawPieSMS() {
        this.smsTotalBalance = this.resAuth['smsBalance'];
        this.smsUserBalance = this.resAuth['usedSMS'];
        this.smsFlag = this.resAuth['country'] == 'India';

        this.doughnutChartData = [
            [(this.smsTotalBalance - this.smsUserBalance), this.smsUserBalance],
          ];
    }
    drawBusinessValue(): void {
        const data = this.formService.response.resBillingHistory;
        if (!data || !data.length) {
            return;
        }
        // const selfCheckIn = data.filter( item => item.selfCheckIn);
        data.sort((a,b) => b.billDt - a.billDt)
        const paid = data.filter( item => item.billPaid && item.billTotal > 0);
        const unpaid = data.filter( item => !item.billPaid || item.billTotal == 0);
       
        let dataMapPaid = {

        }
        let dataMapUnPaid = {

        }
        for (const item of paid) {
            const billDt = item.billDt && item.billDt.substr(0, 7);
            if (dataMapPaid[billDt]) {
                dataMapPaid[billDt] = dataMapPaid[billDt] + item.billTotal;
            }
            else {
                dataMapPaid[billDt] = item.billTotal;
            }
        }
        dataMapPaid = Object.keys(dataMapPaid).sort().reduce(
            (obj, key) => { 
              obj[key] = dataMapPaid[key]; 
              return obj;
            }, 
            {}
          );
          
        for (const key in dataMapPaid) {
            this.barChartLabels.push(key);
        }
        for (const key in dataMapPaid) {
            this.barChartData[0].data.push(dataMapPaid[key]);
        }

        this.doughnutChartDataUnPaid = [paid.length, unpaid.length]
      }
    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit(searchText) {
        
        this.submitted = true;
        
        if (!searchText) {
            searchText = this.f.search.value;
        }
        this.loading = true;
        if (!searchText) {
            return;
        }
        const payload = {
            searchText,
            username: this.formService.response.resAuthSignIn.data.Item.username
        }
        this.customerNotFound = false;
        this.formService.findByCustomerSearchText(payload).subscribe( res => {
        if (res) {
            
            const returnUrl = '/customerlookup/' + this.formService.response.resCustomer.cellphone + '/admindashboard';
            this.router.navigate([returnUrl]);
        }
        else {
                console.log('cant find the customer')   
                this.customerNotFound = true;
            }
        })
            
        
        

    }
    
    onSendOTP() {
        console.log(this.f.cellphone.value)
        console.log('onSendOTP');
        this.step = 3;
    }
    onVerifyOTP() {
        console.log(this.f.otpverify.value)
        console.log('onVerifyOTP');
        const returnUrl = '/customerlookup';
        this.router.navigate([returnUrl]);
    }
    // onVerifyAdminPassword() {
        
    //     console.log(this.f.password.value)
    //     console.log('onVerifyAdminPassword');
    //     const returnUrl = '/computerselection';
    //     this.router.navigate([returnUrl]);
    // }
}
