import { Injectable } from '@angular/core';
import { ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';

@Injectable()

export class AlertPage {

  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
  }

  getAlertControl(alertComponent, alertMessage, message) {
    const alertComp = this.componentFactoryResolver.resolveComponentFactory(alertComponent);
    const hostViewConainer = alertMessage.viewContainerRef;
    hostViewConainer.clear();
    const componentRef = hostViewConainer.createComponent(alertComp);
    componentRef.instance.message = message;

    setTimeout(() => {
      hostViewConainer.clear();
    }, 2000)
  }

}
