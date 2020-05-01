import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor( @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ) {
    storage.get('theme').then(cssText => {  // <--- GET SAVED THEME
      this.setGlobalCSS(cssText);
    });
  }

  setTheme(theme) {
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
    this.storage.set('theme', cssText);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }


}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
};

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  console.log('clor', secondary);
  console.log('clor dark', dark);

  return `
  --ion-text-color: ${dark};
  --ion-item-color: ${dark};
  
    
    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: ${Color(primary).rgb().array()};
    --ion-color-primary-contrast: ${invertHex(primary)};
    --ion-color-primary-contrast-rgb: ${Color(invertHex(primary)).rgb().array()};
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: ${Color(secondary).rgb().array()};
    --ion-color-secondary-contrast: ${invertHex(secondary)};
    --ion-color-secondary-contrast-rgb: ${Color(invertHex(secondary)).rgb().array()};
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: ${Color(tertiary).rgb().array()};
    --ion-color-tertiary-contrast: ${invertHex(tertiary)}; 
    --ion-color-tertiary-contrast-rgb: ${Color(invertHex(tertiary)).rgb().array()};
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};
    
    --ion-color-success: ${success};
    --ion-color-success-rgb: ${Color(success).rgb().array()};
    --ion-color-success-contrast:  ${invertHex(success)};
    --ion-color-success-contrast-rgb: ${Color(invertHex(success)).rgb().array()};
    --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
    --ion-color-success-tint: ${Color(success).lighten(tintRatio)};
    
    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: ${Color(warning).rgb().array()};
    --ion-color-warning-contrast: ${invertHex(warning)};
    --ion-color-warning-contrast-rgb: ${Color(invertHex(warning)).rgb().array()};
    --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
    --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};

    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: ${Color(danger).rgb().array()};
    --ion-color-danger-contrast: ${invertHex(danger)};
    --ion-color-danger-contrast-rgb: ${Color(invertHex(danger)).rgb().array()};
    --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
    --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};

    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: ${Color(dark).rgb().array()};
    --ion-color-dark-contrast: ${invertHex(dark)};
    --ion-color-dark-contrast-rgb: ${Color(invertHex(dark)).rgb().array()};
    --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
    --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};
    
    --ion-color-medium: ${medium};
    --ion-color-medium-rgb: ${Color(medium).rgb().array()};
    --ion-color-medium-contrast: ${invertHex(medium)};
    --ion-color-medium-contrast-rgb: ${Color(invertHex(medium)).rgb().array()};
    --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
    --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};

    --ion-color-light: ${light};
    --ion-color-light-rgb: ${Color(light).rgb().array()};
    --ion-color-light-contrast: ${invertHex(light)};
    --ion-color-light-contrast-rgb: ${Color(invertHex(light)).rgb().array()};
    --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
    --ion-color-light-tint: ${Color(light).lighten(tintRatio)};
    `;
}


function contrast(color, ratio = 0.8) {
  color = Color(color);

  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}


function invertHex(hex) {
  if (hex.toUpperCase() == '#FFFFFF') {
    return '#000000';
  } else {
    return '#' + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).toUpperCase();
  }
}

