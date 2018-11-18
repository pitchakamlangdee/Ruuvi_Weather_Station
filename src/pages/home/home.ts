import { Component, ViewChild  } from "@angular/core";
import { NavController, ModalController, Slides, ModalOptions,Modal  } from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";
// import { AboutPage } from "../about/about";
// import { ContactPage } from "../contact/contact";
import { GraphHomePage } from "../graph-home/graph-home";
import { NotificationHomePage } from "../notification-home/notification-home";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Slides)
  slides: Slides;
  // numbers = [0, 1, 2];
  // firstLoad = true;
  select_mac_home: any;
  sensors_data_last: any;
  check_sensors_data_last: any;
  selectedItem: any;
  selectedItemLength: string = "";
  selectedItemTotal = [];
  currentIndex :number;
  public time_Stamp = [];
  public set_date_last_sensor = [];
  public set_time_last_sensor = [];
  public set_year_last_sensor = [];
  public set_month_last_sensor = [];
  public set_day_last_sensor = [];

  public dataSet = [];
  public count_dataSet : number;


  public userDetails: any;
  public resposeDataMac: any;
  public resposeLastData: any;
  public resposeData: any;
  public dataMac = [];
  userPostData = { user_id: "", token: "", device_mac: "", device_id: "" };
  //numbers = ["a", "b", "c", "d", "e"];

  constructor(
    public navCtrl: NavController,
    public sensorsApiProvider: SensorsApiProvider,
    public common: CommonProvider,
    private modalCtrl: ModalController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    // this.getMacSelectHome();
  }
  ionViewDidLoad() {
    this.getMacSelectHome();
    // setInterval(() => {
    //   this.getCheckLastDataSensors();
    // }, 5000);
  }
  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    setTimeout(() => {
      console.log("Async operation has ended");
      if (this.selectedItemLength == "") {
        this.getFirstLastDataSensors();
      } else if (this.selectedItemLength) 
      {
        this.getRefreshLastDataSensors();
      }
      refresher.complete();
    }, 1000);
  }
  getMacSelectHome() {
    // this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "macRuuvitag").then(
      result => {
        this.resposeDataMac = result;
        console.log(result);
        if (this.resposeDataMac.macData) {
          // this.common.closeLoading();
          this.dataMac = this.resposeDataMac.macData;

          console.log(this.dataMac);
        } else {
          console.log("No access");
          this.getDevice();
        }
        this.selectedItem = this.dataMac;

        // for (let a in this.dataMac) {
        //   this.selectedItem[a] = this.dataMac[a].mac_id;
        // }

        this.getFirstLastDataSensors();
      },
      err => {
        //Connection failed message
      }
    );
  }
  getFirstLastDataSensors() {
    // this.selectedItemLength = "เเสดง Ruuvitag จำนวน";
    // this.selectedItemLength =
    //   this.selectedItemLength + " " + this.selectedItem.length + " " + "ตัว";
    console.log(this.selectedItemLength);
    console.log(this.selectedItemTotal);
    if (this.selectedItem.length > 0) {
      // this.common.presentLoading();
      this.sensors_data_last = this.selectedItem;
      this.selectedItemTotal = [this.selectedItem.length];
      console.log(this.sensors_data_last);

      for (let i in this.selectedItem) {
        this.selectedItemTotal[i] = {
          selected: this.selectedItem[i].mac_id,
          user_id: this.userPostData.user_id,
          token: this.userPostData.token
        };

        console.log(this.selectedItemTotal);

        this.sensorsApiProvider
          .postData(this.selectedItemTotal[i], "lastDataRuuvitag")
          .then(
            result => {
              this.resposeLastData = result;
              console.log(result);

              if (this.resposeLastData.sensorLastData) {
                
                // this.common.closeLoading();
                this.sensors_data_last[i] = this.resposeLastData.sensorLastData[0];
                this.time_Stamp[i] = this.sensors_data_last[i].date.split(" ", 2);
                this.set_date_last_sensor[i] = this.time_Stamp[i][0].split("-", 3);
                this.set_year_last_sensor[i] = this.set_date_last_sensor[i][0];
                this.set_month_last_sensor[i] = this.set_date_last_sensor[i][1];
                this.set_day_last_sensor[i] = this.set_date_last_sensor[i][2];
                this.set_time_last_sensor[i] = this.time_Stamp[i][1];
                console.log(this.time_Stamp[i]);
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
  }
  getLastDataSensors() {
    
    this.slides.slideTo(0, 500);
    
    this.selectedItemLength = "เเสดง Ruuvitag จำนวน";
    this.selectedItemLength =
      this.selectedItemLength + " " + this.selectedItem.length + " " + "ตัว";
    console.log(this.selectedItemLength);
    console.log(this.selectedItemTotal);
    if (this.selectedItem.length > 0) {
      // this.common.presentLoading();
      // this.sensors_data_last = this.selectedItem;
      this.sensors_data_last = [this.selectedItem.length];
      this.selectedItemTotal = [this.selectedItem.length];
      console.log(this.sensors_data_last);

      for (let i in this.selectedItem) {
        this.selectedItemTotal[i] = {
          selected: this.selectedItem[i],
          user_id: this.userPostData.user_id,
          token: this.userPostData.token
        };

        console.log(this.selectedItemTotal);

        this.sensorsApiProvider
          .postData(this.selectedItemTotal[i], "lastDataRuuvitag")
          .then(
            result => {
              this.resposeLastData = result;
              console.log(result);

              if (this.resposeLastData.sensorLastData) {
                // this.common.closeLoading();
                this.sensors_data_last[
                  i
                ] = this.resposeLastData.sensorLastData[0];
                console.log(this.sensors_data_last[i]);
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
  }

  getRefreshLastDataSensors() {
    // this.selectedItemLength = "เเสดง Ruuvitag จำนวน";
    // this.selectedItemLength =
    //   this.selectedItemLength + " " + this.selectedItem.length + " " + "ตัว";
    console.log(this.selectedItemLength);
    console.log(this.selectedItemTotal);
    if (this.selectedItem.length > 0) {
      // this.common.presentLoading();
      // this.sensors_data_last = this.selectedItem;
      this.sensors_data_last = [this.selectedItem.length];
      this.selectedItemTotal = [this.selectedItem.length];
      console.log(this.sensors_data_last);

      for (let i in this.selectedItem) {
        this.selectedItemTotal[i] = {
          selected: this.selectedItem[i],
          user_id: this.userPostData.user_id,
          token: this.userPostData.token
        };

        console.log(this.selectedItemTotal);

        this.sensorsApiProvider
          .postData(this.selectedItemTotal[i], "lastDataRuuvitag")
          .then(
            result => {
              this.resposeLastData = result;
              console.log(result);

              if (this.resposeLastData.sensorLastData) {
                // this.common.closeLoading();
                this.sensors_data_last[
                  i
                ] = this.resposeLastData.sensorLastData[0];
                console.log(this.sensors_data_last[i]);
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
  }

  openGraphsHome(device_id, device_mac, device_name, device_description) {
    this.navCtrl.push(GraphHomePage, {
      data: device_id,
      data2: device_mac,
      data3: device_name,
      data4: device_description
    });
  }

  openNotificationsHome(
    device_id,
    device_mac,
    device_name,
    device_description
  ) {
    this.navCtrl.push(NotificationHomePage, {
      data: device_id,
      data2: device_mac,
      data3: device_name,
      data4: device_description
    });
  }
  getDevice() {
    // this.common.presentLoading();
    this.sensorsApiProvider.postData(this.userPostData, "device").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.deviceData) {
          // this.common.closeLoading();
          this.dataSet = this.resposeData.deviceData;
          this.count_dataSet = this.dataSet.length;
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
      this.getMacSelectHome();
    });
    addMacModal.present({
      ev: myEvent
    });
  }


  slideChanged() {
    //this.slides.slidePrev(0);
    this.currentIndex = this.slides.getActiveIndex();
    let endIndex = this.slides.isEnd()
    console.log("Current index is", this.currentIndex);
  }

  images = [
    { title: "Home", image: "assets/imgs/sunset_background.jpg" },
    { title: "Graphs", image: "assets/imgs/sunset_background.jpg" },
    { title: "Contact", image: "assets/imgs/maple_background.jpg" }
  ];
}
