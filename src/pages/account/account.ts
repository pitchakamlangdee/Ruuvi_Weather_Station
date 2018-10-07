import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  logout(){
    //API Token LOgout
    // const root = this.app.getRootNav();
    // root.popToRoot();
    this.navCtrl.push(WelcomePage);
  }

}
