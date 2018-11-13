import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  MenuController
} from "ionic-angular";
// import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";
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
    public sensorsApiProvider: SensorsApiProvider,
    public menu: MenuController,
    private toastCtrl: ToastController
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

          if (this.resposeData.userData) {
            localStorage.setItem("userData", JSON.stringify(this.resposeData));
            this.menu.enable(true);
            this.navCtrl.push(HomePage);
            this.presentToast("Login Sucess !");
          } else {
            this.presentToast("Give valid details");
          }
        },
        err => {
          //Connection failed message
        }
      );
    } else {
      this.presentToast("Give username and password");
    }
  }
  login() {
    this.navCtrl.push(LoginPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
