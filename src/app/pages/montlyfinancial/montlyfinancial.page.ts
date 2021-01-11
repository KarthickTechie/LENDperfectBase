import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-montlyfinancial',
  templateUrl: './montlyfinancial.page.html',
  styleUrls: ['./montlyfinancial.page.scss'],
})
export class MontlyfinancialPage implements OnInit {
  monthlyfinancial:FormGroup;
  constructor(public formctrl: FormcontrolService) { }

  ngOnInit() {
this.monthlyfinancial = this.formctrl.monthlyFinancialform();
  }

}
