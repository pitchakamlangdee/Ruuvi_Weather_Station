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
  sensors_data_last: any;
  check_sensors_data_last : any;
  selectedItem = [];

  public userDetails: any;
  public resposeDataMac: any;
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
        if (this.resposeDataMac.macData) {
          // this.common.closeLoading();
          this.dataMac = this.resposeDataMac.macData;

          console.log(this.dataMac);
        } else {
          console.log("No access");
        }
        for(let a in this.dataMac){
        this.selectedItem[a] = this.dataMac[a].mac_id;
        }
        console.log(this.selectedItem);
        
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

  check(){
    let check : boolean ;
    check = false;
    for(let a in this.check_sensors_data_last){
      // console.log(this.check_sensors_data_last[a].Time_Stamp );
      // console.log(this.sensors_data_last[a].Time_Stamp );
      if(this.check_sensors_data_last[a].Time_Stamp > this.sensors_data_last[a].Time_Stamp){
          check = true;
          console.log(check);
          
        }else{
          console.log("No Data");
          //check = false;
        }
      }
    if(check == true){
      localStorage.setItem("checkSensorsDataLast", JSON.stringify(this.check_sensors_data_last));
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
