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
  fromPlace: any;
  toPlace: any;
  directionsService: any;
  directionsDisplay: any;

  constructor(public navCtrl: NavController) {
    this.fromValue = "";
    this.toValue = "";
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
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
    google.maps.event.addListener(autocomplete1, "place_changed", (): void => {
      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {
        this.fromPlace = { lat: geometry.location.lat(), lng: geometry.location.lng() };
        this.addMarkerToMap(place);
      }
    });

    // add the second listener
    google.maps.event.addListener(autocomplete2, "place_changed", (): void => {
      let place = autocomplete2.getPlace();
      let geometry = place.geometry;

      if ((geometry) !== undefined) {
        this.toPlace = { lat: geometry.location.lat(), lng: geometry.location.lng() };
        this.addMarkerToMap(place);
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

      this.directionsDisplay.setMap(this.map);

    }, (err) => {
      console.log(err);
    });

  }

  clearFrom() {
    this.fromValue = "";
  }

  clearTo() {
    this.toValue = "";
  }

  addMarkerToMap(place): void {
    if (place.geometry.viewport) {
      this.map.fitBounds(place.geometry.viewport);
    } else {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(17);  // Why 17? Because it looks good.
    }
    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    let address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(this.map, marker);
  }

  getDirections() {
    if (this.fromPlace && this.toPlace) {
      this.directionsService.route({
        origin: this.fromPlace,
        destination: this.toPlace,
        travelMode: 'DRIVING'
      }, (response, status): void => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    }
  }
}
