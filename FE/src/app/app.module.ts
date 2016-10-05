import {RouteService} from '../services/route.service.';
import {UserService} from '../../.tmp/services/user.service';
import {RoutesPage} from '../pages/routes/routes';
import {RegisterPage} from '../pages/register/register';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LogInPage } from '../pages/login/login';

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
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
  providers: [UserService, RouteService]
})
export class AppModule {}
