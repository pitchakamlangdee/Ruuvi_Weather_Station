import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddNotificationPage } from './modal-add-notification';

@NgModule({
  declarations: [
    ModalAddNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddNotificationPage),
  ],
})
export class ModalAddNotificationPageModule {}
