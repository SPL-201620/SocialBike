import {NewBikeHelpPage} from '../pages/bikehelp/newbikehelp';
import {BikeHelpService} from '../services/bikehelp.service';
import {BikeHelpPage} from '../pages/bikehelp/bikehelp';
import { UtilProvider } from '../services/utils';
import { NewGroupRoutePage } from '../pages/group/newgroup';
import { GroupRoutePage } from '../pages/group/grouproute';
import { ChatPage } from '../pages/contact/chat';
import { ChatService } from '../services/chats.service';
import { RoutesPage } from '../pages/routes/routes';
import { ContactPage } from '../pages/contact/contact';
import { RouteService } from '../services/route.service.';
import { UserService } from '../services/user.service';
import { RegisterPage } from '../pages/register/register';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LogInPage } from '../pages/login/login';
import { SocialMediaLogin } from '../components/social-media-login/social-media-login';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Storage } from '@ionic/storage';

import {SocialMediaShareComponent} from '../components/social-media-share/social-media-share';


export const firebaseConfig = {
  apiKey: "AIzaSyCf9dVvBne3UGKsyK4U4Z62fnKezfeCfkU",
  authDomain: "socialbike-145413.firebaseapp.com",
  databaseURL: "https://socialbike-145413.firebaseio.com",
  storageBucket: "socialbike-145413.appspot.com"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogInPage,
    RegisterPage,
    RoutesPage,
    ChatPage,
    GroupRoutePage,
    NewGroupRoutePage,
    SocialMediaLogin,
    BikeHelpPage,
    NewBikeHelpPage,
    SocialMediaShareComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogInPage,
    RegisterPage,
    RoutesPage,
    ChatPage,
    GroupRoutePage,
    NewGroupRoutePage,
    BikeHelpPage,
    NewBikeHelpPage
  ],
  providers: [UserService, RouteService, ChatService, Storage, UtilProvider, BikeHelpService]
})
export class AppModule { }
