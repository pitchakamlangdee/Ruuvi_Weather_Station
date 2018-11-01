import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { AccountPage } from '../account/account';
// import { HomePage } from '../home/home';
import { CommonProvider } from "../../providers/common/common";

@Component({

  templateUrl: 'tabs.html'
})
export class TabsPage {

pages = [
    { pageName: ContactPage, title: "การเเจ้งเตือน", icon:"notifications", id: "contactTab"},
    { pageName: AccountPage, title: "บัญชีผู้ใช้", icon:"contact", id: "accountTab"}
    // { pageName: AccountPage, title: "บัญชีผู้ใช้", icon:"contact", id: "accountTab"}

];
 constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider) {
this.displayPages();
  }


  displayPages(){
    this.common.presentLoading();
    this.pages;
    this.common.closeLoading();
  }
}

