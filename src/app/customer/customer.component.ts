import { Component } from '@angular/core';

@Component({ templateUrl: 'customer.component.html' })
export class CustomerComponent {
    step:number = 1;
    picUploader(id: string) {
        document.getElementById(id).click();

    }
}