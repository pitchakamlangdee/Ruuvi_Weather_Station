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
 * Generated class for the ModalAddNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-add-notification",
  templateUrl: "modal-add-notification.html"
})
export class ModalAddNotificationPage {
  public userDetails: any;
  public resposeData: any;
  public dataNotification = [];
  public device_id: any;
  public showOperator = 0;
  public showRange = 0;
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
    this.userPostData.notification_value = "0";
    this.userPostData.device_id = this.navParams.get("data1");
  }

  ionViewDidLoad() {
    this.dataNotification = this.navParams.get("data");
    this.device_id = this.navParams.get("data1");
    console.log(this.device_id);
  }

  notificationInsert() {
    if (this.userPostData.notification_weather) {
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
                  .postData(this.userPostData, "notificationInsert")
                  .then(
                    result => {
                      this.resposeData = result;
                      if (this.dataNotification == undefined) {
                        this.dataNotification[0] = this.userPostData.notification_weather;
                      } else if (
                        this.resposeData.notificationData &&
                        this.dataNotification
                      ) {
                        this.common.presentLoading();
                        this.dataNotification.unshift(
                          this.resposeData.notificationData
                        );
                        console.log(this.dataNotification);
                        this.viewCtrl.dismiss();
                        this.common.closeLoading();
                      } else {
                        this.presentToast("มีการเเจ้งเตือนเเบบเดียวกันนี้อยู่ในระบบเเล้ว");
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
    } else {
      this.presentToast("กรุณากรอก Mac Address !!");
    }
  }


  showOperatorNotification(){
    this.userPostData.notification_value = "0";
    this.showOperator ++
  }
  
  showRangeNotification(){
    this.showRange ++
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
