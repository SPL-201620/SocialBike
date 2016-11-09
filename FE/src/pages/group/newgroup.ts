import {GroupRoute} from '../../shared/classes';
import {GroupRoutePage} from './grouproute';
import {UtilProvider} from '../../services/utils';
import {RouteService} from '../../services/route.service.';
import {IGroupRoute, IRoute} from '../../shared/interfaces';
import { Component } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-newgroup',
    templateUrl: 'newgroup.html'
})

export class NewGroupRoutePage {
    groupRoutes: IGroupRoute;
    name: string;
    route: IRoute;
    dateStart: Date;
    isRecurrent:boolean;
    recurrentDays: any;
    
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public routeService:RouteService, public utilService: UtilProvider) {
        this.route = params.data;
        this.isRecurrent = false;
        this.recurrentDays = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    saveGroupRoute(){
        this.groupRoutes = new GroupRoute();
        this.groupRoutes.id=-1;
        this.groupRoutes.name = this.name;
        this.groupRoutes.createdById = this.route.userId;
        this.groupRoutes.users = [];
        this.groupRoutes.route = this.route;
        this.groupRoutes.startDate = this.isRecurrent ? new Date() : this.dateStart;
        this.groupRoutes.recurrent = this.isRecurrent;
        this.groupRoutes.monday = this.recurrentDays.monday;
        this.groupRoutes.tuesday = this.recurrentDays.tuesday;
        this.groupRoutes.wednesday = this.recurrentDays.wednesday;
        this.groupRoutes.thursday = this.recurrentDays.thursday;
        this.groupRoutes.friday = this.recurrentDays.friday;
        this.groupRoutes.saturday = this.recurrentDays.saturday;
        this.groupRoutes.sunday = this.recurrentDays.sunday;
        this.routeService.saveRoute(this.route).subscribe((route: IRoute) => {
            this.groupRoutes.route.id = route.id;
            this.routeService.saveRouteGroup(this.groupRoutes).subscribe((groupRoute: IGroupRoute) => {
                this.utilService.doAlert("Success","Group Route Saved","OK");
                this.viewCtrl.dismiss();
            });
        });
    }
}