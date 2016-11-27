import {BikeHelpMapPage} from './bikehelpmap';
import { NewBikeHelpPage } from './newbikehelp';
import { BikeHelpService } from '../../services/bikehelp.service';
import { IBikeHelp } from '../../shared/interfaces';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
    templateUrl: 'bikehelp.html'
})

export class BikeHelpPage {
    bikeHelps: IBikeHelp[];
    userDBId: number;
    range: number = 1;
    usersLat: number;
    usersLon: number;

    constructor(public navCtrl: NavController, public bikehelpService: BikeHelpService, public modalCtrl: ModalController) {

    }

    ionViewWillEnter() {
        Geolocation.getCurrentPosition().then((position) => {
            this.usersLat = position.coords.latitude;
            this.usersLon = position.coords.longitude;
            // this.bikehelpService.getAllBikeHelps().subscribe((bikeHelps: IBikeHelp[]) => {
            //     this.bikeHelps = bikeHelps;
            // });
            this.bikehelpService.getBikeHelpsByDistance(this.usersLat, this.usersLon, this.range).subscribe((bikeHelps: IBikeHelp[]) => {
                this.bikeHelps = bikeHelps;
            });
        }, (err) => {
            console.log(err);
        });
    }

    addNewBikeHelp() {
        let modal = this.modalCtrl.create(NewBikeHelpPage);
        modal.onDidDismiss(() => {
            this.ionViewWillEnter();
        });
        modal.present();
    }

    onDistanceChange(ev) {
        this.bikehelpService.getBikeHelpsByDistance(this.usersLat, this.usersLon, this.range).subscribe((bikeHelps: IBikeHelp[]) => {
            this.bikeHelps = bikeHelps;
        });
    }

    showBikeHelpInfo(id: number) {
        var bikeHelp = this.bikeHelps.filter((value: IBikeHelp) => {
            return value.id == id
        });
        if (bikeHelp.length > 0) {
            let modal = this.modalCtrl.create(BikeHelpMapPage, bikeHelp[0]);
            modal.present();
        }
    }
}