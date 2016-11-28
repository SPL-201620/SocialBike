import { Injectable } from '@angular/core';
import { SocialSharing } from 'ionic-native';
import { socialMediaWeb } from '../shared/socialsharemsg';
import {InAppBrowser} from 'ionic-native';
import {Platform} from 'ionic-angular';

@Injectable()
export class SocialBikeShareService {

    
    constructor(public platform: Platform) {

    }
   
   getSocial(socialMedia:string, socialMessage:string): void {
        switch (socialMedia) {
            case 'Google':
            case 'Facebook':
                if (socialMediaWeb)
                    this.facebookShareOther(socialMessage);
                else
                    this.facebookShare(socialMessage);
                break;
            case 'Twitter':
                if (socialMediaWeb)
                    this.tweeterShareOther(socialMessage);
                else
                    this.tweeterShare(socialMessage);
                break;

        }
  }
  
  tweeterShare(socialMessage){
    console.log("Compartiendo Tweeter");
    SocialSharing.shareViaTwitter(socialMessage, null, null)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
    
  }

  tweeterShareOther(socialMessage){
    let url = "https://twitter.com/intent/tweet?text=" + socialMessage;
        this.platform.ready().then(() => {
            open(url, "_blank", "location=no");
        });
  }

  facebookShare(socialMessage)
  {
    console.log("Compartiendo Facebook");
    SocialSharing.shareViaFacebook(socialMessage, null, null)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }


    facebookShareOther(socialMessage){
        let url = "http://www.facebook.com/sharer.php?s=100&p[SocialBike]=BikeRide&p[summary]=Prueba&p[url]=www.SocialBike.com&p[images][0]=YOUR_IMAGE_TO_SHARE_OBJECT" + socialMessage;
        this.platform.ready().then(() => {
            open(url, "_blank", "location=no");
        });
    
       
    }
}
