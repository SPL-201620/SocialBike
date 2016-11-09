import { BikeHelpService } from '../../services/bikehelp.service';
import { IBikeHelp } from '../../shared/interfaces';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'bikehelp.html'
})

export class BikeHelpPage {
    bikeHelps: IBikeHelp[];
    userDBId: number;

    constructor(public navCtrl: NavController, public bikehelpService: BikeHelpService) {

    }

    ngOnInit() {
        this.bikehelpService.getAllBikeHelps().subscribe((bikeHelps: IBikeHelp[]) => {
            this.bikeHelps = bikeHelps;
        });
    }
}