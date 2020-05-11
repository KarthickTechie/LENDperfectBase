import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { KeytextService } from '../../keytext.service';


@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  labelText = KeytextService.labelDeta.langInfo;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(["/setting"], { relativeTo: this.activatedRoute })
  }

  changeLanguage() {

  }
}
