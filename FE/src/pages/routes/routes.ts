import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-routes',
    templateUrl: 'routes.html'
})

export class RoutesPage {
    public routes : any;

    constructor(public navCtrl: NavController) {

    }
}
