import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemePage implements OnInit {

  @ViewChild('primary', { static: false }) primary: ElementRef;
  @ViewChild('secondary', { static: false }) secondary: ElementRef;
  @ViewChild('accent', { static: false }) accent: ElementRef;
  @ViewChild('text', { static: false }) text: ElementRef;


  themData: ThemeColor = {
    primary: '#000000',
    secondary: '#000000',
    tertiary: '#000000',
    dark: '#000000'
  }

  constructor(private theme: ThemeService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.primary.nativeElement.value = this.themData.primary;
    this.primary.nativeElement.style.background = this.themData.primary;
    this.secondary.nativeElement.value = this.themData.secondary;
    this.secondary.nativeElement.style.background = this.themData.secondary;
    this.accent.nativeElement.value = this.themData.tertiary;
    this.accent.nativeElement.style.background = this.themData.tertiary;
    this.text.nativeElement.value = this.themData.dark;
    this.text.nativeElement.style.background = this.themData.dark;
  }

  changeTheme() {
    console.log("theme", { primary: this.primary.nativeElement.value, secondary: this.secondary.nativeElement.value, tertiary: this.accent.nativeElement.value, dark: this.text.nativeElement.value })
    this.theme.setTheme({ primary: this.primary.nativeElement.value, secondary: this.secondary.nativeElement.value, tertiary: this.accent.nativeElement.value, dark: this.text.nativeElement.value });
  }

}

interface ThemeColor {
  primary: string,
  secondary: string,
  tertiary: string,
  dark: string
}