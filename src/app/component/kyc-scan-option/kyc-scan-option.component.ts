import { NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/providers/global.service';
import { MasterService } from 'src/app/providers/master.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-kyc-scan-option',
  templateUrl: './kyc-scan-option.component.html',
  styleUrls: ['./kyc-scan-option.component.scss'],
})
export class KycScanOptionComponent implements OnInit {

  kycScanType: any[];
  typeCheck:any;
  tick:any;

  @Output() _scanTypeSelected = new EventEmitter();

  constructor(
    public master: MasterService,
    public global: GlobalService,
    public NavParams: NavParams
  ) { 
    this.typeCheck = this.NavParams.get("show");
    this.tick = localStorage.getItem('model');
    console.log(this.tick,"aaaaaaaaaaaaaaaaa");

  }

  ngOnInit() {
    if(this.typeCheck == 'pan'){
      this.kycScanType = this.master.getKycScanTypePan();
    }else{
      this.kycScanType = this.master.getKycScanType();

    }
  }

  emitScanType(scanType) {
    // this._scanTypeSelected.emit(scanType);
    this.global._scanTypeSelected.next(scanType);
  }

}
