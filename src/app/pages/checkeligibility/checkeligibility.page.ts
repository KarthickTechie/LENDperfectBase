import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkeligibility',
  templateUrl: './checkeligibility.page.html',
  styleUrls: ['./checkeligibility.page.scss'],
})
export class CheckeligibilityPage implements OnInit {
  checkEligibilityDetails:FormGroup;

  constructor(public formctrl: FormcontrolService, public master: MasterService) { }

  ngOnInit() {
    this.checkEligibilityDetails = this.formctrl.checkEligibilityForm();

  }

}
