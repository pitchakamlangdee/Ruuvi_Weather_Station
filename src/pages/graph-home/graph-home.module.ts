import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphHomePage } from './graph-home';

@NgModule({
  declarations: [
    GraphHomePage,
  ],
  imports: [
    IonicPageModule.forChild(GraphHomePage),
  ],
})
export class GraphHomePageModule {}
