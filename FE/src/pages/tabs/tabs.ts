import {BikeHelpPage} from '../bikehelp/bikehelp';
import {RoutesPage} from '../routes/routes';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {GroupRoutePage} from '../group/grouproute';
import {BikeconfiguratorPage} from '../bikeconfigurator/bikeconfigurator';

import { bikeConfiguratorFeature } from '../../shared/variabilityconst';
import { bikeHelpsFeature } from '../../shared/variabilityconst';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabHome: any = HomePage;
  tabRoutes: any = RoutesPage;
  tabInfo: any = AboutPage;
  tabContacts: any = ContactPage;
  tabGroupRoutes: any = GroupRoutePage;
  tabBikeHelps: any = BikeHelpPage;
  tabBikeConfig: any = BikeconfiguratorPage;
  showBikeConfig:Boolean = bikeConfiguratorFeature;
  showBikeHelp:Boolean = bikeHelpsFeature;

  constructor() {

  }
}
