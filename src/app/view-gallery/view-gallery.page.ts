import { GlobalService } from './../global/global.service';
import { Subscription } from 'rxjs';
import { DocUploadService } from './../global/doc-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { IonSlides, ActionSheetController, AlertController } from '@ionic/angular';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.page.html',
  styleUrls: ['./view-gallery.page.scss'],
})
export class ViewGalleryPage implements OnInit, OnDestroy {
  @ViewChild('slider', { static: true }) slider: IonSlides;
  currentSlideIndex = 0;
  imageArray: any[];
  dList: any[];
  parentIndex: number;
  listArraySub: Subscription;
  imgTotal: number;
  enableAdd = true;
  constructor(public router: Router, public docUpload: DocUploadService, public loc: Location, public acCtrl: ActionSheetController, public globalService: GlobalService) { }

  async ngOnInit() {
    this.listArraySub = this.docUpload.galleryObservable.subscribe(async val => {
      this.dList = val.listArray;
      if (val.listArray[0].name == "Signature") {
        this.enableAdd = false;
      }
      this.parentIndex = val.parentIndex;

      this.imgTotal = val.listArray.length;
      let len = await this.slider.length() - 1;
      if (len == 0) {
        this.currentSlideIndex = null;
        await this.slider.update()
      } else {
        this.currentSlideIndex = await this.slider.getActiveIndex() + 1;
      }
    })
  }
  async onSlideChanged(slide) {
    this.currentSlideIndex = await this.slider.getActiveIndex() + 1;
  }


  async delete(parentIndex, childIndex) {
    if (this.dList.length > 0) {
      let alert = await new AlertController().create({
        header: "Alert",
        message: "Are you sure want to delete?",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.docUpload.galleryDelete(parentIndex, childIndex);

            }
          }
        ]
      });
      await alert.present();
    } else {
      this.globalService.presentAlert("Alert", "Nothing to delete!")
    }


  }
  onClick() {
    this.loc.back();
  }

  async addActionSheet(parentIndex, childIndex) {
    const actionSheet = await this.acCtrl.create({
      header: 'Chooser',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: async () => {
          this.docUpload.galleryDelete(parentIndex, childIndex, true, true);
          // await this.getDocs(docIndex, remove, index, true);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.docUpload.galleryDelete(parentIndex, childIndex, true, false);
          // this.getDocs(docIndex, remove, index, false);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();


  }

  trackByName(index: number, item) {
    //console.log(item, "trackbyyyyyyy gallery page");
    return item.name;

  }


  ngOnDestroy() {
    this.listArraySub.unsubscribe();
  }

}