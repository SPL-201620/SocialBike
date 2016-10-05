import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [UserService]
})

export class RegisterPage {
    public email;
    public password;
    public displayName;
    public age;
    public sex;
    private user: IUser;

    constructor(public navCtrl: NavController, private userService: UserService) {

    }

    registerUser(): void {
        this.user.email = this.email;
        this.user.password = this.password;
        this.user.displayName = this.displayName;
        this.user.age = this.age;
        this.user.sex = this.sex;
        this.user.firebaseId = "";
        this.user.pictureUrl = "";
        this.userService.saveUser(this.user);
    }


}
