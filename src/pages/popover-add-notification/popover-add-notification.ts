import { Component } from "@angular/core";
import {
  IonicPage,
  NavParams,
  ViewController,
  ToastController,
  AlertController
} from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the PopoverAddNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-popover-add-notification",
  templateUrl: "popover-add-notification.html"
})
export class PopoverAddNotificationPage {
  public userDetails: any;
  public resposeData: any;
  public dataNotification = [];
  userPostData = { user_id: "", token: "", device_mac: "", device_id: "", device_name:"", device_des:"" };

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public sensorsApiProvider: SensorsApiProvider,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    private toastCtrl: ToastController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    this.dataNotification = this.navParams.get("data");
    console.log(this.dataNotification);
  }

  notificationInsert() {
    if (this.userPostData.device_mac) {
      if(this.userPostData.device_mac.length == 17){
      let alert = this.alertCtrl.create({
        title: "เพิ่มการเเจ้งเตือน",
        message: "คุณต้องการจะเพิ่มการเเจ้งเตือน หรือไม่?",

        buttons: [
          {
            text: "ยกเลิก",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "ยืนยัน",
            handler: () => {
              console.log(this.userPostData);
              this.sensorsApiProvider
                .postData(this.userPostData, "deviceInsert")
                .then(
                  result => {
                    this.resposeData = result;
                    if (this.dataNotification == undefined) {
                      this.dataNotification[0] = this.userPostData.device_mac;
                    } else if (this.resposeData.deviceData && this.dataNotification) {
                      this.common.presentLoading();
                      this.dataNotification.unshift(this.resposeData.deviceData);
                      console.log(this.dataNotification);
                      this.viewCtrl.dismiss(this.dataNotification);
                      this.common.closeLoading();
                    } else {
                      this.presentToast("มี Ruuvitag อยู่ในระบบเเล้ว");
                    }
                  },
                  err => {
                    //Connection failed message
                  }
                );
            }
          }
        ]
      });
      alert.present();
      } else{
        this.presentToast("กรุณากรอก Mac Address ให้ครบ !!");
      }
    } else {
      this.presentToast("กรุณากรอก Mac Address !!");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    let data = { foo: "bar" };
    this.viewCtrl.dismiss(data);
  }
}
