import { ActionSheetController } from '@ionic/angular';
import { CommonNativePluginsService } from './../../utility/common-native-plugins.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {

  constructor(public router: Router,public plugin:CommonNativePluginsService,public actionCtrl:ActionSheetController) { }

  ngOnInit() {
  }
  // async image(){
  //   const actionSheet=await this.actionCtrl.create({
  //     header: 'Chooser',
  //     buttons: [{
  //       text: 'Camera',
  //       icon: 'camera',
  //       handler: async () => {
  //         let imageResult=await this.plugin.takeImage(1);
  //         console.log(imageResult,'imageResult')
  //         return true;
  //         // await this.getDocs(docIndex, remove, index, true);
  //       }
  //     }, {
  //       text: 'Gallery',
  //       icon: 'image',
  //       handler: async() => {
  //         let imageResult=await this.plugin.takeImage(0);
  //         console.log(imageResult,'imageResult gallery');
  //         return true;
  //         // this.getDocs(docIndex, remove, index, false);
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {

  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  newApplication(){
    this.router.navigate(['/newapplication']);

  }

  prospectiveLead(){
    this.router.navigate(['/prospectivelead']);

  }
  existingApplication(){
    this.router.navigate(['/existapp']);

  }


  openMasterUpdate(){
    this.router.navigate(['/masterupdate']);

  }
  openReceivedApplication(){
    this.router.navigate(['/receivedapplication']);
    // this.router.navigate(['/queryinbox']);

  }



}
