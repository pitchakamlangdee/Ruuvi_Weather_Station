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
  Modal,
  PopoverController 
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
  public resposeDelete: any;
  //public resposeDataSensor : any;
  public dataSet = [];
  public count_dataSet : number;
  public check_data_account : number = 0;
  public check_data_ruuvitag : number = 1;
  //public dataSensor =[];
  userPostData = {
    user_id: "",
    token: "",
    device_mac: "",
    device_id: "",
    device_name: "",
    device_description: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public sensorsApiProvider: SensorsApiProvider,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    // private toastCtrl : ToastController,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController
  ) {
    this.count_dataSet = 0;
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.getDevice();
    // this.displayAccount();
  }

  getDevice() {
    this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "device").then(
      result => {
        this.resposeData = result;
        
        if (this.resposeData.deviceData) {
          this.common.closeLoading();
          this.dataSet = this.resposeData.deviceData;
          this.count_dataSet = this.dataSet.length;
          console.log(this.dataSet);
        } else {
          this.common.closeLoading();
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  openPopoverUpdateAccount(myEvent) {
    let updateAccountPopover = this.popoverCtrl.create("PopoverUpdateAccountPage");
    updateAccountPopover.onDidDismiss(data => {
      const data1 = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data1.userData;
      console.log(data);
    });
    updateAccountPopover.present({
      ev: myEvent
    });
  }

  openModalAddRuuvitag(myEvent) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };
    let addMacModal: Modal = this.modalCtrl.create(
      "ModalAddMacaddressPage",
      { data: this.dataSet },
      myModalOptions
    );
    addMacModal.onDidDismiss(data => {
      this.count_dataSet = this.dataSet.length;
      console.log(data);
      
    });
    addMacModal.present({
      ev: myEvent
    });
  }

  openModalUpdateRuuvitag(myEvent,device_id, device_mac, device_name, device_description) {
    const myModalOptions2: ModalOptions = {
      enableBackdropDismiss: true
    };
    let updateRuuvitagModal: Modal = this.modalCtrl.create(
      "ModalUpdateRuuvitagPage",
      { data:this.dataSet, data2:device_id, data3:device_mac, data4:device_name, data5:device_description},
      myModalOptions2
    );
    updateRuuvitagModal.onDidDismiss(data => {
      if (data != null) {
        if(data.status=="ok"){
          this.count_dataSet = this.dataSet.length;
          console.log(data);
        this.getDevice();
        }else{
          console.log(data);
        }
      } else {
        console.log(data);
      }
    });
    updateRuuvitagModal.present({
      ev: myEvent
    });
  }


  deviceDelete(device_id, msgIndex) {
    console.log(msgIndex);
    if (device_id > 0) {
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
              this.userPostData.device_id = device_id;
              this.sensorsApiProvider
                .postData(this.userPostData, "deviceDelete")
                .then(
                  result => {
                    this.resposeDelete = result;
                    if (this.resposeDelete.success) {
                      // this.getDevice();
                      this.dataSet.splice(msgIndex, 1);
                      this.count_dataSet = this.dataSet.length;
                      this.common.closeLoading();
                    } else {
                      this.count_dataSet = 0;
                      this.dataSet.splice(msgIndex, 0);
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

  showDataAccount(){
    if(this.check_data_account==0){
    this.check_data_account ++;
    }else{
      this.check_data_account --;
    }
  }

  showDataRuuvitag(){
    if(this.check_data_ruuvitag==1){
    this.check_data_ruuvitag --;
    }else{
      this.check_data_ruuvitag ++;
    }
  }
  // displayAccount(){
  //   this.common.presentLoading();
  //   this.getDevice();
  //   this.common.closeLoading();
  // }
  // presentToast(msg){
  //   let toast = this.toastCtrl.create({
  //       message: msg,
  //       duration: 2000
  //   });
  //   toast.present();

  // }
}
