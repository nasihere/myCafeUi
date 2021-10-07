import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    searchForm: FormGroup;
    loading = false;
    users: User[];
    collections: any = [];
    recently: any = [];
    submitted = false;
    error = '';

    constructor(private formBuilder: FormBuilder, 
        
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        
        private userService: UserService) {
            if (this.authenticationService.currentUserValue) { 
                this.router.navigate(['/']);
            }
         }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            findByText: ['', Validators.required]
        });
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.collections = [
            {name: "id_apple", src:"../../assets/img/icons8-fruit-60.png", label: "Apple", details: ""},
            {name: "id_cherry", src:"../../assets/img/icons8-cherry-50.png", label: "Cherry", details: ""},
            {name: "id_cherry", src:"../../assets/img/icons8-coconut-50.png", label: "Coconut", details: ""},
            {name: "id_cherry", src:"../../assets/img/icons8-grapes-50.png", label: "Grapes", details: ""},
            {name: "id_cherry", src:"../../assets/img/icons8-pineapple-50.png", label: "PineApple", details: ""},
            {name: "id_rasberry", src:"../../assets/img/icons8-raspberry-50.png", label: "Rasberry", details: ""}
        ]
        this.recently = [
            {name: "id_apple", src:"../../assets/img/icons8-banana-50.png", label: "Banana", details: ""},
            {name: "id_apple", src:"../../assets/img/icons8-papaya-50.png", label: "Papaya", details: ""},
            {name: "id_apple", src:"../../assets/img/icons8-soy-50.png", label: "Soy", details: ""},
            {name: "id_apple", src:"../../assets/img/icons8-milkshake-50.png", label: "Milkshake", details: ""},
            {name: "id_apple", src:"../../assets/img/icons8-strawberry-50.png", label: "Strawberry", details: ""},
            {name: "id_apple", src:"../../assets/img/icons8-olive-oil-50.png", label: "Olive Oil", details: ""},
           
        ];
    }
    get f() { return this.searchForm.controls; }

    onSubmit() {

        // stop here if form is invalid
        if (this.searchForm.invalid) {
            return;
        }

    }
}