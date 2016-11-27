import { BikeHelp } from '../../shared/classes';
import { BikeHelpService } from '../../services/bikehelp.service';
import { UtilProvider } from '../../services/utils';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
    selector: 'page-newbikehelp',
    templateUrl: 'newbikehelp.html'
})

export class NewBikeHelpPage {
    @ViewChild('map') mapElement: ElementRef;
    public map: any;
    public name: string;
    public type: string;
    public marker: any;
    public priceRange:any =  { lower: 30, upper: 60 };

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public utilService: UtilProvider, public bikehelpService: BikeHelpService) {
        
    }

    ionViewWillEnter() {
        this.loadMap();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    save() {
        if (this.valid()) {
            let bikeHelp = new BikeHelp();
            bikeHelp.name = this.name;
            bikeHelp.type = this.type;
            bikeHelp.lowerPrice = this.priceRange.lower;
            bikeHelp.upperPrice = this.priceRange.upper;
            bikeHelp.pointLat = this.marker.getPosition().lat();
            bikeHelp.pointLon = this.marker.getPosition().lng();
            this.bikehelpService.saveBikeHelp(bikeHelp).subscribe(() => {
                this.utilService.doAlert("Success", "Bike Help Saved", "OK");
                this.viewCtrl.dismiss();
            });
        }
    }

    valid() {
        let valid = true;
        if (!this.name) {
            this.utilService.doAlert("Error", "Add a name!", ['OK']);
            valid = false;
        }
        if (!this.type) {
            this.utilService.doAlert("Error", "Select a Type!", ['OK']);
            valid = false;
        }
        if (!this.marker) {
            this.utilService.doAlert("Error", "Add location!", ['OK']);
            valid = false;
        }
        return valid;
    }

    loadMap() {
        Geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            google.maps.event.addListener(this.map, 'click', (event) => {
                this.placeMarker(event.latLng);
            });

        }, (err) => {
            console.log(err);
        });
    }

    placeMarker(location) {
        if (this.marker)
            this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            position: location,
            map: this.map
        });

    }
}
