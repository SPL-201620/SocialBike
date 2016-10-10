import { RoutesPage } from '../pages/routes/routes';
import { RouteService } from '../services/route.service.';
import { UserService } from '../services/user.service';
import { RegisterPage } from '../pages/register/register';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LogInPage } from '../pages/login/login';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Storage } from '@ionic/storage';

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
    RoutesPage
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
    RoutesPage
  ],
  providers: [UserService, RouteService, Storage]
})
export class AppModule { }
