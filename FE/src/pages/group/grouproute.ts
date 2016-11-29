import { GroupRouteRequest } from '../../shared/classes';
import { IUser } from '../../shared/interfaces';
import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service.';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { socialMediaFeature } from '../../shared/variabilityconst';
import {SocialBikeShareService} from '../../services/socialshare.service';

@Component({
  selector: 'page-group',
  templateUrl: 'grouproute.html'
})

export class GroupRoutePage {
  groupRoutes: GroupRouteRequest[];
  userDBId: number;
  public socialMediaFeat = socialMediaFeature;

  constructor(public navCtrl: NavController, public routeService: RouteService, public userService: UserService, public socialMedia: SocialBikeShareService) {

  }

  ionViewWillEnter() {
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

  getSocial(socialNet:string) {
        console.log("Sharing via:" + socialNet);
        var socialMessage:string;
        if (this.groupRoutes.length > 0)
            socialMessage = " Took a groupal road with many more and enjoyed, shared by SocialBike";
        else
            socialMessage = " Wants to participate in a Social Bike Group, shared by SocialBike";
          
        this.socialMedia.getSocial(socialNet, socialMessage);

    }

} 