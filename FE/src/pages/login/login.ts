import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LogInPage {
    public email;
    public password;

    constructor(public navCtrl: NavController) {

    }

    logInUser() : void {
        this.navCtrl.push(TabsPage);
    }

    registerUser():void{
        this.navCtrl.push(RegisterPage);
    }

}
