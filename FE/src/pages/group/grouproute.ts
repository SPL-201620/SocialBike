import { GroupRouteRequest } from '../../shared/classes';
import { IGroupRoute, IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service.';
import { NewGroupRoutePage } from './newgroup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-group',
  templateUrl: 'grouproute.html'
})

export class GroupRoutePage {
  groupRoutes: GroupRouteRequest[];
  userDBId: number;

  constructor(public navCtrl: NavController, public routeService: RouteService, public userService: UserService) {

  }

  ngOnInit() {
    this.userService.getCurrentDBUserId().then(userDBId => {
      this.userDBId = userDBId;
      this.routeService.getGroupRoutes().subscribe((groupRoutes: GroupRouteRequest[]) => {
        this.groupRoutes = groupRoutes;
      });
    });
  }

  notInRoute(users: IUser[]) {
    let found = false;
    users.forEach((user) => {
      if (!found) {
        found = user.id === this.userDBId;
      }
    });
    return !found;
  }

  joinGroup(groupRoutId: number) {
    this.routeService.addUserToGroup(groupRoutId, this.userDBId).subscribe((res) => {
      this.routeService.getGroupRoutes().subscribe((groupRoutes: GroupRouteRequest[]) => {
        this.groupRoutes = groupRoutes;
      });
    });
  }
}