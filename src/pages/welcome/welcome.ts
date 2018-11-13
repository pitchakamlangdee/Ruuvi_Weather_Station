import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
import { HomePage } from "../home/home";
// import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
    if (localStorage.getItem("userData")) {
      this.menu.enable(true);
      this.navCtrl.setRoot(HomePage);
    } else {
      this.menu.enable(false);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage, { animate: false });
  }
}
