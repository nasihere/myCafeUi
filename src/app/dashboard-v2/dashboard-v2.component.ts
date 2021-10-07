import { Component } from '@angular/core';

@Component({ templateUrl: 'dashboard-v2.component.html' })
export class DashboardV2Component {
  
 ELEMENT_DATA  = [
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"},
    {customer: 'Nasir Sayed', cost: '$20.00', verify: 'Yes', computer: 'PC 1',timeIN: '10:01:03',timeOUT: '11:01:03',duration:"1 hr 3 min"}
  ];
  displayedColumns: string[] = ['computer','customer', 'verify',   'timeIN', 'timeOUT', 'duration', 'cost','lock'];
  dataSource = this.ELEMENT_DATA;
}
