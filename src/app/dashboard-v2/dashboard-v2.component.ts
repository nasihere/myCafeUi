import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services';
import * as moment from 'moment';
@Component({selector:'dashboard-terminal', templateUrl: 'dashboard-v2.component.html' })
export class DashboardV2Component implements OnInit   {
  lockMachine: boolean = false;
  lockItem: any;  
 ELEMENT_DATA  = [
    {maxSessionTime: '1 hour', session: true, paid: false, customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1 - 003',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {maxSessionTime: '', session: false, paid: false, customer: 'Zakir Shaihh', cost: '$10.00', verify: 'NO', computer: 'PC 2 - 992',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"2 hr 3 min"},
    {maxSessionTime: '30 min', session: true, paid: true, customer: 'Sabah Khan', cost: '$26.00', verify: 'NO', computer: 'PC 1 - 002',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"6 hr 3 min"},
    {maxSessionTime: '', session: false, paid: true, customer: 'Alamgeer Mohammed', cost: '$30.00', verify: 'Yes', computer: 'PC 1 - 002',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {maxSessionTime: '', session: false, paid: false, customer: 'Swapnil Naik', cost: '$22.00', verify: 'Yes', computer: 'PC 3 = 994',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"30 min"},
    {maxSessionTime: '', session: false, paid: true, customer: 'Rahul Sharm', cost: '$64.00', verify: 'Yes', computer: 'PC 6 - 493',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"56min"},
    {maxSessionTime: '', session: false, paid: true, customer: 'Vaibhav Kumar', cost: '$35.00', verify: 'Yes', computer: 'PC 5 - 439',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"7 hr 3 min"}
  ];
  displayedColumns: string[] = ['computer','customer', 'verify',   'timeIN', 'timeOUT', 'duration', 'cost','lock'];
  dataSource = this.ELEMENT_DATA;
  data: any;
  pcAgentsList: any;
  
  constructor(    public formService: FormService,   

    ) { 
       
    }
    ngOnInit() {
     
      this.getAllAgentPC(); 
    }
    
    getAllAgentPC() {
      const payload = {
          username: this.formService.response.resAuthSignIn.data.Item.username
      }
      this.formService.getAllAgentPC(payload).subscribe( res => {
          if (res) {
              this.pcAgentsList = res;
              this.onGetTopBilling();   
          }
          else {
            this.pcAgentsList = null;
          }
      })
    }
  onGetTopBilling() {
        
   
    const payload = {
        pageLimit: 30,
        username: this.formService.response.resAuthSignIn.data.Item.username
    }
    this.formService.getLatestBilling(payload).subscribe( res => {
    if (res) {

      this.data = res.sort((a,b) => new Date(b.billDt).getTime() - new Date(a.billDt).getTime());
      this.data = this.data.map(item => {
        const agentid = item.agentid;
        const agent = this.pcAgentsList.filter(i => {
          return i.id == agentid;
        });
        if (agent && agent.length) {
          item.agentName = agent[0].pcname;
        }
       
        
        
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
      });
    }
    })
        
    
    

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
onLockPC(row) {
      const item = {
        
        billingId: row.id,
        agentid: row.agentid,
        id: row.id,
        customerId: row.customerid,
        pcstatus: 'finished'
      };
      //row.customerid = null;
      row.pcstatus = 'finished';
      console.log('onLockPC', item);
      this.formService.bookAgent(item).subscribe( res => {
          if (res) {
            this.onSocketCall(item.agentid, 'LOCK')
            this.reload();
          }
          else {
            
          }
      })
    }
    
    reload() {
      window.location.reload()
    }
    onSocketCall(agentid, action, timer = 30) {
      const payload = {
          agentid,
          action,
          timer
      }
      this.formService.socketAPI(payload).subscribe( res => {
          if (res) {
            
            
          }
          else {
             
          }
      })
  }
}