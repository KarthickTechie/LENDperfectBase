import { Injectable, Output, EventEmitter } from '@angular/core';
import { of, Subscription, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentuploadService {
  galleryObservable = new Subject<any>();

  constructor() { }

  galleryView(listArray: any[], parentIndex: number, profile = false) {
    console.log(listArray, parentIndex, "inside doc service");
    if (profile) {
      this.galleryObservable.next({ listArray, parentIndex, profile: profile });
    } else {
      this.galleryObservable.next({ listArray, parentIndex });
    }
  }


  @Output() deleteImage: EventEmitter<any> = new EventEmitter(false);
  galleryDelete(parentIndex, childIndex, add = false, camera = false) {
    this.deleteImage.emit({ parentIndex, childIndex, add, camera });
  }

}
