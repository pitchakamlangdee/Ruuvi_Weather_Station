import { Component, ViewChild } from "@angular/core";
import { NavController, Slides } from "ionic-angular";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import { CommonProvider } from "../../providers/common/common";

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
  sensors_data_last :any;
  check_sensors_data_last: any;
  selectedItem : any;
  selectedItemTotal = [];

  public userDetails: any;
  public resposeDataMac: any;
  public resposeLastData : any;
  public dataMac = [];
  userPostData = { user_id: "", token: "", device_mac: "", device_id: "" };
  //numbers = ["a", "b", "c", "d", "e"];

  constructor(
    public navCtrl: NavController,
    public sensorsApiProvider: SensorsApiProvider,
    public common: CommonProvider
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
    // }, 15000);
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
        }
        this.selectedItem = this.dataMac;
        // for (let a in this.dataMac) {
        //   this.selectedItem[a] = this.dataMac[a].mac_id;
        // }
        console.log(this.selectedItem);

        this.getFirstLastDataSensors();
      },
      err => {
        //Connection failed message
      }
    );
  }
  getFirstLastDataSensors() {
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

  getLastDataSensors() {
    console.log(this.selectedItemTotal);
    if (this.selectedItem.length > 0) {
      // this.common.presentLoading();
      this.sensors_data_last = this.selectedItem;
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
                this.sensors_data_last[i] = this.resposeLastData.sensorLastData[0];
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

  // setDataToLocal(){
  //   localStorage.setItem("sensorsDataLast", JSON.stringify(this.sensors_data_last));
  // }

  getCheckLastDataSensors() {
    console.log(this.selectedItem);
    if (this.selectedItem.length > 0) {
      this.check_sensors_data_last = [this.selectedItem.length];
      //console.log(this.check_sensors_data_last);

      for (let i in this.selectedItem) {
        this.sensorsApiProvider
          .getLastDataSensors(this.selectedItem[i])
          .then(data_last => {
            this.check_sensors_data_last[i] = data_last[0];

            //console.log(this.check_sensors_data_last[i]);
            this.check();
          });
      }
    }
  }

  check() {
    let check: boolean;
    check = false;
    for (let a in this.check_sensors_data_last) {
      // console.log(this.check_sensors_data_last[a].Time_Stamp );
      // console.log(this.sensors_data_last[a].Time_Stamp );
      if (
        this.check_sensors_data_last[a].Time_Stamp >
        this.sensors_data_last[a].Time_Stamp
      ) {
        check = true;
        console.log(check);
      } else {
        console.log("No Data");
        //check = false;
      }
    }
    if (check == true) {
      localStorage.setItem(
        "checkSensorsDataLast",
        JSON.stringify(this.check_sensors_data_last)
      );
      console.log("Check > 0");
      this.check_sensors_data_last = [];
      this.sensors_data_last = [];
      this.getLastDataSensors();
      check = false;
    }
  }

  // slideChanged() {
  //   //this.slides.slidePrev(0);
  //   let currentIndex = this.slides.getActiveIndex();

  //   console.log("Current index is", currentIndex);
  // }

  images = [
    { title: "Home", image: "assets/imgs/maple_background.jpg" },
    { title: "Graphs", image: "assets/imgs/sunset_background.jpg" },
    { title: "Contact", image: "assets/imgs/sunset_background.jpg" }
  ];
}
