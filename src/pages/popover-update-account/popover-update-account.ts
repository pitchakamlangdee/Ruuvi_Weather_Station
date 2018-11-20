import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController,
  AlertController
} from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the PopoverUpdateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-popover-update-account",
  templateUrl: "popover-update-account.html"
})
export class PopoverUpdateAccountPage {
  public userDetails: any;
  public resposeData: any;
  public check_name : any;

  userPostData = {
    user_id: "",
    token: "",
    name: ""
  };

  constructor(
    public navCtrl: NavController,
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
    this.userPostData.name = this.userDetails.name;
    this.check_name = this.userDetails.name;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PopoverUpdateAccountPage");
  }


  nameAccountUpdate() {
    // if (this.check_name != this.userPostData.name) {
      let alert = this.alertCtrl.create({
        title: "เเก้ไขชื่อ",
        message: "คุณต้องการจะเเก้ไขข้อมูลชื่อ หรือไม่?",
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
              // this.common.presentLoading();
              this.sensorsApiProvider
                .postData(this.userPostData, "nameAccountUpdate")
                .then(
                  result => {
                    this.resposeData = result;
                    console.log(result);
                    if (this.resposeData.userData) {
                      // this.dataSet = this.resposeData.deviceData;
                      localStorage.setItem("userData", JSON.stringify(this.resposeData));
                      let data = { status: "ok" };
                      this.viewCtrl.dismiss(data);
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
          }
        ]
      });
      alert.present();
    // }else{
    //   this.viewCtrl.dismiss();
    // }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  closePopover() {
    this.viewCtrl.dismiss();
  }
}
