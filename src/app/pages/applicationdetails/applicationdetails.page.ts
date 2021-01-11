import { DocumentuploadService } from './../../providers/documentupload.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from './../../providers/global.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent } from '@ionic/angular';


@Component({
  selector: 'app-applicationdetails',
  templateUrl: './applicationdetails.page.html',
  styleUrls: ['./applicationdetails.page.scss'],
})
export class ApplicationdetailsPage implements OnInit {

  applicantTitle = "New Applicant";
  slides: any;
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;
  kycCheck: boolean;
  profPic: any;
  profImg: boolean;
  newAppCheck: boolean;
  personalCheck: boolean;
  value = new Subject<any>();
  userdetail: string = 'newapp';
  rblCoAp: boolean;
  coappcheck: Subscription;




  constructor(public global: GlobalService, public router: Router, public docUploadService: DocumentuploadService) {
    this.global.slideTo.subscribe((val) => {
      if (val) {
        this.slider.slideTo(2);
        this.kycCheck = true;
        this.profImg = true;
        this.global.setProfileImage('http://localhost/_app_file_/storage/emulated/0/Android/data/com.sysarc.rbl/person2.png')
        this.profPic = this.global.getProfileImage();
      }
    })


    this.coappcheck = this.global.coappcheck.subscribe(data => {
      if (data == "C") {
        this.slider.slideTo(0);
        this.applicantTitle = " Co-Applicant";
        this.rblCoAp = true;
        this.personalCheck = false;
        this.kycCheck = false;
        this.newAppCheck = false;
        this.userdetail = 'kyc';
        this.slides = [
          { id: 'kyc' },
          { id: 'personal' }
        ];
      } else {
        this.applicantTitle = "New Applicant";
        this.slides = [
          { id: 'newapp' },
          { id: 'kyc' },
          { id: 'personal' }
        ];
      }
    })

    if (this.global.getApplicantType() == "C") {
      this.userdetail = 'kyc';
      this.rblCoAp = true;
      this.slides = [
        { id: 'kyc' },
        { id: 'personal' }
      ];
    } else {
      this.slides = [
        { id: 'newapp' },
        { id: 'kyc' },
        { id: 'personal' }
      ];
    }
  }

  ngOnInit() {
    if (this.global.getApplicantType() == "A") {
      this.applicantTitle = "New Applicant";
    } else if (this.global.getApplicantType() == "C") {
      this.applicantTitle = " Co-Applicant";
    }
  }


  onSegmentChanged(segmentButton) {
    let selectedIndex = this.slides.findIndex(slide => {
      return slide.id === segmentButton.detail.value;
    });
    this.slider.slideTo(selectedIndex);

  }

  async onSlideChanged() {
    let cSlide = await this.slider.getActiveIndex();
    const currentSlide = await this.slides[cSlide];
    let slilength = await this.slider.length()
    console.log(cSlide, 'cslider', currentSlide, 'currentslide', slilength);
    this.userdetail = currentSlide.id;
    this.value.next(this.userdetail);


    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }



  presentActionSheet() {
    // this.router.navigate(['/gallery'], { skipLocationChange: true }).then(val => {
    //   if (val) {
    //     this.docUploadService.galleryView([this.profPic], 0, true);
    //   }
    // });
  }

  showSubmittedTick(data) {
    console.log(data, "aaaaaa");
    let value = data.value;
    let slide = data.slide;
    switch (value) {
      case "newAppTick":
        this.newAppCheck = true;
        if (slide == "Y") {
          this.slider.slideTo(1);
        }
        break;
      case "kycTick":
        this.kycCheck = true;
        this.slider.slideTo(2);
        break;
      case "personalTick":
        this.personalCheck = true;
        break;
    }
  }

  ngOnDestroy() {
    this.coappcheck ? this.coappcheck.unsubscribe() : "";
  }


}
