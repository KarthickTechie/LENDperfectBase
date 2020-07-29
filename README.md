PSB
# HelloAngular
http access
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Document Upload Sample Program

Step-1 : Install the following cordova plugin 

https://github.com/abelabbesnabi/cordova-plugin-image-picker 

Step-2 : Refer the sample code to use the Document upload API that has the following feature's
1. Multiple Document upload , update and delete
2. Crop image
3. Profile picture upload 

In html 

  <div class='docUpload'>
    <ion-card class='docImg' *ngFor="let img of imageResponse">
      <div class='image'><img (click)="Viewimg(img)" src="{{img}}" alt="" /></div>
      <div class='imgFooter'>
        <ion-badge (click)="CropImg(img)"><ion-icon name="create"></ion-icon> Edit</ion-badge>
        <ion-badge (click)="removeDoc(img)"><ion-icon name="trash"></ion-icon> Delete</ion-badge>
      </div>
    </ion-card>
  </div>

in .ts file 


import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {DocChooser}from '../../widget/docChooser';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CropDocComponent } from '../Components/crop-doc/crop-doc.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageResponse: any = [];
 modal:any;
 public profPic: any;
 profImg: boolean = false;
  constructor(private camera: Camera,public docChooser :DocChooser,public actionSheetController: ActionSheetController,public modalController: ModalController) { }

// multiple document upload
    getDocs() {
        let options = {
          maximumImagesCount: 10,
          // width: 200,
          //height: 200,
          quality: 25,
          outputType: 0
        };

        this.docChooser.getDocs(options).then(docs => {
          this.imageResponse = this.imageResponse.concat(docs);
        }) .catch(error => {
          console.log(error);
        })
    }

    async presentActionSheet() {
      if (this.profImg == false) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Chooser',
        buttons: [{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.getProfilePic(1)
          }
        }, {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.getProfilePic(0)
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.profImg = true;
          }
        }]
      });
      await actionSheet.present();
    }
    else{
      this.modal = await this.modalController.create({
        component: CropDocComponent,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'doc': {doc:this.profPic,
          view:true}
        },showBackdrop:true, backdropDismiss: true
      });
      
      await this.modal.present();
      // console.log(await this.modal.onDidDismiss())
      let updateImg = await this.modal.onDidDismiss();
      if(updateImg.data.updateProfileIMAGE){
        this.profImg = false;
        this.presentActionSheet();
      }
    }
    }
  
// profile pic upload
    getProfilePic(srcTyp){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        // targetWidth: 500,
        // targetHeight: 800,
        allowEdit: true,
        sourceType: srcTyp
      }
      
      this.docChooser.getProfilePic(options).then(docs => {
        // this.imageResponse = [];
        // this.imageResponse.push(docs);
        this.profPic = docs;
        this.profImg = true;
      }) .catch(error => {
        console.log(error);
      })
    }

    //to crop img/DOC
    CropImg(img){
      this.docChooser.CropImg(this.imageResponse,img).then(docs => {
        // this.imageResponse = [];
        this.imageResponse=docs;
      }) .catch(error => {
        console.log(error);
      })
    }

    //Remove Documents
    removeDoc(doc){
      this.imageResponse = this.imageResponse.filter(e => e !== doc);
  }

  //view Documents
  async Viewimg(img){
    this.modal = await this.modalController.create({
      component: CropDocComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'doc': {doc:img,
        view:false}
      },showBackdrop:true, backdropDismiss: true
    });
    
    await this.modal.present();
  }


}


