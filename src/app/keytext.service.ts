import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeytextService {

  public static labelDeta: labelInfo = {
    "themeInfo": {
      "heading": "Themes",
      "label": [
        "Primary",
        "Secondary",
        "Accent",
        "Text"
      ],
      "btnText": 'Apply Theme'
    },
    "logoInfo": {
      "heading": "Logo"
    },
    "settingInfo": {
      "heading": "Setting"
    }
  }


}

interface labelInfo {
  themeInfo: {
    heading: string,
    label: string[],
    btnText: string,
  },
  logoInfo: {
    heading: string,
  },
  settingInfo: {
    heading: string,
  }
}
