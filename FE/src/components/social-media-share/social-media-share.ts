import { Component, Directive } from '@angular/core';
import { SocialSharing } from 'ionic-native';

import { socialMediaFeature } from '../../shared/variabilityconst';

/*
  Generated class for the SocialMediaShare component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'social-media-share',
  templateUrl: 'social-media-share.html'
})
export class SocialMediaShareComponent {

  text: string;
  //vars used only for example, put anything you want :)
 
 

  constructor() {
    console.log('SocialMediaShare Component');
    this.text = 'Get Social Sharing Your Experience';
  }

  shareSocialMedia(): void {
    console.log('Compartiendo en redes sociales ...');
  }
  
  getVariant(): string{
    if (socialMediaFeature ) {
      return 'visible' ;
    }
    else {
      return 'hidden';
    }
  }

}