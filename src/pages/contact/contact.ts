import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public app:App) {

  }
  logout(){
    //API Token LOgout
    const root = this.app.getRootNav();
    root.popToRoot();
  }



}
