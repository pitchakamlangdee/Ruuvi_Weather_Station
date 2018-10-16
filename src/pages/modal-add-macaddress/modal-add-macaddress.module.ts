import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddMacaddressPage } from './modal-add-macaddress';

@NgModule({
  declarations: [
    ModalAddMacaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddMacaddressPage),
  ],
})
export class ModalAddMacaddressPageModule {}
