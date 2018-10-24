import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
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
      console.log(res);
      let alert = this.alerController.create({
        title: 'handleNotificationOpened',
        message: JSON.stringify(res),
        buttons: ['Dismiss']
      });
      alert.present();
    });
 
    this.oneSignal.endInit();
  }

setupOneSignal() {
  if (this.platform.is('android')) {

    this.oneSignal.startInit("2c1d09b9-328c-4ad6-9547-6e59d0d479f3", "628728029769")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
    // this.oneSignal.handleNotificationOpened(this.notificationOpenedCallback);
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      let alert = this.alerController.create({
        title: 'Message',
        message: JSON.stringify(jsonData),
        buttons: ['Dismiss']
      });
      alert.present();
    };
  
    // window["plugins"].OneSignal
    //   .startInit("2c1d09b9-328c-4ad6-9547-6e59d0d479f3", "628728029769")
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .endInit();
  }
}

//   pushSetup() {
//     const options: PushOptions = {
//       android: {
//         senderID: '628728029769'
//       },
//       ios: {
//         alert: 'true',
//         badge: true,
//         sound: 'false'
//       }
//     }

//     const pushObject: PushObject = this.push.init(options);


// pushObject.on('notification').subscribe((notification: any) => {
//   console.log('Received a notification', notification)
//   let alert = this.alerController.create({
//     title: 'Message',
//     message: JSON.stringify(notification),
//     buttons: ['Dismiss']
//   });
//   alert.present();
// });

// pushObject.on('registration').subscribe((registration: any) => {
//   console.log('Device registered', registration)
//   let alert = this.alerController.create({
//     title: 'Message',
//     message: JSON.stringify(registration),
//     buttons: ['Dismiss']
//   });
//   alert.present();
// });

// pushObject.on('error').subscribe(error => {
//   console.error('Error with Push plugin', error)
//   let alert = this.alerController.create({
//     title: 'Message',
//     message: JSON.stringify(error),
//     buttons: ['Dismiss']
//   });
//   alert.present();
// });
//   }
}

