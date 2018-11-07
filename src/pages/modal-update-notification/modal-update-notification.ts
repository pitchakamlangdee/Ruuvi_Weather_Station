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
 * Generated class for the ModalUpdateNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-update-notification",
  templateUrl: "modal-update-notification.html"
})
export class ModalUpdateNotificationPage {
  public resposeData : any;
  public userDetails: any;
  public dataNotification = [];
  public notification_id: any;
  public notification_weather: any;
  public notification_operator: any;
  public notification_value: any;
  public notification_description: any;

  userPostData = {
    user_id: "",
    token: "",
    device_id: "",
    notification_id: "",
    notification_weather: "",
    notification_operator: "",
    notification_value: "",
    notification_description: ""
  };

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
    this.userPostData.device_id = this.navParams.get("data7");
  }

  ionViewDidLoad() {
    this.dataNotification = this.navParams.get("data");
    this.notification_id = this.navParams.get("data2");
    this.notification_weather = this.navParams.get("data3");
    this.notification_operator = this.navParams.get("data4");
    this.notification_value = this.navParams.get("data5");
    this.notification_description = this.navParams.get("data6");
  }

  notificationUpdate() {
    if (this.notification_id > 0) {
      // console.log(this.device_name1);
      // console.log(this.device_des1);
      let alert = this.alertCtrl.create({
        title: "เเก้ไขการเเจ้งเตือน",
        message: "คุณต้องการจะเเก้ไขข้อมูลการเเจ้งเตือน หรือไม่?",
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
              this.common.presentLoading();

              this.userPostData.notification_id = this.notification_id;
              this.userPostData.notification_weather = this.notification_weather;
              this.userPostData.notification_operator = this.notification_operator;
              this.userPostData.notification_value = this.notification_value;
              this.userPostData.notification_description = this.notification_description;

              this.sensorsApiProvider
                .postData(this.userPostData, "notificationUpdate")
                .then(
                  result => {
                    this.resposeData = result;
                    console.log(result);
                    if (this.resposeData.notificationData) {
                      this.dataNotification = this.resposeData.notificationData;
                      let data = { status: "ok" };
                      this.viewCtrl.dismiss(data);
                      this.common.closeLoading();
                    } else {
                      console.log("No access");
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
    }
  }

  setNotificationValue(){
    this.notification_value = "0";
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  closeModal() {
    let data = { status: "close" };
    this.viewCtrl.dismiss(data);
  }
}
