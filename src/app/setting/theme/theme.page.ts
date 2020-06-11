
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { ThemeService } from '../../theme.service';
import { DataService } from '../../providers/data.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertDirective } from './../alert.directive';
import { AlertPage } from "../alert.page";
import { KeytextService } from '../../keytext.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss']
})
export class ThemePage implements OnInit {

  @ViewChild('setPrimaryColor', { static: false }) setPrimaryColor: ElementRef;
  @ViewChild('setSecondaryColor', { static: false }) setSecondaryColor: ElementRef;
  @ViewChild('setAccentColor', { static: false }) setAccentColor: ElementRef;
  @ViewChild('setTextColor', { static: false }) setTextColor: ElementRef;
  @ViewChild(AlertDirective, { static: false }) alertMessage: AlertDirective;

  setTheme: ThemeColor = {
    primaryColor: "#cccccc",
    secondaryColor: "#cccccc",
    accentColor: "#cccccc",
    textColor: "#cccccc"
  }

  labelText = KeytextService.labelDeta.themeInfo;

  constructor(
    public alertPage: AlertPage,
    public themeService: ThemeService,
    public router: Router, public activatedRoute: ActivatedRoute, public dataService: DataService) {
  }

  ngOnInit() {
    this.setTheme.primaryColor = localStorage.getItem('themePrimary') ? localStorage.getItem('themePrimary') : "#CCCCCC";
    this.setTheme.secondaryColor = localStorage.getItem('themeSecondary') ? localStorage.getItem('themeSecondary') : "#CCCCCC";
    this.setTheme.accentColor = localStorage.getItem('themeAccent') ? localStorage.getItem('themeAccent') : "#CCCCCC";
    this.setTheme.textColor = localStorage.getItem('themeText') ? localStorage.getItem('themeText') : "#CCCCCC";
  }


  changeTheme() {
    this.alertPage.getAlertControl(AlertComponent, this.alertMessage, "Appling Theme");
    this.themeService.setTheme({ primary: this.setPrimaryColor.nativeElement.value, secondary: this.setSecondaryColor.nativeElement.value, tertiary: this.setAccentColor.nativeElement.value, dark: this.setTextColor.nativeElement.value });
    localStorage.setItem('themePrimary', this.setPrimaryColor.nativeElement.value);
    localStorage.setItem('themeSecondary', this.setSecondaryColor.nativeElement.value);
    localStorage.setItem('themeAccent', this.setAccentColor.nativeElement.value);
    localStorage.setItem('themeText', this.setTextColor.nativeElement.value);
  }

  goBack() {
    this.router.navigate(["/setting"], { relativeTo: this.activatedRoute })
  }

}

interface ThemeColor {
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  textColor: string
}