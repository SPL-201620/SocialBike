import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { Bike } from '../../shared/classes';
import { BikeConfiguratorService } from '../../services/bikeconfigurator.service';
import { socialMediaFeature } from '../../shared/variabilityconst';
import {SocialBikeShareService} from '../../services/socialshare.service';


@Component({
  selector: 'page-bikeconfigurator',
  templateUrl: 'bikeconfigurator.html'
})
export class BikeconfiguratorPage {
  public bikeType;
  public frameType;
	public wheeleSize;
	public gearControl;
  public foundBike;
  public colorgc = '';
  public colorbt = '';
  public colorft = '';
  public colorws = '';
  public socialMediaFeat = socialMediaFeature;
    

  constructor(public navCtrl: NavController, private bikeConfService: BikeConfiguratorService, public alertCtrl: AlertController, public socialMedia: SocialBikeShareService) {}

  ionViewDidLoad() {
    console.log('Hello BikeconfiguratorPage Page');
  }
  
  sendConfiguration() {
        this.colorgc = '';
        this.colorbt = '';
        this.colorft = '';
        this.colorws = '';

        let bikeConf = new Bike();
        bikeConf.bikeType = (this.bikeType == null?"Mountain":this.bikeType);
        bikeConf.frameType = (this.frameType == null?"":this.frameType);
        bikeConf.wheeleSize = this.wheeleSize;
        bikeConf.gearControl = this.gearControl;
        bikeConf.matchRate = 0;
        
        this.bikeConfService.validateBikeConf(bikeConf).subscribe((foundBike:Bike) => {
            console.log("RESPUESTA:" + JSON.stringify(foundBike));
            if (foundBike.matchRate > 0) {
              this.handleSelection(foundBike);
            }
            else {
              this.showAlert('Bike Configurator', "Sorry: We don't have a bike with your specifications at this moment. Pleaase select a new configuration");
            }
        });
  }
  
  handleSelection(foundBike:Bike) {
    if (foundBike.matchRate === 1) {
      this.showAlert('Bike Configurator', "SUCCESS: We're glad to inform you that we have the perfect match for your bike!");    
    }
    else {
      this.showAlert('Bike Configurator', "Our bikes don't match perfectly however we found a bike that we are sure will meet your expectations!. Please review the differences in light gray");
      if (this.bikeType != foundBike.bikeType) {
        this.bikeType = foundBike.bikeType;
        this.colorbt = 'light';
      }
      if (this.frameType != foundBike.frameType) {
        this.frameType = foundBike.frameType;
        this.colorft = 'light';
      }
      if (this.wheeleSize != foundBike.wheeleSize) {
        this.wheeleSize = foundBike.wheeleSize;
        this.colorws = 'light';
      }
      if (this.gearControl != foundBike.gearControl) {
        this.gearControl = foundBike.gearControl;
        this.colorgc = 'light';
      }
    }
  }


  showAlert(title: string, subTitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
  }

  getSocial(socialNet:string) {
        var socialMessage;
        console.log("Sharing via:" + socialNet);
        socialMessage = " Configured a brand new nice Bycicle using Social Bike Configurator, shared by SocialBike"
        this.socialMedia.getSocial(socialNet, socialMessage);

    }

}
