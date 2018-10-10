import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  resposeData: any;
  userData = { username: "", password: "", email: "", name: "" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensorsApiProvider: SensorsApiProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  signup() {
    //Appi connections
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.name
    ) {
      this.sensorsApiProvider.postData(this.userData, "signup").then(
        result => {
          this.resposeData = result;
          console.log(this.resposeData);
          localStorage.setItem("userData", JSON.stringify(this.resposeData));
          this.navCtrl.push(TabsPage);
        },
        err => {
          //Connection failed message
        }
      );
    }
    else {
      console.log("Give valid information.");
    }
  }
  login() {
    this.navCtrl.push(LoginPage);
  }
}
