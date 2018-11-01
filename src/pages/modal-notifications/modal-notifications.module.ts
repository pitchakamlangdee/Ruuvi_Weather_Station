import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotificationsPage } from './modal-notifications';

@NgModule({
  declarations: [
    ModalNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotificationsPage),
  ],
})
export class ModalNotificationsPageModule {}
