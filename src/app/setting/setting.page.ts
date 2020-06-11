import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from '../providers/data.service';
import { KeytextService } from '../keytext.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  settings: any;
  navigate: navigateInfo[];
  labelText = KeytextService.labelDeta.settingInfo;

  constructor(
    public router: Router, public activatedRoute: ActivatedRoute,
    public dataService: DataService
  ) {
    this.settings = environment.settings;
    if (this.settings) {
      this.navigate =
        [
          { labelName: "Logo", url: "logo", icon: "logo-buffer" },
          { labelName: "Themes", url: "theme", icon: "color-fill" },
          { labelName: "Language", url: "language", icon: "language" }
        ]
    } else {
      this.navigate =
        [
          { labelName: "Themes", url: "theme", icon: "color-fill" },
          { labelName: "Language", url: "language", icon: "language" }
        ]
    }

  }

  ngOnInit() {
  }

  settingPage(url) {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

}

interface navigateInfo {
  labelName: string,
  url: string,
  icon: string
}