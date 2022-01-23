import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FormService } from '../_services';

@Component({
  selector: 'app-cutomer-activity',
  templateUrl: './cutomer-activity.component.html',
  styleUrls: ['./cutomer-activity.component.less']
})
export class CutomerActivityComponent implements OnInit {

  
    data = null;
    cellphone: number = null;
    ref: string = '';
    singleCustomer: boolean = false;
    resCustomerList: any;
    dataList: any;
    userData: any;
    agentId: string;
    @Input() customerId = '' ;
    constructor(   private route: ActivatedRoute,      public formService: FormService,     private router: Router,

        ) { 
          
        }

    ngOnInit() {
        if (this.formService.response.resAuthSignIn == null) {
            const returnUrl = `/login`;
            this.router.navigate([returnUrl]);
            return;
        }

        if (this.formService.response.resCustomerList == null) {
            const returnUrl = '/admindashboard';
            this.router.navigate([returnUrl]);    
            return;
        }
        
        this.userData = this.formService.response.resAuthSignIn.data.Item;

        this.dataList = this.formService.response.resCustomerList;
        this.singleCustomer = this.formService.response.resCustomerList && 
                                this.formService.response.resCustomerList.length == 1;      
        this.route.params.subscribe(params => {
            this.cellphone = params['cellphone'];
            this.ref = '/'+params['ref'];
            if (params['ref'] == 'checkinout') {
                this.ref = `/checkinout/${params['agentId']}`;
            }
            this.getCustomerActivity(this.customerId);
            return params;
        });
    
        }   
        
    onCheckIn(custid) {
        if (window.location.href.indexOf('selfcheckin') != -1) {
            const returnUrl = '/hoursselection';
            this.router.navigate([returnUrl]);    
        }
        else {
            const returnUrl = '/computerselection/'+ custid;
            this.router.navigate([returnUrl]);
        }
        
    }
    getCustomerActivity(customerId) {
        this.formService.findCustomerIdByActivity({customerId: customerId, username: this.userData.username}).subscribe( res => {
            if (res) {
              this.data = res.data['Items'].map( item => this.cleanBillRow(item))  
              
                
                
            }
            else {
               this.data = null;    
            }
            this.formService.hideLoading();
        }, err => {
          this.formService.hideLoading();
        })
    }
    cleanBillRow(item) {
      item.checkInDate = new Date(item.checkIn);
      item.checkOutDate = new Date(item.checkout);


      item.checkInDate = moment(item.checkInDate).format('YYYY-MM-DD');
      item.checkOutDate = moment(item.checkOutDate).format('YYYY-MM-DD');

      item.checkInTime = new Date(item.checkIn);
      item.checkOutTime = new Date(item.checkout);

      item.checkInTime = moment(item.checkInTime).format('hh:mm A');
      item.checkOutTime = moment(item.checkOutTime).format('hh:mm A');
      
      item.duration =  this.get_time_diff( item.checkIn, item.checkout)
    return item;
    }
  
    get_time_diff = ( datetime, datetime2 ) => {
      var date1 = new Date(datetime);
      var date2 = new Date(datetime2);
      
      var diff = date2.getTime() - date1.getTime();
      
      var msec = diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      var ss = Math.floor(msec / 1000);
      msec -= ss * 1000;
      
      return hh + ":" + mm + ":" + ss;
    }
}
