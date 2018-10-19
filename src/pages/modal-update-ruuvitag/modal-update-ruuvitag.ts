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
@IonicPage()
@Component({
  selector: "page-modal-update-ruuvitag",
  templateUrl: "modal-update-ruuvitag.html"
})
export class ModalUpdateRuuvitagPage {
  public userDetails: any;
  public resposeData: any;

  public dataSet = [];
  public feed_id: any;
  public feed: any;
  public device_name1: any;
  public device_des1: any;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    device_name: "",
    device_des: ""
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
  }

  ionViewDidLoad() {
    this.dataSet = this.navParams.get("data");
    this.feed_id = this.navParams.get("data2");
    this.feed = this.navParams.get("data3");
    this.device_name1 = this.navParams.get("data4");
    this.device_des1 = this.navParams.get("data5");

    console.log(this.dataSet);
    console.log(this.feed_id);
    console.log(this.feed);
    console.log(this.device_name1);
    console.log(this.device_des1);
  }

  feedUpdate() {
    if (this.feed_id > 0) {
      console.log(this.device_name1);
      console.log(this.device_des1);
      let alert = this.alertCtrl.create({
        title: "เเก้ไข Ruuvitag",
        message: "คุณต้องการจะเเก้ไขข้อมูล Ruuvitag หรือไม่?",
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
              this.userPostData.feed_id = this.feed_id;
              this.userPostData.device_name = this.device_name1;
              this.userPostData.device_des = this.device_des1;
              this.sensorsApiProvider
                .postData(this.userPostData, "feedUpdate")
                .then(
                  result => {
                    this.resposeData = result;
                    console.log(result);
                    if (this.resposeData.feedData) {
                      this.dataSet = this.resposeData.feedData;
                      this.viewCtrl.dismiss(this.dataSet);
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
