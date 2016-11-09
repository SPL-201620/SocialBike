import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Injectable()
export class UtilProvider {

    constructor(public alertCtrlr: AlertController) {

    }

    doAlert(title, message, buttonText) {
        console.log(message);
        let alert = this.alertCtrlr.create({
            title: title,
            subTitle: message,
            buttons: [buttonText]
        });
        return alert;
    }
} 