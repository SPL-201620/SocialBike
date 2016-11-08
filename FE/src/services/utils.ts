import {Injectable} from '@angular/core'; 
import {Alert, AlertController } from 'ionic-angular'; 
@Injectable() 
export class UtilProvider { 
    doAlert(title, message, buttonText) { 
      console.log(message); 
      let alertCtrlr : AlertController;
      let alert = alertCtrlr.create({ 
          title: title, 
          subTitle: message, 
          buttons: [buttonText] 
      }); 
      return alert;  
    } 
} 