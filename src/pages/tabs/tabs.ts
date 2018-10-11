import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CommonProvider } from "../../providers/common/common";

@Component({

  templateUrl: 'tabs.html'
})
export class TabsPage {

pages = [
    { pageName: HomePage, title: "Home", icon:"home", id: "homeTab"},
    { pageName: AboutPage, title: "Graphs", icon:"stats", id: "aboutTab"},
    { pageName: ContactPage, title: "Contact", icon:"body", id: "contactTab"}

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

