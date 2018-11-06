import { Component } from '@angular/core';
import { OneSignal, OSDisplayType } from '@ionic-native/onesignal';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private platform: Platform,private oneSignal: OneSignal, statusBar: StatusBar, splashScreen: SplashScreen, public alerController: AlertController) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
      // this.pushSetup();
      this.init();
    });
  }


  init() {
    if (this.platform.is('core')) {
      return;
    }
 
    this.oneSignal.inFocusDisplaying(OSDisplayType.Notification);
    this.oneSignal.startInit('2c1d09b9-328c-4ad6-9547-6e59d0d479f3', '628728029769');
    this.oneSignal.handleNotificationReceived().subscribe(res => {
      console.log(res);
      let alert = this.alerController.create({
        title: 'handleNotificationReceived',
        message: JSON.stringify(res),
        buttons: ['Dismiss']
      });
      alert.present();
    });
 
    this.oneSignal.handleNotificationOpened().subscribe(res => {
      let message: string;
      if (res.notification.isAppInFocus) {
        message = 'user open app';
      }
      else if (!res.notification.isAppInFocus) {
        message = 'user open app and receive data';
      }

      console.log(message);
      console.log(res);

      let alert = this.alerController.create({
        title: message,
        message: JSON.stringify(res),
        buttons: ['Dismiss']
      });
      alert.present();
    });
 
    this.oneSignal.endInit();
  }
}

