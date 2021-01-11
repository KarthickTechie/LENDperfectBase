import { ActivatedRoute } from '@angular/router';
import { HandlingError } from './../../utility/ErrorHandling';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liability-details',
  templateUrl: './liability-details.page.html',
  styleUrls: ['./liability-details.page.scss'],
})
export class LiabilityDetailsPage implements OnInit {

  liabilitesBorrower:FormGroup;
  GurantorLiabilites:FormGroup;
  showGurantor:boolean=false;
  showBorrower:boolean = true;
  appType:any;
  constructor(public formctrl: FormcontrolService,private errorHandling: HandlingError,public activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParamMap.subscribe(data => {
      this.appType = data['params'].appType;
      if(this.appType != 'borrower'){
        this.showGurantor = true;
        this.showBorrower = false;
      }
    });
  }

  ngOnInit() {
    this.liabilitesBorrower = this.formctrl.getLiabilitesBorrowerform();
    this.GurantorLiabilites = this.formctrl.getGurantorLiabilitesform();
  }

}
