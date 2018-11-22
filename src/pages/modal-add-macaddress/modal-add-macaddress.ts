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
  userPostData = { user_id: "", token: "", device_mac: "", device_id: "", device_name:"", device_description:"" };

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
    console.log(this.dataSet);
  }

  // closeModal(){
  //   const data = {
  //     name: 'Aong',
  //     occupation: 'ddddddd'
  //   };
  //   this.view.dismiss(data);
  // }
  deviceInsert() {
    if (this.userPostData.device_mac) {
      if(this.userPostData.device_mac.length == 17){
      let alert = this.alertCtrl.create({
        title: "เพิ่ม Ruuvitag",
        message: "คุณต้องการจะเพิ่มข้อมูล Ruuvitag หรือไม่?",

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
                    if (this.dataSet == undefined) {
                      this.dataSet[0] = this.userPostData.device_mac;
                    } else if (this.resposeData.deviceData && this.dataSet) {
                      this.common.presentLoading();
                      this.dataSet.unshift(this.resposeData.deviceData);
                      console.log(this.dataSet);
                      this.viewCtrl.dismiss(this.dataSet);
                      this.common.closeLoading();
                    } else {
                      this.presentToast("มี Ruuvitag อยู่ในระบบเเล้ว !");
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
        this.presentToast("กรุณากรอก Mac Address ให้ครบ !");
      }
    } else {
      this.presentToast("กรุณากรอก Mac Address !");
    }
  }
  macSystax() {
    if (
      this.userPostData.device_mac.length == 2 ||
      this.userPostData.device_mac.length == 5 ||
      this.userPostData.device_mac.length == 8 ||
      this.userPostData.device_mac.length == 11 ||
      this.userPostData.device_mac.length == 14 
    ) {
      this.userPostData.device_mac = this.userPostData.device_mac + ":";
      console.log(this.userPostData.device_mac);
      return true;
    }else if(this.userPostData.device_mac.length == 17){

      this.userPostData.device_mac = this.userPostData.device_mac;
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
