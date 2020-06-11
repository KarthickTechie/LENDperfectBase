import { Directive, ViewContainerRef } from "@angular/core";
@Directive({
    selector: '[appGallery]'
})
export class GalleryDirective {
    constructor(public viewContRef: ViewContainerRef) {

    }
}