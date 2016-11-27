import {IBikeHelp} from '../../shared/interfaces';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
    selector: 'page-bikehelpmap',
    templateUrl: 'bikehelpmap.html'
})

export class BikeHelpMapPage {
    @ViewChild('map') mapElement: ElementRef;
    public map: any;
    public bikeHelp: IBikeHelp;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams) {
        this.bikeHelp = params.data;
    }

    ionViewWillEnter() {
        this.loadMap();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    loadMap() {
        Geolocation.getCurrentPosition().then((position) => {
            let currentLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: currentLoc,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(this.placeMarker(currentLoc, "You").getPosition());
            let bikeHelpLoc = new google.maps.LatLng(this.bikeHelp.pointLat, this.bikeHelp.pointLon);
            bounds.extend(this.placeMarker(bikeHelpLoc, this.bikeHelp.name).getPosition());
            this.map.fitBounds(bounds);
        }, (err) => {
            console.log(err);
        });
    }

    placeMarker(location, text) : any {
        let marker = new google.maps.Marker({
            position: location,
            label: text,
            map: this.map
        });
        return marker;
    }
}
