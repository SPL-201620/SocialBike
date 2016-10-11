import { ChatPage } from './chat';
import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController, Content } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public users: IUser[];
  public currentUserDBId: number;
  public currentUserId: string;

  constructor(public navCtrl: NavController, public userService: UserService, public modalCtrl: ModalController) {
    userService.getCurrentDBUserId().then((userDBId) => {
      this.currentUserDBId = userDBId;
      userService.getCurrentFirebaseUserId().then((userId) => {
        this.currentUserId = userId;
        userService.getAllUsers().subscribe((users: IUser[]) => {
          this.users = users;
        });
      });
    });
  }

  openChat(userChat: any) {
    let modal = this.modalCtrl.create(ChatPage, userChat);
    modal.present();
  }
}


