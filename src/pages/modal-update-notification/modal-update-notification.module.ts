import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUpdateNotificationPage } from './modal-update-notification';

@NgModule({
  declarations: [
    ModalUpdateNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUpdateNotificationPage),
  ],
})
export class ModalUpdateNotificationPageModule {}
