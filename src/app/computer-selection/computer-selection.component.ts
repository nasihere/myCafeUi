import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../_services';

@Component({selector: 'terminal-status', templateUrl: 'computer-selection.component.html' })
export class ComputerSelectionComponent  implements OnInit {
    verifingPassword: boolean = false;
    verifingPasswordValid: boolean = false;
    selectedTerminalItem: any;

    @Input() limitedView = false ;
    lockItem: any;  
    lockMachine: boolean = false;
    settingTime: boolean = false;
    form: FormGroup;
    step: number = 1;
    cashDeposit: boolean = false;
    pcCode: number = 0;
    data: any;
    timerList = [
        {label: '0min', value: 0},
        {label: '15min', value: 15},
        {label: '30min', value: 30},
        {label: '1hr', value: 60},
        {label: '2hr', value: 120},
        {label: '3hr', value: 180},
        {label: '4hr', value: 240},
        {label: 'No Limit', value: 2400}
    ];
    pcAgentsList: any = null;
    infoSetupIncomplete: boolean = false;
    selectedAgent: any;
    paramCustId: any;
    settingItem: any;
    constructor(      private route: ActivatedRoute,   public formService: FormService,      private router: Router,

        ) { 
           
        }

        ngOnInit() {
         
            if (this.formService.response.resAuthSignIn == null) {
                const returnUrl = `/login`;
                this.router.navigate([returnUrl]);
                return;
            }
            this.data = this.formService.response.resAuthSignIn.data.Item;
            this.form = new FormGroup({
                password: new FormControl('',[Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)])
              });

            
            this.route.params.subscribe(params => {
                this.paramCustId = params['customerid'];
                return params;
            });
            this.getAllAgentPC();
            
        }
        getBillingDetails(billingId) {
            if (this.formService.response.resLatestBilling) {
                for (const item of this.formService.response.resLatestBilling) {
                    if (item.id == billingId) {
                        return item;
                    }
                }
            }
            return {
                checkInTime: null,
                checkOutTime: null,
                duration: null
            }
        }
        getAllAgentPC() {
            const payload = {
                username: this.data.username
            }
            this.formService.getAllAgentPC(payload).subscribe( res => {
                if (res) {
                    this.pcAgentsList = res;
                }
                else {
                   this.pcAgentsList = null;
                }
            })
        }
        
        public hasError = (controlName: string, errorName: string) =>{
            return this.form.controls[controlName].hasError(errorName);
          }
        // convenience getter for easy access to form fields
        get f() { return this.form.controls; }
    

        onVerifyAdminPassword() {
        console.log('onVerifyAdminPassword terminal ');
        console.log(this.f.password.value)

        if (this.form.invalid) {
            return;
        }
    }
    reload() {
        window.location.reload()
    }
    onLockPC(item) {
        this.pcCode = null;
        item.accessCode = null;
        item.accessAt = null;
        item.timer = null;
        item.customerId = null;    
        item.agentid = item.id;
        item.pcstatus = 'finished';
        console.log('onCancelWaiting', item);
        this.selectedAgent = item;
        this.formService.bookAgent(item).subscribe( res => {
            if (res) {
              this.onSocketCall(item.agentid, 'LOCK')
              this.reload();
            }
            else {
               
            }
        })
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
    onCancelWaiting(item) {
        this.pcCode = null;
        item.accessCode = null;
        item.accessAt = null;
        item.timer = null;
        item.customerId = null;
        item.pcstatus = 'ready';
        console.log('onCancelWaiting', item);
        this.selectedAgent = item;
        this.formService.bookAgent(item).subscribe( res => {
            if (res) {
              
              
            }
            else {
               
            }
        })
    }
    onMiscServices() {
        const payload = {
            agentid: 'PC-MISC',
            customerid: this.paramCustId,
            username: this.data.username,
            customerName: 'Public'

        }
        if (this.formService.response.resCustomer) {
            payload.customerName = this.formService.response.resCustomer.name;
            payload.customerid = this.formService.response.resCustomer.id;
        }
        this.formService.billingStart(payload).subscribe( res => {
            if (res) {
                
                const returnUrl = '/cashdeposit/' + res.billingId;
                this.router.navigate([returnUrl]);
            }
            else {
               
            }
        })
    }
    onCashDeposit() {
        
        const item = {
            accessCode: null,
            accessAt: new Date().toISOString(),
            pcstatus: 'busy',
            agentid: 'PC-MISC',
            customerid: 'public',
            customerName: 'public',
            username: this.data.username
        }  
        
        if (this.formService.response.resCustomer) {
            item.customerid = this.formService.response.resCustomer.id;
            item.customerName = this.formService.response.resCustomer.name;
        }
        this.formService.bookAgent(item).subscribe( res => {
            if (res) {
                const returnUrl = '/cashdeposit/' + res.billingId;
                this.router.navigate([returnUrl]);
              
            }
            else {
              
            }
        })
    }
    onAvailablePC(item) {
        this.settingTime = true;
        this.settingItem = item;
    }
    onSelectedTime(item) {
        this.settingTime = false;
        this.pcCode = Math.floor(1000 + Math.random() * 9000);
        item.accessCode = this.pcCode;
        item.accessAt = new Date().toISOString();
        if (item.timerI)
            item.timer = item.timerI || 60;
        else 
            item.timer = 60;
        item.pcstatus = 'waiting';
        item.selfCheckin = false;
        item.customerId = this.paramCustId;
        console.log('onAvailablePC', item);
        this.selectedAgent = item;
        this.formService.bookAgent(item).subscribe( res => {
            if (res) {
              
              
            }
            else {
               
            }
        })
        this.settingItem = null;
    }
    onPCCodeVerify() {
        console.log('onPCCodeVerify');
        this.pcCode = 0;
          const returnUrl = '/checkinout';
        this.router.navigate([returnUrl]);
    }
    
    verifyPassword() {
        if (this.f.password.invalid) {
            return;
        }
        this.verifingPasswordValid = false;
        if (this.f.password.value == this.formService.response.resAuthSignIn.data.Item.password) {
            const payload = {
                id: this.selectedTerminalItem.id
            }
           this.formService.removeAgent(payload).subscribe( res => {
                if (res) {
                   this.reload();
                
                }
                else {
                
                }
            })
        }
        else {
            this.verifingPasswordValid = true;
            this.verifingPassword = true;

        }
        
    }
}
