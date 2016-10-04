import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})

export class RegisterPage {
    public email;
    public password;
    public displayName;
    public age;
    public sex;

    constructor(public navCtrl: NavController) {

    }

    registerUser():void{
        
    }

}
