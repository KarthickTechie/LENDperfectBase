import { GlobalService } from './../../global/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DocChooser } from 'widget/docChooser';
import { CropDocComponent } from 'src/app/Components/crop-doc/crop-doc.component';



@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.page.html',
  styleUrls: ['./app-dashboard.page.scss'],
})
export class AppDashboardPage implements OnInit {

  userdetail: string;
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;
  datainsert: any;
  slides: any;



  imageResponse: any = [];
  modal: any;
  profPic: any;
  profImg: boolean = false;
  value = new Subject<any>();
  showLoan: boolean = true;
  applicantType: any;
  personCheck: boolean = false;
  incomeCheck: boolean = false;
  kycCheck: boolean = false;
  loanCheck: boolean = false;
  documentCheck: boolean = false;
  dataInsertion : boolean;
  applicantTitle = "New Applicant";

  constructor(private camera: Camera, public docChooser: DocChooser, public actionSheetController: ActionSheetController,
    public modalController: ModalController, public activateRoute: ActivatedRoute, public global: GlobalService) {
    this.userdetail = 'personal'
  }

  ngOnInit() {
    // this.applicantType = this.activateRoute.snapshot.queryParamMap.get("applicantType");
    if(this.activateRoute.snapshot.queryParamMap.get("dataInsert")){
    this.dataInsertion = true;
    }else{
      this.dataInsertion = false;
    }
    this.profPic = this.global.getProfileImage();
    if (this.profPic) {
      this.profImg = true;
    } else {
      this.profImg = false;
    }
    if (this.global.getApplicantType() == "C" || this.global.getApplicantType() == "G") {
      this.showLoan = false;
      this.slides = [
        { id: 'personal' },
        { id: 'income' },
        { id: 'kyc' },
        { id: 'document' }
      ];
    } else {
      this.showLoan = true;
      this.slides = [
        { id: 'personal' },
        { id: 'income' },
        { id: 'kyc' },
        { id: 'loan' },
        { id: 'document' }
      ];
    }

    if(this.global.getApplicantType() == "A"){
      this.applicantTitle = "New Applicant";
    }else if(this.global.getApplicantType() == "C"){
      this.applicantTitle = " Co-Applicant";
    }else{
      this.applicantTitle = "Gurantor";
    }

  }

  segmentChanged(event: any) {
    // ("Event", event);
  }

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex(slide => {
      return slide.id === segmentButton.detail.value;
    });
    this.slider.slideTo(selectedIndex);
  }


  async onSlideChanged(slider) {
    let cSlide = await this.slider.getActiveIndex();
    const currentSlide = await this.slides[cSlide];
    this.userdetail = currentSlide.id;
    this.value.next(this.userdetail);


    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
  takepic() { }

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
            this.profImg = true;
          }
        }]
      });
      await actionSheet.present();
    }
    else {
      this.modal = await this.modalController.create({
        component: CropDocComponent,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'doc': {
            doc: this.profPic,
            view: true
          }
        }, showBackdrop: true, backdropDismiss: true
      });

      await this.modal.present();
      let updateImg = await this.modal.onDidDismiss();
      if (updateImg.data) {
        if (updateImg.data.updateProfileIMAGE) {
          this.profImg = false;
          this.presentActionSheet();
        }

      }
    }
  }

  // profile pic upload
  getProfilePic(srcTyp) {
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
      this.global.setProfileImage(docs);
      this.profImg = true;
    }).catch(error => {
      console.log(error);
    })
  }

  showSubmittedTick(data) {
    let value = data.value;
    let slide = data.slide;
    switch (value) {
      case "personTick":
        this.personCheck = true;
        if (slide == "Y") {
          this.slider.slideTo(1);
        }
        break;
      case "incomeTick":
        this.incomeCheck = true;
        if (slide == "Y") {
          this.slider.slideTo(2);
        }
        break;
      case "kycTick":
        this.kycCheck = true;
        if (slide == "Y" && this.global.getApplicantType() == "A") {
          this.slider.slideTo(3);
        }
        else if (slide == "N") {
          this.slider.slideTo(0);
        }
        else {
          this.slider.slideTo(4);
        }
        break;
      case "loanTick":
        this.loanCheck = true;
        if (slide == "Y") {
          this.slider.slideTo(4);
        } else {
          this.slider.slideTo(0);
        }
        break;
      case "documentTick":
        this.documentCheck = true;
        break;

    }
  }

  dataInsertChange(event) {
    this.global.dataInsertForm(this.datainsert);
  }

}
