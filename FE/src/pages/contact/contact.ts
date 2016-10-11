import { ChatPage } from './chat';
import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public users: IUser[];
  public currentUserDBId: number;
  public currentUserId: string;
  public userFriends: any[];

  constructor(public navCtrl: NavController, public userService: UserService, public modalCtrl: ModalController) {
    userService.getCurrentDBUserId().then((userDBId) => {
      this.currentUserDBId = userDBId;
      userService.getCurrentFirebaseUserId().then((userId) => {
        this.currentUserId = userId;
        userService.getUserFriends().then(res => {
          res.subscribe(friends => {
            this.userFriends = friends;
            userService.getAllUsers().subscribe((users: IUser[]) => {
              this.users = users;
            });
          });
        });
      });
    });
  }

  openChat(userChat: any) {
    let modal = this.modalCtrl.create(ChatPage, userChat);
    modal.present();
  }

  addFriend(friendId: string) {
    this.userService.addUserFriend(this.currentUserId, friendId);
    this.userService.getUserFriends().then(res => {
      res.subscribe(friends => {
        this.userFriends = friends;
        this.userService.getAllUsers().subscribe((users: IUser[]) => {
          this.users = users;
        });
      });
    });
  }

  isMyFriend(friendId: string): boolean {
    let index = this.userFriends.findIndex(function (friend) {
      return friendId == friend.$key;
    });
    return index !== -1;
  }
}


