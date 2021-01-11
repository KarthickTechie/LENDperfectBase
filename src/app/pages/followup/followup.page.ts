import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {
  followup: FormGroup;

  constructor(public formCtrl: FormcontrolService) { }

  ngOnInit() {
    this.followup = this.formCtrl.followUpFields();

  }

}
