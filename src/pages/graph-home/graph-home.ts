import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import chartJs from "chart.js";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";
import * as moment from "moment";
/**
 * Generated class for the GraphHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-graph-home",
  templateUrl: "graph-home.html"
})
export class GraphHomePage {
  @ViewChild("barCanvas")
  barCanvas;
  @ViewChild("lineCanvas")
  lineCanvas;
  @ViewChild("pieCanvas")
  pieCanvas;
  @ViewChild("doughnutCanvas")
  doughnutCanvas;

  barChart: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;

  mac_address = [];
  Name_Ruuvitag = [];
  temperature = [];
  pressure = [];
  time_Stamp = [];
  time = [];
  date = [];
  humidity = [];
  average_temperature: any = 0;
  sum_temperature: any = 0;
  average_humidity: any = 0;
  sum_humidity: any = 0;
  average_pressure: any = 0;
  sum_pressure: any = 0;
  get_moment: any;
  show_graph: boolean;
  set_max_date = [];
  set_graph_date = [];
  day_or_hour : number;
  hour_1 : number = 1;
  hour_3 : number = 3;
  hour_12: number = 12;
  hour_24 : number = 24;

  public resposeData: any;
  public dataGraph = [];

  public userDetails: any;
  userPostData = {
    user_id: "",
    token: "",
    device_mac: "",
    device_id: "",
    device_name: "",
    device_description: "",
    notification_id: "",
    my_date: "",
    my_hour: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensorsApiProvider: SensorsApiProvider
  ) {
    
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.device_id = this.navParams.get("data");
    this.userPostData.device_mac = this.navParams.get("data2");
    this.userPostData.device_name = this.navParams.get("data3");
    this.userPostData.device_description = this.navParams.get("data4");
    // this.userPostData.my_date = new Date().toISOString();
    // this.userPostData.my_date= moment().format();
    this.get_moment = moment().format().split("T", 2);
    this.userPostData.my_date = this.get_moment[0];
    this.set_max_date = this.userPostData.my_date.split("-", 3);
    this.set_graph_date = this.userPostData.my_date.split("-", 3);
    console.log(this.set_max_date);
    // this.userPostData.my_date = moment().format("DD-MM-YYYY");
    this.getGraphDataDay();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GraphHomePage");
  }
  getGraphDatahour(hour) {
    this.userPostData.my_hour = hour ;
    console.log(this.userPostData.my_hour);
    this.day_or_hour = 1;
    this.mac_address = [];
          this.Name_Ruuvitag = [];
          this.temperature = [];
          this.pressure = [];
          this.time_Stamp = [];
          this.date = [];
          this.time = [];
          this.humidity = [];
          this.sum_temperature = 0;
          this.sum_humidity = 0;
          this.sum_pressure = 0;
          this.average_temperature = 0;
          this.average_humidity = 0;
          this.average_pressure = 0;
    // this.set_graph_date = this.userPostData.my_date.split("-", 3);
    // console.log(this.userPostData.my_date);

    let count: number = 0;
    // console.log(this.userPostData.my_date);
    this.sensorsApiProvider
      .postData(this.userPostData, "graphDataHour")
      .then(result => {
        console.log(result);

        this.resposeData = result;
        if (this.resposeData.graphData) {
          this.show_graph = true;
          this.dataGraph = this.resposeData.graphData;
          for (let i in this.dataGraph) {
            this.mac_address[i] = this.dataGraph[i].mac_id;
            this.Name_Ruuvitag[i] = this.dataGraph[i].Name_Ruuvitag;
            this.temperature[i] = this.dataGraph[i].temperature;
            this.pressure[i] = this.dataGraph[i].pressure;
            this.time_Stamp[i] = this.dataGraph[i].date.split(" ", 2);
            this.date[i] = this.time_Stamp[i][0];
            this.time[i] = this.time_Stamp[i][1];
            this.humidity[i] = this.dataGraph[i].humidity;
            this.sum_temperature += parseFloat(this.dataGraph[i].temperature);
            this.sum_humidity += parseFloat(this.dataGraph[i].humidity);
            this.sum_pressure += parseFloat(this.dataGraph[i].pressure);

            count++;
          }
          if (
            this.sum_temperature != undefined &&
            this.sum_humidity != undefined &&
            this.sum_pressure != undefined
          ) {
            this.average_temperature = (this.sum_temperature / count).toFixed(
              2
            );
            this.average_humidity = (this.sum_humidity / count).toFixed(2);
            this.average_pressure = (this.sum_pressure / count).toFixed(2);
          }
          console.log(this.average_temperature);
          console.log(this.average_humidity);
          //console.log(time);
          this.getLineChart();
          this.getBarChart();
        } else if (this.resposeData.graphData == "") {
          this.show_graph = false;
          console.log("No access");
          this.mac_address = [];
          this.Name_Ruuvitag = [];
          this.temperature = [];
          this.pressure = [];
          this.time_Stamp = [];
          this.date = [];
          this.time = [];
          this.humidity = [];
          this.sum_temperature = 0;
          this.sum_humidity = 0;
          this.sum_pressure = 0;
          this.average_temperature = 0;
          this.average_humidity = 0;
          this.average_pressure = 0;
          this.getLineChart();
          this.getBarChart();
        }
      });
  }
  getGraphDataDay() {
    this.day_or_hour = 0;
    this.mac_address = [];
          this.Name_Ruuvitag = [];
          this.temperature = [];
          this.pressure = [];
          this.time_Stamp = [];
          this.date = [];
          this.time = [];
          this.humidity = [];
          this.sum_temperature = 0;
          this.sum_humidity = 0;
          this.sum_pressure = 0;
          this.average_temperature = 0;
          this.average_humidity = 0;
          this.average_pressure = 0;
    this.set_graph_date = this.userPostData.my_date.split("-", 3);
    console.log(this.userPostData.my_date);

    let count: number = 0;
    console.log(this.userPostData.my_date);
    this.sensorsApiProvider
      .postData(this.userPostData, "graphDataDay")
      .then(result => {
        console.log(result);

        this.resposeData = result;
        if (this.resposeData.graphData) {
          this.show_graph = true;
          console.log(this.set_max_date);
          this.dataGraph = this.resposeData.graphData;
          for (let i in this.dataGraph) {
            this.mac_address[i] = this.dataGraph[i].mac_id;
            this.Name_Ruuvitag[i] = this.dataGraph[i].Name_Ruuvitag;
            this.temperature[i] = this.dataGraph[i].temperature;
            this.pressure[i] = this.dataGraph[i].pressure;
            this.time_Stamp[i] = this.dataGraph[i].date.split(" ", 2);
            this.date[i] = this.time_Stamp[i][0];
            this.time[i] = this.time_Stamp[i][1];
            this.humidity[i] = this.dataGraph[i].humidity;
            this.sum_temperature += parseFloat(this.dataGraph[i].temperature);
            this.sum_humidity += parseFloat(this.dataGraph[i].humidity);
            this.sum_pressure += parseFloat(this.dataGraph[i].pressure);

            count++;
          }
          if (
            this.sum_temperature != undefined &&
            this.sum_humidity != undefined &&
            this.sum_pressure != undefined
          ) {
            this.average_temperature = (this.sum_temperature / count).toFixed(
              2
            );
            this.average_humidity = (this.sum_humidity / count).toFixed(2);
            this.average_pressure = (this.sum_pressure / count).toFixed(2);
          }
          console.log(this.average_temperature);
          console.log(this.average_humidity);
          //console.log(time);
          this.getLineChart();
          this.getBarChart();
        } else if (this.resposeData.graphData == "") {
          this.show_graph = false;
          console.log("No access");
          this.mac_address = [];
          this.Name_Ruuvitag = [];
          this.temperature = [];
          this.pressure = [];
          this.time_Stamp = [];
          this.date = [];
          this.time = [];
          this.humidity = [];
          this.sum_temperature = 0;
          this.sum_humidity = 0;
          this.sum_pressure = 0;
          this.average_temperature = 0;
          this.average_humidity = 0;
          this.average_pressure = 0;
          this.getLineChart();
          this.getBarChart();
        }
      });
  }

  /////////////////////////////////////start function graph//////////////////////////////
  ngAfterViewInit() {
    setTimeout(() => {
      this.lineChart = this.getLineChart();
      this.barChart = this.getBarChart();
    }, 150);
    // setTimeout(() => {
    //   this.pieChart = this.getPieChart();
    //   this.doughnutChart = this.getDoughnutChart();
    // }, 250);
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    });
  }
  getLineChart() {
    // if (this.show_graph == true) {
      const data = {
        labels: this.time,
        datasets: [
          {
            label: "อุณหภูมิ",
            fill: true,
            LineTension: 0.1,
            // backgroundColor: "rgb(254, 0, 0)",
            borderColor: "rgb(254, 0, 0)",
            borderCapStyle: "butt",
            borderJoinStyle: "mitter",
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.temperature,
            scanGaps: false
          },
          {
            label: "ความชื้น",
            fill: true,
            LineTension: 0.1,
            // backgroundColor: "rgb(76, 163, 224)",
            borderColor: "rgb(76, 163, 224)",
            borderCapStyle: "butt",
            borderJoinStyle: "mitter",
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.humidity,
            scanGaps: false
          },
          {
            label: "ความดันอากาศ",
            fill: true,
            LineTension: 0.1,
            // backgroundColor: "rgb(76, 214, 103)",
            borderColor: "rgb(76, 214, 103)",
            borderCapStyle: "butt",
            borderJoinStyle: "mitter",
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.pressure,
            scanGaps: false
          }
        ]
      };
      return this.getChart(this.lineCanvas.nativeElement, "line", data);
    // } else {
    //   const no_data = "";
    //   return this.getChart(this.lineCanvas.nativeElement, "line", no_data);
    //   console.log("no graph");
    // }
  }
  getBarChart() {
    // if (this.show_graph == true) {
      const data = {
        labels: ["", "อุณหภูมิ", "ความชื้น", "ความดันอากาศ"],
        datasets: [
          {
            label: ["ค่าเฉลี่ยสภาพอากาศ"],
            data: [
              "",
              this.average_temperature,
              this.average_humidity,
              this.average_pressure
            ],
            backgroundColor: [
              "rgb(255, 255, 255)",
              "rgb(254, 0, 0)",
              "rgb(76, 163, 224)",
              "rgb(76, 214, 103)",
              "rgb(60, 0, 70)"
            ],
            borderWidth: 5 
            ,
            borderColor: [
              "rgb(254, 0, 0)",
              "rgb(254, 0, 0)",
              "rgb(76, 163, 224)",
              "rgb(76, 214, 103)",
              "rgb(60, 0, 70)"
            ]
          }
        ]
      };
      const options = {
        scales: {
          yAxes: [
            {
              tickes: {
                beginAtZero: true
              }
            }
          ]
        }
      };
      return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
    // } else {
    //   console.log("no graph");
    // }
  }
}
