import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { WelcomePage } from '../pages/welcome/welcome'; 
import { LoginPage } from '../pages/login/login'; 
import { SignupPage } from '../pages/signup/signup'; 
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { GraphHomePage} from '../pages/graph-home/graph-home';
import { NotificationHomePage } from '../pages/notification-home/notification-home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SensorsApiProvider } from '../providers/sensors-api/sensors-api';
import { MomentModule} from 'angular2-moment';
import { LinkyModule} from 'angular-linky';
import { CommonProvider } from '../providers/common/common';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { SplitPaneProvider } from '../providers/split-pane/split-pane';
import { NotificationProvider } from '../providers/notification/notification';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    NotificationHomePage,
    GraphHomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp
      // ,{
      // backButtonIcon: 'ios-arrow-back',
      // backButtonText: '',
      // pageTransition: 'iostransition',
      // activator:'ripple',
      // mode:'ios',
      // tabsHideonSubPages: true}
      ),
    SuperTabsModule.forRoot(),
    HttpClientModule,
    HttpModule,
    MomentModule,
    LinkyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    NotificationHomePage,
    GraphHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhonegapLocalNotification,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SensorsApiProvider,
    CommonProvider,
    SplitPaneProvider,
    NotificationProvider
    
  ]
})
export class AppModule {}
