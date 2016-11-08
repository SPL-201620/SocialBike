import { ChatService } from '../../services/chats.service';
import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Platform, NavParams, ViewController, Content } from 'ionic-angular';

@Component({
    templateUrl: 'chat.html',
    selector: 'page-chat'
})
export class ChatPage {
    interlocutorObj: IUser;
    message: string;
    uid: string;
    interlocutor: string;
    chats: FirebaseListObservable<any>;
    @ViewChild(Content) content: Content;

    constructor(public userService: UserService, public chatService: ChatService, public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public af: AngularFire) {
        this.interlocutorObj = params.data.user;
        this.uid = params.data.uid;
        this.interlocutor = params.data.interlocutor;

        // Get Chat Reference 
        chatService.getChatRef(this.uid, this.interlocutor)
            .then((chatRef: any) => {
                this.chats = this.af.database.list(chatRef);
            });
    }

    ionViewDidEnter() {
        this.content.scrollToBottom();
    }

    sendMessage() {
        if (this.message) {
            let chat = {
                from: this.uid,
                message: this.message,
                type: 'message'
            };
            this.chats.push(chat);
            this.message = "";
        }
    };

    dismiss() {
        this.viewCtrl.dismiss();
    }
}