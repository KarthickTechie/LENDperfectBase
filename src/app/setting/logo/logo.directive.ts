import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLogo]'
})
export class LogoDirective {

  setLogoInfo: LogoInfo = {
    default: 'assets/imgs/almasraf.png',
    almasraf: 'assets/imgs/almasraf.png',
    jfs: 'assets/imgs/JSF.png',
    ujjivan: 'assets/imgs/ujjivan.png',
    yesbank: 'assets/imgs/yeslogo.png',
    boi: 'assets/imgs/CBI.png',
  }
  setId: string;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    let logoInfo = localStorage.getItem('logoId');
    if (logoInfo) {
      this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('div.flex-info')[logoInfo].querySelectorAll('ion-card')[0].style.opacity = '0.4';
      this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('div.flex-info')[logoInfo].querySelectorAll('ion-icon')[0].style.display = 'block';
    } else {
      this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('div.flex-info')[0].querySelectorAll('ion-icon')[0].style.display = 'block';
      this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('div.flex-info')[0].querySelectorAll('ion-card')[0].style.opacity = '0.4';
    }
  }

  @HostListener('click') onclick(event) {
    this.setId = this.elementRef.nativeElement.parentNode.id;
    localStorage.setItem('logoId', this.setId);
    localStorage.setItem('logo', this.setLogoInfo[this.elementRef.nativeElement.id]);
    for (let i = 0; i < this.elementRef.nativeElement.parentNode.parentNode.parentNode.querySelectorAll('ion-card').length; i++) {
      this.elementRef.nativeElement.parentNode.parentNode.parentNode.querySelectorAll('ion-card')[i].style.opacity = '1';
      this.elementRef.nativeElement.parentNode.parentNode.querySelectorAll('div.flex-info')[i].querySelectorAll('ion-icon')[0].style.display = 'none';
    }
    this.elementRef.nativeElement.style.opacity = '0.4';
    this.elementRef.nativeElement.parentNode.querySelectorAll('ion-icon')[0].style.display = 'block';
  }

}

interface LogoInfo {
  default: string,
  almasraf: string,
  jfs: string,
  ujjivan: string,
  yesbank: string,
  boi: string
}