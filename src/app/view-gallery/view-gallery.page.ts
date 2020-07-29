import { GlobalService } from './../global/global.service';
import { Subscription } from 'rxjs';
import { DocUploadService } from './../global/doc-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { IonSlides, ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.page.html',
  styleUrls: ['./view-gallery.page.scss'],
})
export class ViewGalleryPage implements OnInit, OnDestroy {
  @ViewChild('slider', { static: false }) slider: IonSlides;
  currentSlideIndex = 0;
  imageArray: any[];
  dList: any[];
  parentIndex: number;
  listArraySub: Subscription;
  imgTotal: number;
  enableAdd = true;
  profilePic: any;
  showProfile: boolean;
  constructor(public router: Router, public docUpload: DocUploadService, public loc: Location, public acCtrl: ActionSheetController,
    public globalService: GlobalService, public activateRoute: ActivatedRoute, public changeDetect: ChangeDetectorRef, public ngZone: NgZone) {
    this.ngZone.run(() => {
      console.log("ngzone running");
    })

  }

  ngOnInit() {
    this.listArraySub = this.docUpload.galleryObservable.subscribe(async val => {

      if (val.profile) {
        this.showProfile = true;
        this.profilePic = val.listArray[0]
      } else {
        if (val.listArray.length != 0) {
          this.dList = val.listArray;
          if (val.listArray[0].name == "Signature") {
            this.enableAdd = false;
          }
          this.parentIndex = val.parentIndex;

          this.imgTotal = val.listArray.length;
          let len = await this.slider.length();

          console.log(await this.slider.length(), "len");
          console.log(await this.slider.isBeginning(), "begining");
          console.log(await this.slider.length(), "length");
          if (len == 0) {
            this.currentSlideIndex = null;
            await this.slider.update()
          } else {
            this.currentSlideIndex = await this.slider.getActiveIndex() + 1;
          }
        } else {
          this.currentSlideIndex = null;
          await this.slider.update()
        }
      }

    })
  }


  ngAfterViewInit() {

  }

  close() {
    this.router.navigate(['/newapp'], { skipLocationChange: true });
  }

  async onSlideChanged(slide) {
    this.currentSlideIndex = await this.slider.getActiveIndex() + 1;
  }


  test() {

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
    //debugger;
    console.log("image gallery back clicked");
    // this.loc.back();

    this.router.navigate(['/newapp'], { skipLocationChange: true, queryParams: { gallery: this.showProfile ? true : false } });
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

  updateimage() {
    this.globalService.profileUpdate.next({ first: true, update: true });
  }


  ngOnDestroy() {
    this.listArraySub.unsubscribe();
  }

}
