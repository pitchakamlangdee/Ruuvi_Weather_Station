import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, AlertController, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { WelcomePage } from "../pages/welcome/welcome";
// import { TabsPage } from "../pages/tabs/tabs";
import { AccountPage } from "../pages/account/account";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";
import { CommonProvider } from "../../src/providers/common/common";
import { SplitPaneProvider } from "../providers/split-pane/split-pane";
import { NotificationProvider } from "../providers/notification/notification";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;
  rootPage: any = WelcomePage;

  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    public common: CommonProvider,
    public splitPaneProvider: SplitPaneProvider,
    public menu: MenuController,
    public notificationProvider: NotificationProvider
  ) {
    // if (localStorage.getItem("userData")) {
    //   this.notificationProvider.getLastDataSensors();
    //   setInterval(() => {
    //     if (localStorage.getItem("userData")) {
    //     this.notificationProvider.getCheckLastDataSensors();
    //     }
    //   }, 12000);
    // } else { console.log("no Userdata")}

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: "หน้าหลัก", component: HomePage, icon: "home" },
      { title: "สภาพอากาศย้อนหลัง", component: AboutPage, icon: "stats" },
      { title: "บัญชีผู้ใช้", component: AccountPage, icon: "contacts" }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  backToWelcome() {
    // const root = this.app.getRootNav();
    // root.popToRoot();
    this.nav.push(WelcomePage);
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
            this.menu.enable(false);
            setTimeout(() => this.backToWelcome(), 1000);
            setTimeout(() => this.common.closeLoading(), 1000);
            //this.common.closeLoading();
          }
        }
      ]
    });
    alert.present();
  }
}
