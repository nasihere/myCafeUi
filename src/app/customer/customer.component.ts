import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ styleUrls: ['./customer.component.scss'], templateUrl: 'customer.component.html' })
export class CustomerComponent implements OnInit {
    
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
                
                name: new FormControl('daniyal sayed', [Validators.required]),
                email: new FormControl('dani@gmail.com', [Validators.required, Validators.email]),
                cellphone: new FormControl('4084667445', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]),
                address: new FormControl('327 West Side Drive #302 Gaithersburg MD 20878', [Validators.required]),
                gender: new FormControl('m', [Validators.required]),
                iddirivinlicenseno: new FormControl('DLV-34534', []),
                idpancard: new FormControl('PAN943534', []),
                idadharcard: new FormControl('ADR123456', []),
                idothercard: new FormControl('OTH-23423', []),

                picProfilePic: new FormControl('', []),
                picdirivinlicenseno: new FormControl('', []),
                picpancard: new FormControl('', []),
                picadharcard: new FormControl('', []),
                picothercard: new FormControl('', []),
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
            const formData = new FormData();
            if (!this.tmpProfilePicFile)  return;
            formData.append('uploadedImage', this.tmpProfilePicFile);
            formData.append('agentId', '401');

            this.uploader.profilePic = false;

            this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
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
             const formData = new FormData();
             if (!this.tmpAdharCardPicFile)  return;
             formData.append('uploadedImage', this.tmpAdharCardPicFile);
             formData.append('agentId', '401');

             this.uploader.adharCard = false;

             this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
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
             const formData = new FormData();
             if (!this.tmpOtherCardPicFile)  return;
             formData.append('uploadedImage', this.tmpOtherCardPicFile);
             formData.append('agentId', '401');

             this.uploader.otherid = false;
             this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
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


         
         /* ***** Driving License PIC *****/
         tmpDrivingCardpic: string = ''
         tmpDrivingCardPicFile: File = null;
         tmpDrivingCardpicS3Url: string = '';
         onSelectFileDrivingPic(event) {
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
             const formData = new FormData();
             if (!this.tmpDrivingCardPicFile)  return;
             formData.append('uploadedImage', this.tmpDrivingCardPicFile);
             formData.append('agentId', '401');

             this.uploader.drivingLicense = false;

             this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
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
             const formData = new FormData();
             if (!this.tmpPANCardPicFile)  return;

             formData.append('uploadedImage', this.tmpPANCardPicFile);
             formData.append('agentId', '401');

             this.uploader.panCard = false;
             this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
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

                this.loading = false;
            }, err => {
                this.loading = false;
            });
            this.loading = true;
       }
       

       onNextPage() {
        if (this.form.invalid) {
            return;
        }
        if (this.step == 2) {
            this.formService.findByCellPhone({cellphone: this.f.cellphone.value, username: this.f.username.value}).subscribe( res => {
                if (res) {
                    this.cellPhoneAlreadyExists = true;
                }
                else {
                    this.step = this.step + 1        
                }
            })
        }
        else {
            this.step = this.step + 1
        }
        
       }
       onPrevPage() {
        if (this.form.invalid) {
            return;
        }
        this.step = this.step - 1; 
        this.step = this.step == 0 ? 1 : this.step;
       }
}