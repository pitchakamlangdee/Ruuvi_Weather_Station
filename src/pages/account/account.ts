import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  AlertController,
  // ToastController,
  ModalController,
  ModalOptions,
  Modal
} from "ionic-angular";
import { WelcomePage } from "../welcome/welcome";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage {
  public userDetails: any;
  public resposeData: any;
  //public resposeDataSensor : any;
  public dataSet = [];
  //public dataSensor =[];
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    device_name: "",
    device_des: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public sensorsApiProvider: SensorsApiProvider,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    // private toastCtrl : ToastController,
    private modalCtrl: ModalController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.displayAccount();
  }

  getFeed() {
    // this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "feed").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          // this.common.closeLoading();
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  // feedUpdate() {
  //   if (this.userPostData.feed) {
  //     let alert = this.alertCtrl.create({
  //       title: "ADD",
  //       message: "คุณต้องการจะเพิ่มข้อมูล Mac Address หรือไม่?",

  //       buttons: [
  //         {
  //           text: "Cancel",
  //           role: "cancel",
  //           handler: () => {
  //             console.log("Cancel clicked");
  //           }
  //         },
  //         {
  //           text: "Add",
  //           handler: () => {

  //             this.sensorsApiProvider
  //               .postData(this.userPostData, "feedUpdate")
  //               .then(
  //                 result => {
  //                   this.resposeData = result;
  //                   if (this.dataSet == undefined) {
  //                     this.dataSet[0] = this.userPostData.feed;
  //                   }
  //                   else if (this.resposeData.feedData && this.dataSet ) {
  //                     this.common.presentLoading();
  //                     this.dataSet.unshift(this.resposeData.feedData);
  //                     console.log(this.dataSet);
  //                     this.common.closeLoading();
  //                   }
  //                    else {
  //                     this.presentToast("มี Ruuvitag อยู่ในระบบเเล้ว");
  //                   }
  //                 },
  //                 err => {
  //                   //Connection failed message
  //                 }
  //               );
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   }
  //   else{
  //     this.presentToast("กรุณากรอก Mac Address !!");
  //   }
  // }

  openModalAddRuuvitag() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    let addMacModal: Modal = this.modalCtrl.create(
      "ModalAddMacaddressPage",
      { data: this.dataSet },
      myModalOptions
    );
    addMacModal.onDidDismiss(data => {
      console.log(data);
    });
    addMacModal.present();
  }

  openModalUpdateRuuvitag(feed_id, feed, device_name, device_des) {
    const myModalOptions2: ModalOptions = {
      enableBackdropDismiss: true
    };
    let updateRuuvitagModal: Modal = this.modalCtrl.create(
      "ModalUpdateRuuvitagPage",
      { data:this.dataSet, data2:feed_id, data3:feed, data4:device_name, data5:device_des},
      myModalOptions2
    );
    updateRuuvitagModal.onDidDismiss(data => {
      console.log(data);
      this.getFeed();
    });
    updateRuuvitagModal.present();
  }

  // openModal(){
  // const myModalOptions: ModalOptions = {
  //   enableBackdropDismiss: false,

  // }

  //   const myModalData = {
  //     name: 'Pitcha',
  //     occupation: 'Developer'
  //   };
  //   const myModal: Modal = this.modal.create('ModalAddMacaddressPage', {data:myModalData},myModalOptions);

  //   myModal.present();

  //   myModal.onDidDismiss((data) => {
  //     console.log("I have dismiss");
  //     console.log(data);
  //   })

  //   myModal.onWillDismiss((data) =>{
  //     console.log("I'm about to dismiss");
  //     console.log(data);
  //   })
  // }

  feedDelete(feed_id, msgIndex) {
    if (feed_id > 0) {
      let alert = this.alertCtrl.create({
        title: "ลบ Ruuvitag",
        message: "คุณต้องการจะลบข้อมูล Ruuvitag หรือไม่?",
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
              this.userPostData.feed_id = feed_id;
              this.sensorsApiProvider
                .postData(this.userPostData, "feedDelete")
                .then(
                  result => {
                    this.resposeData = result;
                    if (this.resposeData.success) {
                      this.common.closeLoading();
                      this.dataSet.splice(msgIndex, 1);
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

  // getSensor() {
  //   // this.common.presentLoading();
  //   this.sensorsApiProvider.postData(this.userPostData, "sensor").then(
  //     result => {
  //       this.resposeDataSensor = result;
  //       if (this.resposeDataSensor.sensorData) {
  //         // this.common.closeLoading();
  //         this.dataSensor = this.resposeDataSensor.sensorData;
  //         console.log(this.dataSensor);
  //       } else {
  //         console.log("No access");
  //       }
  //     },
  //     err => {
  //       //Connection failed message
  //     }
  //   );
  // }
  // converTime(time) {
  //   let a = new Date(time * 1000);
  //   return a;
  // }

  backToWelcome() {
    this.navCtrl.push(WelcomePage);
  }
  logout() {
    //API Token LOgout
    // const root = this.app.getRootNav();
    // root.popToRoot();
    let alert = this.alertCtrl.create({
      title: "ออกจากระบบ",
      message: "คุณต้องการจะออกจากระบบหรือไม่?",
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
            localStorage.clear();
            setTimeout(() => this.backToWelcome(), 1000);
            setTimeout(() => this.common.closeLoading(), 1000);
            //this.common.closeLoading();
          }
        }
      ]
    });
    alert.present();
  }

  displayAccount(){
    this.common.presentLoading();
    this.getFeed();
    this.common.closeLoading();
  }
  // presentToast(msg){
  //   let toast = this.toastCtrl.create({
  //       message: msg,
  //       duration: 2000
  //   });
  //   toast.present();

  // }
}
