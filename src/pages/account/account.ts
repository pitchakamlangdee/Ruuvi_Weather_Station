import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { WelcomePage } from "../welcome/welcome";
import { SensorsApiProvider } from "../../providers/sensors-api/sensors-api";

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
  public dataSet : any;
  userPostData = { user_id: "", token: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public sensorsApiProvider: SensorsApiProvider
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.getFeed();
  }

  getFeed() {
    this.sensorsApiProvider.postData(this.userPostData, "feed").then(
      result => {
        this.resposeData = result;
        if(this.resposeData.feedData){
        this.dataSet = this.resposeData.feedData;
        console.log(this.dataSet);
        }
        else{
          console.log("No access");
        }
      },
      (err) => {
        //Connection failed message
      }
    );
  }

  converTime(time){
    let a = new Date(time*1000);
    return a ;
  }

  backToWelcome() {
    this.navCtrl.push(WelcomePage);
  }
  logout() {
    //API Token LOgout
    // const root = this.app.getRootNav();
    // root.popToRoot();
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }
}
