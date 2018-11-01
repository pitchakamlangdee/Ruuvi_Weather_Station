import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverAddNotificationPage } from './popover-add-notification';

@NgModule({
  declarations: [
    PopoverAddNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverAddNotificationPage),
  ],
})
export class PopoverAddNotificationPageModule {}
