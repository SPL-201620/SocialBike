import { Route } from '../../shared/classes';
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
    public isActive: boolean = false;
    public activeRoute: IRoute;
    public routes: IRoute[];

    constructor(public navCtrl: NavController, public routeService: RouteService, public storage: Storage) {

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
}
