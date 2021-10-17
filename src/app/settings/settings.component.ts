import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services';

@Component({ templateUrl: 'setings.component.html' })
export class SettingsComponent implements OnInit  {
    displayedColumns = ['product', 'desc', 'perCost', 'action'];
    adminPassword: boolean = false;
    step: number = 1;
    form: FormGroup;
    submitted: boolean;
    loginForm: any;
    loading: boolean;
    authenticationService: any;
    error: any;
    dataSource = null;
    userData = null;
    countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    
    constructor(        private router: Router, public formService: FormService,

    ) { 
       
    }
    ngOnInit() {
        if (this.formService.response.resAuthSignIn == null) {
            const returnUrl = `/login`;
            this.router.navigate([returnUrl]);
            return;
        }
        this.userData = this.formService.response.resAuthSignIn.data.Item;
        this.dataSource = [
            {perCost: "perCost1", desc: "desc1", product: "product1",action: ""},
            {perCost: "perCost2", desc: "desc2", product: "product2",action: ""},
            {perCost:  "perCost3", desc: "desc3", product: "product3",action: ""},
            {perCost: "perCost4", desc: "desc4", product: "product4",action: ""},
            {perCost:  "perCost5", desc: "desc5", product: "product5",action: ""},
            {perCost:  "perCost6", desc: "desc6", product: "product6",action: ""},
            {perCost:  "perCost7", desc: "desc7", product: "product7",action: ""},
            {perCost:  "perCost8", desc: "desc8", product: "product8",action: ""},
            {perCost:  "perCost9", desc: "desc9", product: "product9",action: ""}
        ];
        let MOBILE_PATTERN = /[0-9\+\-\ ]/;
        this.form = new FormGroup({
            username: new FormControl(this.userData.username, []) ,
            cafeName: new FormControl(this.userData.cafeName, []) ,
            cafeAddress: new FormControl(this.userData.cafeAddress, []) ,
            cellphone: new FormControl(this.userData.cellPhone, [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern(MOBILE_PATTERN)]),
            
            product1: new FormControl(this.userData.product1 || 'Internet', []) ,
            product2: new FormControl(this.userData.product2 || 'Printer', []) ,
            product3: new FormControl(this.userData.product3 || 'Scanner', []) ,
            product4: new FormControl(this.userData.product4 || 'Game', []) ,
            product5: new FormControl(this.userData.product5, []) ,
            product6: new FormControl(this.userData.product6, []) ,
            product7: new FormControl(this.userData.product7, []) ,
            product8: new FormControl(this.userData.product8, []) ,
            product9: new FormControl(this.userData.product9, []) ,

            desc1: new FormControl(this.userData.desc1 || 'Rs 20/- Per Hour', []) ,
            desc2: new FormControl(this.userData.desc2 || 'Rs 1/- Per Page', []) ,
            desc3: new FormControl(this.userData.desc3 || 'Rs 5/- Per Page', []) ,
            desc4: new FormControl(this.userData.desc4 || 'Rs 15/- Per Hour', []) ,
            desc5: new FormControl(this.userData.desc5, []) ,
            desc6: new FormControl(this.userData.desc6, []) ,
            desc7: new FormControl(this.userData.desc7, []) ,
            desc8: new FormControl(this.userData.desc8, []) ,
            desc9: new FormControl(this.userData.desc9, []) ,

            
            perCost1: new FormControl(this.userData.perCost1 || '20', []) ,
            perCost2: new FormControl(this.userData.perCost2 || '1', []) ,
            perCost3: new FormControl(this.userData.perCost3 || '5', []) ,
            perCost4: new FormControl(this.userData.perCost4 || '15', []) ,
            perCost5: new FormControl(this.userData.perCost5, []) ,
            perCost6: new FormControl(this.userData.perCost6, []) ,
            perCost7: new FormControl(this.userData.perCost7, []) ,
            perCost8: new FormControl(this.userData.perCost8, []) ,
            perCost9: new FormControl(this.userData.perCost9, []) 
        });

    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.form.controls[controlName].hasError(errorName);
      }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    onSave() {
        // routerLink="/admindashboard"
        
    

        this.loading = true;
        const product1:string = this.form.get('product1').value
        this.form.get('product1').setValue(product1 && product1.replace(/\ /g,'') || null)
        
        const product2:string = this.form.get('product2').value
        this.form.get('product2').setValue(product2 && product2.replace(/\ /g,'') || null)
        
        const product3:string = this.form.get('product3').value
        this.form.get('product3').setValue(product3 && product3.replace(/\ /g,'') || null)
        
        const product4:string = this.form.get('product4').value
        this.form.get('product4').setValue(product4 && product4.replace(/\ /g,'') || null)
        
        const product5:string = this.form.get('product5').value
        this.form.get('product5').setValue(product5 && product5.replace(/\ /g,'') || null)
        
        const product6:string = this.form.get('product6').value
        this.form.get('product6').setValue(product6 && product6.replace(/\ /g,'') || null)
        
        const product7:string = this.form.get('product7').value
        this.form.get('product7').setValue(product7 && product7.replace(/\ /g,'') || null)
        
        
        const product8:string = this.form.get('product8').value
        this.form.get('product8').setValue(product8 && product8.replace(/\ /g,'') || null)
        
        const product9:string = this.form.get('product9').value
        this.form.get('product9').setValue(product9 && product9.replace(/\ /g,'') || null)
        
        const perCost1:string = this.form.get('perCost1').value
        this.form.get('perCost1').setValue(perCost1 && perCost1.replace(/[A-Za-z]/g,'') || null)

        const perCost2:string = this.form.get('perCost2').value
        this.form.get('perCost2').setValue(perCost2 && perCost2.replace(/[A-Za-z]/g,'') || null)

        const perCost3:string = this.form.get('perCost3').value
        this.form.get('perCost3').setValue(perCost3 && perCost3.replace(/[A-Za-z]/g,'') || null)

        const perCost4:string = this.form.get('perCost4').value
        this.form.get('perCost4').setValue(perCost4 && perCost4.replace(/[A-Za-z]/g,'') || null)

        const perCost5:string = this.form.get('perCost5').value
        this.form.get('perCost5').setValue(perCost5 && perCost5.replace(/[A-Za-z]/g,'') || null)

        const perCost6:string = this.form.get('perCost6').value
        this.form.get('perCost6').setValue(perCost6 && perCost6.replace(/[A-Za-z]/g,'') || null)

        const perCost7:string = this.form.get('perCost7').value
        this.form.get('perCost7').setValue(perCost7 && perCost7.replace(/[A-Za-z]/g,'') || null)

        const perCost8:string = this.form.get('perCost8').value
        this.form.get('perCost8').setValue(perCost8 && perCost8.replace(/[A-Za-z]/g,'') || null)

        
        const perCost9:string = this.form.get('perCost9').value
        this.form.get('perCost9').setValue(perCost9 && perCost9.replace(/[A-Za-z]/g,'') || null)


        
        const perDesc1:string = this.form.get('desc1').value
        this.form.get('desc1').setValue(perDesc1 && perDesc1 || null)

        const perDesc2:string = this.form.get('desc2').value
        this.form.get('desc2').setValue(perDesc2 && perDesc2 || null)

        const perDesc3:string = this.form.get('desc3').value
        this.form.get('desc3').setValue(perDesc3 && perDesc3 || null)

        const perDesc4:string = this.form.get('desc4').value
        this.form.get('desc4').setValue(perDesc4 && perDesc4 || null)

        const perDesc5:string = this.form.get('desc5').value
        this.form.get('desc5').setValue(perDesc5 && perDesc5 || null)

        const perDesc6:string = this.form.get('desc6').value
        this.form.get('desc6').setValue(perDesc6 && perDesc6 || null)

        const perDesc7:string = this.form.get('desc7').value
        this.form.get('desc7').setValue(perDesc7 && perDesc7 || null)

        const perDesc8:string = this.form.get('desc8').value
        this.form.get('desc8').setValue(perDesc8 && perDesc8 || null)

        
        const perDesc9:string = this.form.get('desc9').value
        this.form.get('desc9').setValue(perDesc9 && perDesc9 || null)

        const payload = { ...this.form.value }
        this.formService.updateUser(payload).subscribe( res => {
            console.log('res', res)
            const returnUrl = `/admindashboard`;
            this.router.navigate([returnUrl]);
            
        }, err => {
            
        });
        
    }
}
