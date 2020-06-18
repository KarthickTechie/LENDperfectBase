import { TranslateService } from '@ngx-translate/core';
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
  language: string;


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public translate: TranslateService) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(["/setting"])
  }

  radioChange(e) {
    this.language = e.target.value;
  }

  changeLanguage(e) {

    localStorage.setItem("useLang", this.language);
    this.translate.use(this.language);
  }
}
