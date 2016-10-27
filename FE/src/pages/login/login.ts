import {IUser} from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import { SocialMediaLogin } from '../../components/social-media-login/social-media-login';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LogInPage {
    public email;
    public password;
   constructor(public navCtrl: NavController, private userService : UserService, public alertCtrl: AlertController, public storage: Storage) {

    }

    logInUser() : void {
        this.userService.loginFirebaseAuth(this.email, this.password).then((res: any) => {
            if(res.uid){
                this.storage.set("userId", res.uid);
                this.userService.getUserByFirebaseId(res.uid).subscribe((user:IUser) => {
                    this.storage.set("userDBId", user.id);
                    this.navCtrl.push(TabsPage);
                });
            }
        }, (error: any) => {
            this.showAlert('Login Error', 'Email password combination error.');
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
