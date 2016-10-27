import { RoutesPage } from '../routes/routes';
import { Route } from '../../shared/classes';
import { LogInPage } from '../login/login';
import { RouteService } from '../../services/route.service.';
import { UserService } from '../../services/user.service';

import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Storage } from '@ionic/storage'

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
  fromAddress: string;
  toAddress: string;
  directionsService: any;
  directionsDisplay: any;
  markers: any[];
  hideRouteInfo: boolean;
  routeInfo: any;

  constructor(public navCtrl: NavController, public routeService: RouteService, public storage: Storage, public alertCtrl: AlertController, private userService : UserService) {
    this.routeInfo = {
      timeText: "",
      timeValue: 0,
      distanceText: "",
      distanceValue: 0,
      caloriesText: "",
      caloriesValue: 0,
      fromAddress: "",
      toAddress: ""
    }
    this.fromValue = "";
    this.toValue = "";
    this.markers = new Array();
    this.hideRouteInfo = true;
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

    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    google.maps.event.addListener(autocomplete1, "place_changed", (): void => {
      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {
        this.fromPlace = { lat: geometry.location.lat(), lng: geometry.location.lng() };
        this.addMarkerToMap(place);
      }
    });

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
    // marker.setIcon(/** @type {google.maps.Icon} */({
    //   url: place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(35, 35)
    // }));
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
    this.markers.push(marker);
  }

  getDirections() {
    if (this.fromPlace && this.toPlace) {
      this.markers.forEach((value: any, index: number, array: any[]) => {
        value.setMap(null);
      });
      this.markers = new Array();
      this.directionsService.route({
        origin: this.fromPlace,
        destination: this.toPlace,
        travelMode: 'DRIVING'
      }, (response, status): void => {
        if (status === 'OK') {
          this.hideRouteInfo = false;
          console.log(response);
          this.setCurrentRoutInfo(response.routes[0].legs[0]);
          this.directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    }
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'My Location'
      });
      this.fromPlace = latLng;
      this.fromValue = "Current Location";
      this.map.setCenter(latLng);
    });
  }

  setCurrentRoutInfo(routeInfo: any) {
    this.routeInfo.timeText = routeInfo.duration.text;
    this.routeInfo.timeValue = routeInfo.duration.value;
    this.routeInfo.distanceText = routeInfo.distance.text;
    this.routeInfo.distanceValue = routeInfo.distance.value;
    let calories = this.getCurrentRouteCalories(this.routeInfo.timeValue, this.routeInfo.distanceValue);
    this.routeInfo.caloriesText = calories.text;
    this.routeInfo.caloriesValue = calories.value;
    this.routeInfo.fromAddress = routeInfo.start_address;
    this.routeInfo.toAddress = routeInfo.end_address;
  }

  getCurrentRouteCalories(time: number, distance: number): any {
    time = (time / 60) / 60;
    distance = distance / 1000;
    let vel = (distance * 0.63) / time;
    let kalHour = 0;
    if (vel < 12) {
      kalHour = 463;
    } else if (vel >= 12 && vel < 14) {
      kalHour = 563;
    } else if (vel >= 14 && vel < 16) {
      kalHour = 704;
    } else if (vel >= 16 && vel < 19) {
      kalHour = 844;
    } else {
      kalHour = 1126;
    }
    let totalKal = kalHour * time;
    let calories = {
      text: Math.floor(totalKal) + " Cal",
      value: totalKal
    };
    return calories;
  }

  startRoute() {
    this.storage.get("userDBId").then((value) => {
      let route = new Route();
      route.calories = this.routeInfo.caloriesValue;
      route.distance = this.routeInfo.distanceValue;
      route.speed = (this.routeInfo.distance / 1000) / ((this.routeInfo.timeValue / 60) / 60);
      route.startTime = new Date(Date.now());
      route.endTime = new Date(Date.now());
      route.endTime.setSeconds(route.startTime.getSeconds() + this.routeInfo.timeValue);
      route.userId = value;
      route.startPointLat = this.fromPlace.lat;
      route.startPointLon = this.fromPlace.lng;
      route.startPointName = this.routeInfo.fromAddress;
      route.endPointLat = this.toPlace.lat;
      route.endPointLon = this.toPlace.lng;
      route.endPointName = this.routeInfo.toAddress;
      route.finished = false;
      this.routeService.saveRoute(route).subscribe((res) => {
        this.showAlert("Success", "Started new route, check and end routes in your routes page.")
        this.navCtrl.push(RoutesPage);
      });
    })
  }

  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
