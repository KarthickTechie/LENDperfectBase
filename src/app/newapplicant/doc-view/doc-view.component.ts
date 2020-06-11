import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss'],
})
export class DocViewComponent implements OnInit {
  @Input() imageList: any;
  constructor(private modalCtrl: ModalController, public platform: Platform) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss(
        {
          'deleteImage': false
        }
      )
    })
  }
  onDelete(parentIndex, childIndex) {
    this.modalCtrl.dismiss({
      'deleteImage': true, index: parentIndex, childIndex
    });
  }

  //Close Modal
  close() {
    this.modalCtrl.dismiss({
      'deleteImage': false
    });
  }




}
