import {UserService} from '../../services/user.service';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LogInPage {
    public email;
    public password;

    constructor(public navCtrl: NavController, private userService : UserService, public alertCtrl: AlertController) {

    }

    logInUser() : void {
        this.userService.logUserIn(this.email, this.password).subscribe((status: boolean) => {
            if (status) {
                this.navCtrl.push(TabsPage);
            } else {
                console.log("There is a problem saving the user.");
            }
        }, (error:any)=>{
            if(error.status == 403){
                this.showAlert('Login Error', 'Email password combination error.');
            }else{
                this.showAlert('Login Error', 'Error authenticating user.');                
            }
        });
    }

    registerUser():void{
        this.navCtrl.push(RegisterPage);
    }

    showAlert(title: string, subTitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
}
