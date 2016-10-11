import { DateTime } from 'c:/dev/SocialBike/FE/node_modules/ionic-angular/es2015/components/datetime/datetime';
import { RouteService } from '../../services/route.service.';
import { IRoute } from '../../shared/interfaces';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-routes',
    templateUrl: 'routes.html'
})

export class RoutesPage {
    public routes: IRoute[];
    private geocoder: any;

    constructor(public navCtrl: NavController, public routeService: RouteService, public storage: Storage) {
        storage.get("userDBId").then((value) => {
            routeService.getRoutesByUserId(value).subscribe((routes: IRoute[]) => {
                this.routes = routes;
            });
        });
    }

    endRoute(route: IRoute) {
        route.finished = true;
        route.endTime = new Date(Date.now());
        this.routeService.updateRoute(route).subscribe((routes: IRoute[]) => {
            this.routes = routes;
        });
    }
}
