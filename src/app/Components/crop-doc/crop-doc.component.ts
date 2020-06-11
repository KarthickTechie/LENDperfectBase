import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-crop-doc',
  templateUrl: './crop-doc.component.html',
  styleUrls: ['./crop-doc.component.scss'],
})
export class CropDocComponent implements OnInit {
  @Input() doc: { doc: "", view: false };

  constructor(public modalCtrl: ModalController, public platform: Platform) {
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss({
        'updateProfileIMAGE': false
      });
    })
  }

  //Update Profile Piccture
  updateimage() {
    this.modalCtrl.dismiss({
      'updateProfileIMAGE': true
    });
  }

  //Close Modal
  close() {
    this.modalCtrl.dismiss({
      'updateProfileIMAGE': false
    });
  }

}
