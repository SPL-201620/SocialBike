import { AchievementService } from '../../services/achievement.service';
import { IUser, IUserAchievement } from '../../shared/interfaces';
import { UtilProvider } from '../../services/utils';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
    templateUrl: 'achievement.html'
})

export class AchievementPage {

    public achievements: IUserAchievement[];
    public user: IUser;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public utilService: UtilProvider, public achievementService: AchievementService) {
        this.user = params.data;
    }

    ionViewWillEnter() {
        this.achievementService.getUserAchievements(this.user.id).subscribe((achievements: IUserAchievement[]) => {
            this.achievements = achievements;
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


}
