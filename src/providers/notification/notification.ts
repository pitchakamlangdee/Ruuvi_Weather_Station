import { SensorsApiProvider } from "../sensors-api/sensors-api";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import {
  PhonegapLocalNotification,
  LocalNotificationOptions
} from "@ionic-native/phonegap-local-notification";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  public dataNotification = [];
  public userDetails: any;
  public resposeData: any;
  public resposeLastData: any;
  public sensors_data_last: any;
  public sensors_check_data_last: any;
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
    private platform: Platform,
    private notification: PhonegapLocalNotification
  ) {
    if (localStorage.getItem("userData")) {
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;
    }
  }

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
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
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
          } else {
            console.log("No access");
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
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
    this.check();
  }

  check() {
    let check: boolean;
    check = false;
    for (let a in this.sensors_check_data_last) {
      // console.log(this.check_sensors_data_last[a].Time_Stamp );
      // console.log(this.sensors_data_last[a].Time_Stamp );
      if (
        this.sensors_check_data_last[a].date == this.sensors_data_last[a].date
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
      localStorage.setItem(
        "checkSensorsDataLast",
        JSON.stringify(this.sensors_check_data_last)
      );
      console.log("Check > 0");
      this.sensors_check_data_last = [];
      this.sensors_data_last = [];
      this.getLastDataSensors();
      check = false;
    }
  }

  async addNotification() {
    for (let i in this.dataNotification) {
      if (
        this.dataNotification[i].notification_weather == "อุณหภูมิ" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
                  options
                );

                myNotification.close();
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "อุณหภูมิ" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
                  options
                );

                myNotification.close();
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความชื้น" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
                  options
                );

                myNotification.close();
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความชื้น" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
                  options
                );

                myNotification.close();
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความดันอากาศ" &&
        this.dataNotification[i].notification_operator == "มากกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
                  options
                );

                myNotification.close();
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      } else if (
        this.dataNotification[i].notification_weather == "ความดันอากาศ" &&
        this.dataNotification[i].notification_operator == "น้อยกว่า"
      ) {
        for (let j in this.sensors_data_last) {
          if (this.sensors_data_last[i].temperature > 3) {
            try {
              await this.platform.ready();
              const permission = await this.notification.requestPermission();

              if (permission === "granted") {
                const options: LocalNotificationOptions = {
                  tag: "myNotification",
                  body: this.sensors_data_last,
                  icon: "assets/icon/loudspeaker.png"
                };

                const myNotification = await this.notification.create(
                  this.sensors_data_last,
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
    }
  }
}
