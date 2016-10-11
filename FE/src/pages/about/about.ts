import { ChatPage } from '../contact/chat';
import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController, AlertController, ModalController } from 'ionic-angular';
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
  public friends: IUser[];
  public currentUserId: string;

  constructor(public navCtrl: NavController, public storage: Storage, public userService: UserService, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.friends = new Array();
    userService.getCurrentFirebaseUserId().then((userId) => {
      this.userService.getUserByFirebaseId(userId).subscribe((user: IUser) => {
        this.user = user;
        this.email = user.email;
        this.displayName = user.displayName;
        this.age = user.age;
        this.sex = user.sex;
        this.currentUserId = user.firebaseId;
        this.userService.getUserFriends().then(res => {
          res.subscribe(userFriends => {
            userFriends.forEach((userFriend) => {
              this.userService.getUserByFirebaseId(userFriend.$key).subscribe((user: IUser) => {
                this.friends.push(user);
              })
            });
          });
        });
      });
    });
  }

  saveUserChanges() {
    this.user.displayName = this.displayName;
    this.user.age = this.age;
    this.user.sex = this.sex;
    this.userService.updateUser(this.user).subscribe((res: any) => {
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

  openChat(userChat: any) {
    let modal = this.modalCtrl.create(ChatPage, userChat);
    modal.present();
  }
}
