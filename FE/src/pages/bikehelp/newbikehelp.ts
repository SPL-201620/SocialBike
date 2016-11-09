import { BikeHelp } from '../../shared/classes';
import { BikeHelpService } from '../../services/bikehelp.service';
import { UtilProvider } from '../../services/utils';
import { Component } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-newbikehelp',
    templateUrl: 'newbikehelp.html'
})

export class NewBikeHelpPage {
    public name: string;
    public type: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public utilService: UtilProvider, public bikehelpService: BikeHelpService) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    save() {
        let bikeHelp = new BikeHelp();
        bikeHelp.name = this.name;
        bikeHelp.type = this.type;
        bikeHelp.price = 0;
        bikeHelp.pointLat = 0;
        bikeHelp.pointLon = 0;
        this.bikehelpService.saveBikeHelp(bikeHelp).subscribe(() => {
            this.utilService.doAlert("Success", "Bike Help Saved", "OK");
            this.viewCtrl.dismiss();
        });
    }
}
