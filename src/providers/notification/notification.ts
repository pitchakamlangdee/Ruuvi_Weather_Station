import { SensorsApiProvider } from "../sensors-api/sensors-api";
import { Injectable } from "@angular/core";
import { LocalNotifications } from "@ionic-native/local-notifications";
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  public dataNotification: any;
  public userDetails: any;
  public resposeData: any;
  public resposeLastData: any;
  public sensors_data_last: any;
  public sensors_check_data_last: any;
  public Interval: any;
  count: number = 0;
  userPostData = {
    user_id: "",
    token: ""
    // device_mac: "",
    // device_id: "",
    // device_name: "",
    // device_description: "",
    // notification_id: "",
    // notification_status: ""
  };
  constructor(
    public sensorsApiProvider: SensorsApiProvider,
    private localNotifications: LocalNotifications
  ) {
    this.setIntervalNotification();
  }

  setIntervalNotification() {
    if (localStorage.getItem("userData")) {
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;
      this.getLastDataSensors();
      this.Interval = setInterval(() => {
        this.getNotification();
      }, 12000);
    } else {
      clearInterval(this.Interval);
      console.log("no userData");
    }
  } //end setIntervalNotification

  getNotification() {
    // this.common.presentLoading();
    this.sensorsApiProvider
      .postData(this.userPostData, "notificationProvider")
      .then(
        result => {
          this.resposeData = result;
          if (this.resposeData.notificationData) {
            // this.common.closeLoading();
            this.dataNotification = this.resposeData.notificationData;
            // console.log(this.dataNotification);
            console.log(this.dataNotification);
            this.getCheckLastDataSensors();
          } else {
            clearInterval(this.Interval);
            console.log("No Notification On");
          }
        },
        err => {
          //Connection failed message
        }
      );
  }

  getCheckLastDataSensors() {
    console.log(this.sensors_data_last);
    this.sensorsApiProvider
      .postData(this.userPostData, "lastDataRuuvitagProvider")
      .then(
        result => {
          this.resposeLastData = result;
          console.log(result);

          if (this.resposeLastData.sensorLastDataProvider) {
            // this.common.closeLoading();
            this.sensors_check_data_last = this.resposeLastData.sensorLastDataProvider;
            this.check();
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
    // this.check();
  }

  check() {
    let check: boolean;
    check = false;
    for (let a in this.sensors_check_data_last) {
      if (
        this.sensors_check_data_last[a].date > this.sensors_data_last[a].date
      ) {
        check = true;
        console.log(check);
      } else {
        console.log("No Data");
        //check = false;
        console.log(check);
      }
    }
    if (check == true) {
      console.log("Check > 0");
      this.getLastDataSensors();
      check = false;
    }
  }

  getLastDataSensors() {
    this.count++;
    console.log(this.count);
    this.sensorsApiProvider
      .postData(this.userPostData, "lastDataRuuvitagProvider")
      .then(
        result => {
          this.resposeLastData = result;
          console.log(result);

          if (this.resposeLastData.sensorLastDataProvider) {
            // this.common.closeLoading();
            this.sensors_data_last = this.resposeLastData.sensorLastDataProvider;
            this.addNotification();
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
  }

  // getCheckLastDataSensors() {
  //   console.log(this.sensors_data_last);
  //   this.sensorsApiProvider
  //     .postData(this.userPostData, "lastDataRuuvitagProvider")
  //     .then(
  //       result => {
  //         this.resposeLastData = result;
  //         console.log(result);

  //         if (this.resposeLastData.sensorLastDataProvider) {
  //           // this.common.closeLoading();
  //           this.sensors_check_data_last = this.resposeLastData.sensorLastDataProvider;
  //         } else {
  //           console.log("No access");
  //         }
  //       },
  //       err => {
  //         //Connection failed message
  //       }
  //     );
  //   this.check();
  // }

  // check() {
  //   let check: boolean;
  //   check = false;
  //   for (let a in this.sensors_check_data_last) {
  //     if (
  //       this.sensors_check_data_last[a].date == this.sensors_data_last[a].date
  //     ) {
  //       check = true;
  //       console.log(check);
  //     } else {
  //       console.log("No Data");
  //       //check = false;
  //       console.log(check);
  //     }
  //   }
  //   if (check == true) {
  //     localStorage.setItem(
  //       "checkSensorsDataLast",
  //       JSON.stringify(this.sensors_check_data_last)
  //     );
  //     console.log("Check > 0");
  //     this.sensors_check_data_last = [];
  //     this.sensors_data_last = [];
  //     this.getLastDataSensors();
  //     check = false;
  //   }
  // }

  async addNotification() {
    let id_localNotifications = 1;
    for (let i in this.dataNotification) {
      if (
        this.dataNotification[i].notification_weather == "อุณหภูมิ" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        console.log("ABCCCCCCC");
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].temperature) >
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนอุณหภูมิ " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "อุณหภูมิตอนนี้มากกว่า " +
                  this.dataNotification[i].notification_value +
                  " °C เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "อุณหภูมิ" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].temperature) <
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนอุณหภูมิ " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "อุณหภูมิตอนนี้น้อยกว่า " +
                  this.dataNotification[i].notification_value +
                  " °C เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความชื้น" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].humidity) >
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนความชื้น " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "ความชื้นตอนนี้มากกว่า " +
                  this.dataNotification[i].notification_value +
                  " % เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความชื้น" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].humidity) <
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนความชื้น " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "ความชื้นตอนนี้น้อยกว่า " +
                  this.dataNotification[i].notification_value +
                  " % เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความดันอากาศ" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].pressure) >
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนความดันอากาศ " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "ความดันอากาศตอนนี้มากกว่า " +
                  this.dataNotification[i].notification_value +
                  " hPa เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความดันอากาศ" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (
            this.sensors_data_last[j].device_mac ==
            this.dataNotification[i].device_mac
          ) {
            if (
              parseFloat(this.sensors_data_last[j].pressure) <
              parseFloat(this.dataNotification[i].notification_value)
            ) {
              this.localNotifications.schedule({
                id: id_localNotifications,
                title:
                  "เเจ้งเตือนความดันอากาศ " +
                  this.dataNotification[i].device_name +
                  ".",
                text:
                  "ความดันอากาศตอนนี้น้อยกว่า " +
                  this.dataNotification[i].notification_value +
                  " hPa เเล้ว !!"
              });
              id_localNotifications++;
            }
          }
        }
      }
    }
  }
}
