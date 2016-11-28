import { Route } from '../../shared/classes';
import { RouteService } from '../../services/route.service.';
import { IRoute } from '../../shared/interfaces';
import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { socialMediaFeature } from '../../shared/variabilityconst';

import {SocialBikeShareService} from '../../services/socialshare.service';


@Component({
    selector: 'page-routes',
    templateUrl: 'routes.html'
})

export class RoutesPage {
    public isActive: boolean = false;
    public activeRoute: IRoute;
    public routes: IRoute[];
    public socialMediaFeat = socialMediaFeature;
    
    

    constructor(public navCtrl: NavController, public routeService: RouteService, public storage: Storage, public socialMedia: SocialBikeShareService) {
        
    }

    ionViewWillEnter() {
        this.storage.get("userDBId").then((value) => {
            this.routeService.getUserActiveRoute(value).subscribe((route: IRoute) => {
                this.isActive = !(Object.keys(route).length === 0 && route.constructor === Object);
                this.activeRoute = this.isActive ? route : new Route();
                this.routeService.getRoutesByUserId(value).subscribe((routes: IRoute[]) => {
                    this.routes = routes;
                });
            });
        });
    }

    endRoute(route: IRoute) {
        route.finished = true;
        route.endTime = new Date(Date.now());
        this.routeService.updateRoute(route).subscribe((res: any) => {
            this.ionViewWillEnter();
        });
    }

    getSocial(socialNet:string) {
        var socialMessage;
        console.log("Sharing via:" + socialNet);
        if (this.routes.length > 0) 
            socialMessage = " Took an individual Bike Ride of: " + this.routes[this.routes.length - 1].distance + " meters shared by SocialBike"
        else
            socialMessage = " Wants to enjoy a new bike experience, shared by SocialBike";
        this.socialMedia.getSocial(socialNet, socialMessage);

    }
}
