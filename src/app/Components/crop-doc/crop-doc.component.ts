import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crop-doc',
  templateUrl: './crop-doc.component.html',
  styleUrls: ['./crop-doc.component.scss'],
})
export class CropDocComponent implements OnInit {
  @Input() doc: object;

  constructor(public modalCtrl: ModalController) { 
  }

  ngOnInit() {}
  
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
