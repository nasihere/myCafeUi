import { HttpClient } from '@angular/common/http';
import { escapeRegExp } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { WebcamImage, WebcamUtil } from 'ngx-webcam';
import { FormService } from '../_services';

@Component({ styleUrls: ['./customer.component.scss'], templateUrl: 'customer.component.html' })
export class CustomerComponent implements OnInit {
    isMobile :boolean = ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent));
    ;
    // latest snapshot
    webCamEnabled: boolean = false;
    webCamDeviceId: string = '';
    public webcamImage: WebcamImage = null;    
    cellPhoneAlreadyExists: boolean = false;
    step:number = 1;
    form: FormGroup;
    loading: boolean;
    userData: any;
    uploader = {
        adharCard: true,
        panCard: true,
        profilePic: true,
        drivingLicense: true,
        otherid: true
    }
    webcamsAvailable: boolean;
    webcamsStart:boolean = false;
    webCamTypeSrc: any;
    webPicListener(image) {
        const picType = this.webCamTypeSrc;
        if (picType == 'profilepic') {
            this.tmpProfilepic = image.imageAsDataUrl;
            this.tmpProfilePicFile = image.imageAsDataUrl;
        }
        else if (picType == 'adharpic') {
            this.tmpAdharCardpic = image.imageAsDataUrl;
            this.tmpAdharCardPicFile = image.imageAsDataUrl;
        }
        else if (picType == 'drivingpic') {
            this.tmpDrivingCardpic = image.imageAsDataUrl;
            this.tmpDrivingCardPicFile = image.imageAsDataUrl;
        }
        else if (picType == 'panpic') {
            this.tmpPANCardpic = image.imageAsDataUrl;
            this.tmpPANCardPicFile = image.imageAsDataUrl;
        }
        else if (picType == 'otherpic') {
            this.tmpOtherCardpic = image.imageAsDataUrl;
            this.tmpOtherCardPicFile = image.imageAsDataUrl;
        }
        
        this.webCamClose({});
    }
    webCamClose(event) {
        this.webcamsStart = false;
    }
    picUploader(id: string) {
        document.getElementById(id).click();

    }
    fileUploadForm: FormGroup;
    fileInputLabel: string;


    constructor(  
        private http: HttpClient,  private formBuilder: FormBuilder, public formService: FormService,        private router: Router,

        ) { 
           
        }
        ngOnInit() {
            
            if (this.formService.response.resAuthSignIn == null) {
                const returnUrl = `/login`;
                this.router.navigate([returnUrl]);
                return;
            }

            this.fileUploadForm = this.formBuilder.group({
                uploadedImage: ['']
              });
              
            this.userData = this.formService.response.resAuthSignIn.data.Item;

            this.form = new FormGroup({
                username : new FormControl(this.userData.username, []),
                
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.email]),
                cellphone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]),
                address: new FormControl('', [Validators.required]),
                gender: new FormControl('m', [Validators.required]),
                iddirivinlicenseno: new FormControl('', []),
                idpancard: new FormControl('', []),
                idadharcard: new FormControl('', []),
                idothercard: new FormControl('', []),

                picProfilePic: new FormControl('', []),
                picdirivinlicenseno: new FormControl('', []),
                picpancard: new FormControl('', []),
                picadharcard: new FormControl('', []),
                picothercard: new FormControl('', []),
              });
              WebcamUtil.getAvailableVideoInputs()
              .then((mediaDevices: MediaDeviceInfo[]) => {
                
                if (mediaDevices && mediaDevices.length >= 1) {
                    
                    this.webCamDeviceId = mediaDevices[0].deviceId;
                    if (this.webCamDeviceId) {
                        this.webcamsAvailable = true;
                    }
                }
              });
        }
    
        public hasError = (controlName: string, errorName: string) =>{
            return this.form.controls[controlName].hasError(errorName);
          }
        // convenience getter for easy access to form fields
        get f() { return this.form.controls; }
    
 
        onSubmit() {
            // const returnUrl = '/checkinout';
            // this.router.navigate([returnUrl]);
            if ( this.form.invalid) {
                alert('Some values are missing in the customer form.')
                return;
            }
            this.formService.showLoading();
            this.onUploadProfilePictures();
            this.onUploadAdharPictures();
            this.onUploadDrivingPictures();
            this.onUploadOtherPictures();
            this.onUploadPANPictures();
            this.onUploadFinished();
           
            
    
        }
        /* ***** PROFILE PIC *****/
        tmpProfilepic: string = ''
        tmpProfilePicFile: File = null;
        tmpProfilepicS3Url: string = '';
        onSelectFileProfilePic(event) {
            if (this.checkWebCamExists('profilepic')) return
            if (event.target.files && event.target.files[0]) {
            this.tmpProfilePicFile =event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
                //@ts-ignore
                this.tmpProfilepic = event.target.result;
            }
            }
        }
        
        onUploadProfilePictures() {
            if (!this.tmpProfilePicFile)  return;
            let url = 'uploadfile';
            let payload = {};
            if (this.webcamsAvailable) {
                url = 'captureImage';
                payload = {
                    base64: this.tmpProfilePicFile
                }
            }
            else {
                
                
                const formData = new FormData();
                
                formData.append('uploadedImage', this.tmpProfilePicFile);
                formData.append('agentId', '401');
                payload = formData;
            }
                
            this.uploader.profilePic = false;

            this.http.post<any>(`${environment.filUploadHost}/${url}`, payload).subscribe(response => {
                    if (response.statusCode === 200) {
                        console.log(response);
                        this.tmpProfilepicS3Url = response.s3URL;
                        
                        this.uploader.profilePic = true;
                        this.onUploadFinished();
                    }
            }, er => {
                console.log(er);
                
                this.uploader.profilePic = true;
                this.onUploadFinished();
                
            });
        }

         /* ***** PROFILE PIC *****/
         tmpAdharCardpic: string = ''
         tmpAdharCardPicFile: File = null;
         tmpAdharCardpicS3Url: string = '';
         onSelectFileAdharPic(event) {
            if (this.checkWebCamExists('adharpic')) return

             if (event.target.files && event.target.files[0]) {
             this.tmpAdharCardPicFile =event.target.files[0];
             var reader = new FileReader();
             reader.readAsDataURL(event.target.files[0]); // read file as data url
 
             reader.onload = (event) => { // called once readAsDataURL is completed
                 //@ts-ignore
                 this.tmpAdharCardpic = event.target.result;
             }
             }
         }
         onUploadAdharPictures() {
            if (!this.tmpAdharCardPicFile)  return;
            let url = 'uploadfile';
            let payload = {};
            if (this.webcamsAvailable) {
                url = 'captureImage';
                payload = {
                    base64: this.tmpAdharCardPicFile
                }
            }
            else {
                
               
                const formData = new FormData();
                if (!this.tmpAdharCardPicFile)  return;
                formData.append('uploadedImage', this.tmpAdharCardPicFile);
                formData.append('agentId', '401');
                payload = formData;
            }
                
            

             this.uploader.adharCard = false;

             this.http.post<any>(`${environment.filUploadHost}/${url}`, payload).subscribe(response => {
                     if (response.statusCode === 200) {
                         console.log(response);
                         this.tmpAdharCardpicS3Url = response.s3URL;
                         
                        this.uploader.adharCard = true;
                        this.onUploadFinished();
                     }
             }, er => {
                 console.log(er);
                 
                 this.uploader.adharCard = true;
                 this.onUploadFinished();
             });
         }


         
         /* ***** OTHER ID PIC *****/
         tmpOtherCardpic: string = ''
         tmpOtherCardPicFile: File = null;
         tmpOtherCardpicS3Url: string = '';
         onSelectFileOtherPic(event) {
            if (this.checkWebCamExists('otherpic')) return

             if (event.target.files && event.target.files[0]) {
             this.tmpOtherCardPicFile =event.target.files[0];
             var reader = new FileReader();
             reader.readAsDataURL(event.target.files[0]); // read file as data url
 
             reader.onload = (event) => { // called once readAsDataURL is completed
                 //@ts-ignore
                 this.tmpOtherCardpic = event.target.result;
             }
             }
         }
         onUploadOtherPictures() {
          
             if (!this.tmpOtherCardPicFile)  return;
             let url = 'uploadfile';
             let payload = {};
             if (this.webcamsAvailable) {
                 url = 'captureImage';
                 payload = {
                     base64: this.tmpOtherCardPicFile
                 }
             }
             else {
                 
                
                const formData = new FormData();
                if (!this.tmpOtherCardPicFile)  return;
                formData.append('uploadedImage', this.tmpOtherCardPicFile);
                formData.append('agentId', '401');
   
                 payload = formData;
             }
                
             
             this.uploader.otherid = false;
             this.http.post<any>(`${environment.filUploadHost}/${url}`, payload).subscribe(response => {
                     if (response.statusCode === 200) {
                         console.log(response);
                         this.tmpOtherCardpicS3Url = response.s3URL;
                         
                        this.uploader.otherid = true;
                        this.onUploadFinished();
                     }
             }, er => {
                 console.log(er);
                 
                 this.uploader.otherid = true;
                 this.onUploadFinished();
             });
         }

         checkWebCamExists(type) {
             if (this.webcamsAvailable) {
                 this.webcamsStart = true;
                 this.webCamTypeSrc = type;
                 window.scrollTo({ top: 0, behavior: 'smooth' });

                 return true;
             }
             return false;
         }
         
         /* ***** Driving License PIC *****/
         tmpDrivingCardpic: string = ''
         tmpDrivingCardPicFile: File = null;
         tmpDrivingCardpicS3Url: string = '';
         onSelectFileDrivingPic(event) {
            if (this.checkWebCamExists('drivingpic')) return

             if (event.target.files && event.target.files[0]) {
             this.tmpDrivingCardPicFile =event.target.files[0];
             var reader = new FileReader();
             reader.readAsDataURL(event.target.files[0]); // read file as data url
 
             reader.onload = (event) => { // called once readAsDataURL is completed
                 //@ts-ignore
                 this.tmpDrivingCardpic = event.target.result;
             }
             }
         }
         onUploadDrivingPictures() {
            if (!this.tmpDrivingCardPicFile)  return;
             let url = 'uploadfile';
             let payload = {};
             if (this.webcamsAvailable) {
                 url = 'captureImage';
                 payload = {
                     base64: this.tmpDrivingCardPicFile
                 }
             }
             else {
                 
                
                const formData = new FormData();
                if (!this.tmpDrivingCardPicFile)  return;
                formData.append('uploadedImage', this.tmpDrivingCardPicFile);
                formData.append('agentId', '401');
   
                 payload = formData;
             }
                
             
             

             this.uploader.drivingLicense = false;

             this.http.post<any>(`${environment.filUploadHost}/${url}`, payload).subscribe(response => {
                     if (response.statusCode === 200) {
                         console.log(response);
                         this.tmpDrivingCardpicS3Url = response.s3URL;
                                
                        this.uploader.drivingLicense = true;
                        this.onUploadFinished();
                     }
             }, er => {
                 console.log(er);
                 
                 this.uploader.drivingLicense = true;
                 this.onUploadFinished();
             });
         }
    
           
         /* ***** Pan Card PIC *****/
         tmpPANCardpic: string = ''
         tmpPANCardPicFile: File = null;
         tmpPANCardpicS3Url: string = '';
         onSelectFilePANPic(event) {
            if (this.checkWebCamExists('panpic')) return

             if (event.target.files && event.target.files[0]) {
             this.tmpPANCardPicFile =event.target.files[0];
             var reader = new FileReader();
             reader.readAsDataURL(event.target.files[0]); // read file as data url
 
             reader.onload = (event) => { // called once readAsDataURL is completed
                 //@ts-ignore
                 this.tmpPANCardpic = event.target.result;
             }
             }
         }
         onUploadPANPictures() {
            if (!this.tmpPANCardPicFile)  return;
             let url = 'uploadfile';
             let payload = {};
             if (this.webcamsAvailable) {
                 url = 'captureImage';
                 payload = {
                     base64: this.tmpPANCardPicFile
                 }
             }
             else {
                 
                const formData = new FormData();
                if (!this.tmpPANCardPicFile)  return;
   
                formData.append('uploadedImage', this.tmpPANCardPicFile);
                formData.append('agentId', '401');
   
                 payload = formData;
             }
                
             

             this.uploader.panCard = false;
             this.http.post<any>(`${environment.filUploadHost}/${url}`, payload).subscribe(response => {
                     if (response.statusCode === 200) {
                         console.log(response);
                         this.tmpPANCardpicS3Url = response.s3URL;
                         this.uploader.panCard = true;
                         this.onUploadFinished();
                     }
             }, er => {
                
                 console.log(er);
                 this.uploader.panCard = true;
                 this.onUploadFinished();
             });
       }
       onUploadFinished() {
            if (this.uploader.panCard === false) return;           
            if (this.uploader.profilePic === false) return;           
            if (this.uploader.adharCard === false) return;           
            if (this.uploader.drivingLicense === false) return;           
            if (this.uploader.otherid === false) return;           

            this.form.get('picProfilePic').setValue(this.tmpProfilepicS3Url);
            this.form.get('picdirivinlicenseno').setValue(this.tmpDrivingCardpicS3Url);
            this.form.get('picpancard').setValue(this.tmpPANCardpicS3Url);
            this.form.get('picadharcard').setValue(this.tmpAdharCardpicS3Url);
            this.form.get('picothercard').setValue(this.tmpOtherCardpicS3Url);



            this.formService.createCustomer(this.form.value).subscribe( res => {
                console.log('res', res)
                const returnUrl = `/customerlookup/`+this.f.cellphone.value + "/admindashboard";
                this.router.navigate([returnUrl]);
                this.formService.hideLoading();
            }, err => {
                this.formService.hideLoading();

            });
            
       }
       

       onNextPage() {
        
        if (this.step == 2) {
            if (this.f.cellphone.invalid) {
                return;
            }
            if (!Number(this.f.cellphone.value)) {
                return;
            }
            this.formService.findByCellPhone({cellphone: this.f.cellphone.value, username: this.f.username.value}).subscribe( res => {
                if (res) {
                    if (res.customerNotFound) {
                        this.cellPhoneAlreadyExists = false;
                        this.step = this.step + 1        
                        return;
                    }
                    else {
                        this.cellPhoneAlreadyExists = true;
                    }
                    
                }
                else {
                    this.step = this.step + 1        
                }
            })
        }
        else {
            if (this.step == 4)            {
                if (this.f.address.invalid) {
                    return;
                }
            }
            this.step = this.step + 1
        }
        
       }
       onPrevPage() {
       
        this.step = this.step - 1; 
        this.step = this.step == 0 ? 1 : this.step;
       }
}