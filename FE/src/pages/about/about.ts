import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public email: string;
  public displayName: string;
  public age: number;
  public sex: string;
  private user: IUser;

  constructor(public navCtrl: NavController, public storage: Storage, public userService: UserService, public alertCtrl: AlertController) {
    storage.get("userId").then((value) => {
      this.userService.getUserByFirebaseId(value).subscribe((user: IUser) => {
        this.user = user;
        this.email = user.email;
        this.displayName = user.displayName;
        this.age = user.age;
        this.sex = user.sex;
      });
    });
  }
  
  saveUserChanges(){
    this.user.displayName = this.displayName;
    this.user.age = this.age;
    this.user.sex = this.sex;
    this.userService.updateUser(this.user).subscribe((res: any)=>{
      this.showAlert("Success", "Changes have been saved.");
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
