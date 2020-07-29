import { GlobalService } from './../../global/global.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MasterData } from 'src/app/newapplicant/masterservice';

@Component({
  selector: 'app-kyc-scan-option',
  templateUrl: './kyc-scan-option.component.html',
  styleUrls: ['./kyc-scan-option.component.scss'],
})
export class KycScanOptionComponent implements OnInit {
  kycScanType: any[];

  @Output() _scanTypeSelected = new EventEmitter();

  constructor(
    public master: MasterData,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.kycScanType = this.master.getKycScanType();
  }

  emitScanType(scanType) {
    // this._scanTypeSelected.emit(scanType);
    this.global._scanTypeSelected.next(scanType);
  }

}
