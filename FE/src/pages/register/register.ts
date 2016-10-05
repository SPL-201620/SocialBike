import { User } from '../../shared/classes';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

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
    private user: User;

    constructor(public navCtrl: NavController, private userService: UserService, public alertCtrl: AlertController) {

    }

    registerUser(): void {
        this.user = new User(-1, "testing", this.email, this.password, this.displayName, "testing", this.age, this.sex);

        this.userService.saveUser(this.user).subscribe((status: boolean) => {
            if (status) {
                this.showAlert("Registration Success!", "Please login to the application with your email and password.");
                this.navCtrl.pop();
            } else {
                console.log("There is a problem saving the user.");
            }
        });
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
