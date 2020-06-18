import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;
  signatureImage: any;
  signaturePadOptions: Object = {
    'minWidth': 0.5,
    'maxWidth': 3,
    'backgroundColor': "rgb(255,255,255)",
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  isDrawingDone = false;
  isClearable = false;
  constructor(public modalCtrl: ModalController, public platform: Platform) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss({
        'signature': false
      });
    })
  }

  //Update Profile Piccture
  signatureSubmit() {
    this.modalCtrl.dismiss({
      'signature': true,
      'image': this.signatureImage
    });
  }

  //Close Modal
  close() {
    this.modalCtrl.dismiss({
      'signature': false
    });
  }
  drawStart() {
    console.log('started');
    this.isClearable = true;

  }
  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    //console.log(this.signatureImage, 'complete');
    this.isDrawingDone = false;
    this.signatureSubmit();

  }
  drawClear() {
    this.isClearable = false;
    this.isDrawingDone = false;
    this.signaturePad.clear();
  }

}
