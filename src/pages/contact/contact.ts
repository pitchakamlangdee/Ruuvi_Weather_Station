import { Component } from "@angular/core";
import { NavController, AlertController, Platform } from "ionic-angular";
import {
  PhonegapLocalNotification,
  LocalNotificationOptions
} from "@ionic-native/phonegap-local-notification";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
//import { isBoolean } from "ionic-angular/util/util";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  check : boolean;
  display : any;
  checkStatusTemperature : boolean[] = [];
  checkStatusHumidity : boolean[] = [];
  checkStatusPressure : boolean[] = [];
  checkSensorsDataLast: any;
  selectedItem = [];
  sensors_data_last: any;
  public userDetails: any;
  public resposeDataMac: any;
  public dataMac = [];
  knobValuesTemperature = [];
  knobValuesHumidity = [];
  knobValuesPressure = [];
  userPostData = { user_id: "", token: "", device_mac: "", device_id: "" };
  

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private platform: Platform,
    private notification: PhonegapLocalNotification,
    public sensorsApiProvider: SensorsApiProvider
  ) {
    const checkData = JSON.parse(localStorage.getItem("checkSensorsDataLast"));
    const data = JSON.parse(localStorage.getItem("userData"));

    this.checkSensorsDataLast = checkData;
    console.log(this.checkSensorsDataLast);

    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.getMacSelectHome();
    this.check = false;
    
  }

  ionViewDidLoad() {
    //this.getMacSelectHome();
    
    setInterval(() => {
      this.addNotificationTemperature();
    }, 5000);
  }

  getMacSelectHome() {
    // this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "macRuuvitag").then(
      result => {
        this.resposeDataMac = result;
        if (this.resposeDataMac.macData) {
          // this.common.closeLoading();
          this.dataMac = this.resposeDataMac.macData;

          console.log(this.dataMac);
        } else {
          console.log("No access");
        }
        for (let a in this.dataMac) {
          this.selectedItem[a] = this.dataMac[a].mac_id;
          this.knobValuesTemperature[a] = {upper:100, lower:50} ;
          this.knobValuesHumidity[a] = {upper:100, lower:50} ;
          this.knobValuesPressure[a] = {upper:100, lower:50} ;
          this.checkStatusTemperature[a] = false ;
          this.checkStatusHumidity[a] = false;
          this.checkStatusPressure[a] = false;
        }
        this.display = "ปิด";
        console.log(this.checkStatusTemperature[0]);
        this.getLastDataSensors();
      },
      err => {
        //Connection failed message
      }
    );
  }

  getLastDataSensors() {
    if (this.selectedItem.length > 0) {
      // this.common.presentLoading();
      this.sensors_data_last = [this.selectedItem.length];
      console.log(this.sensors_data_last);
      for (let i in this.selectedItem) {
        //console.log(this.selectedItem[i]);
        this.sensorsApiProvider
          .getLastDataSensors(this.selectedItem[i])
          .then(data_last => {
            this.sensors_data_last[i] = data_last[0];
            console.log(this.sensors_data_last[i]);
          });
      }

      // this.common.closeLoading();
    }
  }

  images = [
    { title: "Home", image: "assets/imgs/maple_background.jpg" },
    { title: "Graphs", image: "assets/imgs/sunset_background.jpg" },
    { title: "Contact", image: "assets/imgs/sunset_background.jpg" }
  ];

  async addNotificationTemperature() {
    if (this.check == true) {
      console.log(this.check);
      if (this.sensors_data_last[0].temperature > 3) {
        try {
          await this.platform.ready();
          const permission = await this.notification.requestPermission();

          if (permission === "granted") {
            const options: LocalNotificationOptions = {
              tag: "myNotification",
              body: "อุณหภูมิสูงกว่าที่กำหนดเเล้ว !!",
              icon: "assets/icon/loudspeaker.png"
            };

            const myNotification = await this.notification.create(
              "เเจ้งเตือน",
              options
            );

            myNotification.close();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  async addNotificationHumidity() {
    if (this.check == true) {
      this.display = "เปิด";
      if (this.checkSensorsDataLast > 10) {
        try {
          await this.platform.ready();
          const permission = await this.notification.requestPermission();

          if (permission === "granted") {
            const options: LocalNotificationOptions = {
              tag: "myNotification",
              body: this.checkSensorsDataLast,
              icon: "assets/icon/loudspeaker.png"
            };

            const myNotification = await this.notification.create(
              this.checkSensorsDataLast,
              options
            );

            myNotification.close();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }else if (this.check == false){
      this.display = "ปิด";
    }
  }

  async addNotificationPressure() {
    if (this.check == true) {
      if (this.checkSensorsDataLast > 10) {
        try {
          await this.platform.ready();
          const permission = await this.notification.requestPermission();

          if (permission === "granted") {
            const options: LocalNotificationOptions = {
              tag: "myNotification",
              body: this.checkSensorsDataLast,
              icon: "assets/icon/loudspeaker.png"
            };

            const myNotification = await this.notification.create(
              this.checkSensorsDataLast,
              options
            );

            myNotification.close();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  test(a,b){
    // console.log(this.knobValuesTemperature[0]);
    // console.log(this.knobValuesTemperature[1]);
    console.log("upper : " + a);
    console.log("lower : " + b);
  }
}
