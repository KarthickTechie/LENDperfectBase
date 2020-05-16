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
  @ViewChild('mySlider', { static: true }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  slides: any;



  imageResponse: any = [];
  modal:any;
  profPic: any;
  profImg: boolean = false;
 

  constructor(private camera: Camera,public docChooser :DocChooser,public actionSheetController: ActionSheetController,public modalController: ModalController) {
    this.userdetail = 'personal'
  }

  ngOnInit() {
    this.slides = [
      { id: 'personal' },
      { id: 'income' },
      { id: 'kyc' },
      { id: 'loan' }
    ];

  }

  segmentChanged(event: any) {
    console.log("Event", event);
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



}
