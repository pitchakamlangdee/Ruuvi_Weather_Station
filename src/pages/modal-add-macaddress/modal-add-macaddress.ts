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
 * Generated class for the ModalAddMacaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-add-macaddress",
  templateUrl: "modal-add-macaddress.html"
})
export class ModalAddMacaddressPage {
  public userDetails: any;
  public resposeData: any;
  public dataSet = [];
  userPostData = { user_id: "", token: "", feed: "", feed_id: "" };

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public sensorsApiProvider: SensorsApiProvider,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    private toastCtrl : ToastController,
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    this.dataSet = this.navParams.get("data");
    console.log(this.dataSet);
  }

  // closeModal(){
  //   const data = {
  //     name: 'Aong',
  //     occupation: 'ddddddd'
  //   };
  //   this.view.dismiss(data);
  // }
  feedUpdate() {
    if (this.userPostData.feed) {
      let alert = this.alertCtrl.create({
        title: "ADD",
        message: "คุณต้องการจะเพิ่มข้อมูล Mac Address หรือไม่?",

        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Add",
            handler: () => {
              this.sensorsApiProvider
                .postData(this.userPostData, "feedUpdate")
                .then(
                  result => {
                    this.resposeData = result;
                    if (this.dataSet == undefined) {
                      this.dataSet[0] = this.userPostData.feed;
                    } else if (this.resposeData.feedData && this.dataSet) {
                      this.common.presentLoading();
                      this.dataSet.unshift(this.resposeData.feedData);
                      console.log(this.dataSet);
                      this.viewCtrl.dismiss(this.dataSet);
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
    } else {
      this.presentToast("กรุณากรอก Mac Address !!");
    }
  }

  presentToast(msg){
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
