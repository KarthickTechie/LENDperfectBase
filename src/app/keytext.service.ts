import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeytextService {

  static labelDeta = {
    "themeInfo": {
      "themeheading": "Themes",
      "label": [
        "Primary",
        "Secondary",
        "Accent",
        "Text"
      ],
      "themebtnText": 'Apply Theme'
    },
    "logoInfo": {
      "logoheading": "Logo"
    },
    "langInfo": {
      "heading": "Language",
      "btnText": 'Apply Language'
    },
    "settingInfo": {
      "settingheading": "Setting"
    }
  }


}