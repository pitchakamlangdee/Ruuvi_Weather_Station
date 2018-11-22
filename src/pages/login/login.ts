import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, MenuController } from "ionic-angular";
// import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { NotificationProvider } from "../../providers/notification/notification";



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  resposeData: any;
  userData = { username: "", password: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensorsApiProvider: SensorsApiProvider,
    public menu: MenuController,
    public notificationProvider: NotificationProvider,
    private toastCtrl : ToastController
  ) {}

  login() {
    if (this.userData.username && this.userData.password) {
      
      this.sensorsApiProvider.postData(this.userData, "login").then(
        result => {
          this.resposeData = result;
          console.log(this.resposeData);
          
          if(this.resposeData.userData){
           
           
          localStorage.setItem("userData", JSON.stringify(this.resposeData));
          this.menu.enable(true);
          this.notificationProvider.setIntervalNotification();
          this.navCtrl.push(HomePage);
          this.presentToast("เข้าสู่ระบบสำเร็จ !");
           
          }
          else{
            this.presentToast("ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง !");
          }
        },
        (err) => {
          //Connection failed message
        }
      );
    }
    else{
      this.presentToast("กรุณาใส่ชื่อผู้ใช้/อีเมล เเละรหัสผ่านให้ครบ !");
    }
  }


  presentToast(msg){
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000
    });
    toast.present();


  }
}
