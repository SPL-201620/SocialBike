import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  fromValue: string;
  toValue: string;

  constructor(public navCtrl: NavController) {
    this.fromValue = "";
    this.toValue = "";
  }

  ngOnInit() {
    this.loadMap();
    // get the two fields
    let input_from = (<HTMLInputElement>(document.getElementById("journey_from").getElementsByTagName('input')[0]));
    let input_to = (<HTMLInputElement>(document.getElementById("journey_to").getElementsByTagName('input')[0]));

    // set the options
    let options = {
      types: [],
      componentRestrictions: {}
    };

    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocomplete1, "place_changed", function () {

      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());
      }
    });

    // add the second listener
    google.maps.event.addListener(autocomplete2, "place_changed", function () {
      let place = autocomplete2.getPlace();
      let geometry = place.geometry;

      if ((geometry) !== undefined) {
        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());
      }
    });
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

    }, (err) => {
      console.log(err);
    });

  }

  clearFrom(){
    this.fromValue = "";
  }

  clearTo() {
    this.toValue = "";
  }
}
