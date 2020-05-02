import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.page.html',
  styleUrls: ['./app-dashboard.page.scss'],
})
export class AppDashboardPage implements OnInit {

  userdetail: string = 'userdetail';
  @ViewChild('mySlider', { static: true }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  slides: any;


  constructor() {
    // this.slides.id = 'personal';
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

}
