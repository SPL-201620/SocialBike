import { NewBikeHelpPage } from './newbikehelp';
import { BikeHelpService } from '../../services/bikehelp.service';
import { IBikeHelp } from '../../shared/interfaces';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
    templateUrl: 'bikehelp.html'
})

export class BikeHelpPage {
    bikeHelps: IBikeHelp[];
    userDBId: number;

    constructor(public navCtrl: NavController, public bikehelpService: BikeHelpService, public modalCtrl: ModalController) {

    }

    ngOnInit() {
        this.bikehelpService.getAllBikeHelps().subscribe((bikeHelps: IBikeHelp[]) => {
            this.bikeHelps = bikeHelps;
        });
    }

    addNewBikeHelp() {
        let modal = this.modalCtrl.create(NewBikeHelpPage);
        modal.onDidDismiss(() => {
            this.ngOnInit();
        });
        modal.present();
    }
}