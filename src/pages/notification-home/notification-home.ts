import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController,
  ModalOptions
} from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";
import { NotificationProvider } from "../../providers/notification/notification";

/**
 * Generated class for the NotificationHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notification-home",
  templateUrl: "notification-home.html"
})
export class NotificationHomePage {
  public userDetails: any;
  public resposeData: any;
  public resposeChangeData : any;
  public resposeDelete: any;

  public image: any;
  public dataNotification = [];

  public showSet: number = 0;
  userPostData = {
    user_id: "",
    token: "",
    device_mac: "",
    device_id: "",
    device_name: "",
    device_description: "",
    notification_id: "",
    notification_status: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private viewCtrl: ViewController,
    public sensorsApiProvider: SensorsApiProvider,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    public modalCtrl: ModalController,
    public notificationProvider: NotificationProvider,
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.device_id = this.navParams.get("data");
    this.userPostData.device_mac = this.navParams.get("data2");
    this.userPostData.device_name = this.navParams.get("data3");
    this.userPostData.device_description = this.navParams.get("data4");
    this.getNotification();
  }

  ionViewDidLoad() {
    console.log(this.userPostData.device_id);
    console.log(this.userPostData.device_mac);
    console.log(this.userPostData.device_name);
    console.log(this.userPostData.device_description);
  }

  getNotification() {
    // this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "notification").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.notificationData) {
          // this.common.closeLoading();
          this.dataNotification = this.resposeData.notificationData;
          // console.log(this.dataNotification);
          for (let a in this.dataNotification) {
            if (this.dataNotification[a].notification_status == false) {
              this.dataNotification[a].notification_status = 0;
            } else if (this.dataNotification[a].notification_status == true) {
              this.dataNotification[a].notification_status = 1;
            }
          }
          console.log(this.dataNotification);
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  changeStatus(notification_id,notification_status) {
    console.log(notification_status);
    // this.common.presentLoading();
    this.userPostData.notification_id = notification_id;
    this.userPostData.notification_status = notification_status;
    this.sensorsApiProvider
      .postData(this.userPostData, "notificationStatusUpdate")
      .then(
        result => {
          this.resposeChangeData = result;
          console.log(result);
          if (this.resposeChangeData.notificationData) {
            console.log(this.resposeChangeData.notificationData);
            this.notificationProvider.setIntervalNotification();
            // this.common.closeLoading();
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
  }

  openModalAddNotification(myEvent) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    let addNotificationModal = this.modalCtrl.create(
      "ModalAddNotificationPage",
      {
        data: this.dataNotification,
        data1: this.userPostData.device_id
      },
      myModalOptions
    );
    addNotificationModal.onDidDismiss(data => {
      console.log(data);
    });
    addNotificationModal.present({
      ev: myEvent
    });
  }

  openModalUpdateNotification(
    notification_id,
    notification_weather,
    notification_operator,
    notification_value,
    notification_description
  ) {
    const myModalOptions2: ModalOptions = {
      enableBackdropDismiss: true
    };
    let updateNotificationModal = this.modalCtrl.create(
      "ModalUpdateNotificationPage",
      {
        data: this.dataNotification,
        data2: notification_id,
        data3: notification_weather,
        data4: notification_operator,
        data5: notification_value,
        data6: notification_description,
        data7: this.userPostData.device_id
      },
      myModalOptions2
    );
    updateNotificationModal.onDidDismiss(data => {
      if (data != null) {
        if (data.status == "ok") {
          console.log(data);
          this.getNotification();
        } else {
          console.log(data);
        }
      } else {
        console.log(data);
      }
    });
    updateNotificationModal.present();
  }

  notificationDelete(notification_id, notification_weather, msgIndex) {
    if (notification_id > 0) {
      let alert = this.alertCtrl.create({
        title: "ลบการเเจ้งเตือน" + notification_weather,
        message: "คุณต้องการจะลบการเเจ้งเตือนนี้ หรือไม่?",
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
              this.userPostData.notification_id = notification_id;
              this.sensorsApiProvider
                .postData(this.userPostData, "notificationDelete")
                .then(
                  result => {
                    this.resposeDelete = result;
                    if (this.resposeDelete.success) {
                      // this.getNotification();
                      this.dataNotification.splice(msgIndex, 1);
                      this.common.closeLoading();
                      // this.dataSet.splice(msgIndex, 1);
                    } else {
                      this.dataNotification.splice(msgIndex, 0);
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

  showSetting() {
    if (this.showSet == 0) {
      this.showSet++;
    } else {
      this.showSet--;
    }
  }

  // closeModal() {
  //   let data = { foo: "bar" };
  //   this.viewCtrl.dismiss(data);
  // }
}
