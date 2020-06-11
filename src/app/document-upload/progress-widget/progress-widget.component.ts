import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-progress-widget',
  templateUrl: './progress-widget.component.html',
  styleUrls: ['./progress-widget.component.scss'],
})
export class ProgressWidgetComponent {

  @Input() imgTotalCount: number;
  @Input() imgStartCount: number;
  @Input() value: number;
  @Input() showButton: boolean;
  @Input() showZipButton: boolean;
  @Input() docUpload: boolean;
  @Input() zipUpload: boolean;
  @Input() zipProgressInside: number;
  @Input() successClose: boolean;
  @Input() zipDashOffSet: number;
  @Output() docReupload: EventEmitter<boolean> = new EventEmitter(false);
  @Output() closeBtn: EventEmitter<boolean> = new EventEmitter(false);
  @Output() zipReupload: EventEmitter<boolean> = new EventEmitter(false);
  progressInside: number = 0;
  radius: number = 54;
  circumference: number = 2 * Math.PI * this.radius;
  dashoffset: number = 340;
  radius_outside: number = 67;
  circumference_outside: number = 2 * Math.PI * this.radius_outside;
  dashoffset_outside: number = 420;
  reUpload: boolean;
  setImageProcess: progressbar = {
    imgProcess: true,
    imgFailure: false,
    imgSuccess: false,
    ZipSuccess: false
  }

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges) {
  }




  progress(value: number) {
    this.progressInside = value;
    if (value == 100) {
      let progress_outside = this.circumference_outside / this.imgTotalCount;
      this.dashoffset_outside = progress_outside * (this.imgTotalCount - (this.imgStartCount + 1));
      if (this.imgStartCount == this.imgTotalCount) {
        this.setImageProcess.imgSuccess = true;
        this.setImageProcess.imgProcess = false;
        this.setImageProcess.imgFailure = false;
      }
    }
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }
  retry() {
    this.docReupload.emit(true);

  }

  zipRetry() {
    this.zipReupload.emit(null);
  }

  close() {
    this.closeBtn.emit(null);
  }

  startProgress() {
    this.zipUpload = true;
    this.docUpload = false;
    this.imgStartCount = 0;
    this.imgTotalCount = 1;
    for (let i = 1; i < 40; i++) {
      let progress = i / 100;
      this.zipDashOffSet = this.circumference * (1 - progress);
    }

  }
  progressSuccess() {
    for (let i = 41; i < 101; i++) {
      let progress = i / 100;
      this.zipDashOffSet = this.circumference * (1 - progress);
      this.imgStartCount = this.imgTotalCount;
    }
    this.setImageProcess.ZipSuccess = true;
    this.setImageProcess.imgFailure = false;
    this.setImageProcess.imgProcess = false;
    this.successClose = true;

  }

  progressFailure() {
    this.setImageProcess.imgFailure = true;
    this.setImageProcess.imgProcess = false;
    this.setImageProcess.imgSuccess = false;
    this.zipUpload = false;
    this.showZipButton = true;


  }

}

interface progressbar {
  imgProcess: boolean,
  imgFailure: boolean,
  imgSuccess: boolean,
  ZipSuccess: boolean

}

