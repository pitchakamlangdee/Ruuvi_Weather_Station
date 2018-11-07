import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationHomePage } from './notification-home';

@NgModule({
  declarations: [
    NotificationHomePage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationHomePage),
  ],
})
export class NotificationHomePageModule {}
