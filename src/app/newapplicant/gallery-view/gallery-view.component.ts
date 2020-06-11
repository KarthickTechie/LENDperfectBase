import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter(false);
  constructor() { }

  ngOnInit() { }
  closeGallery() {
    this.close.emit(true);
  }

}
