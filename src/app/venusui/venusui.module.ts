import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenusbuttonComponent } from './venusbutton/venusbutton.component';
import { SimpletitlecontainerComponent } from './simpletitlecontainer/simpletitlecontainer.component';
import { SimplelistComponent } from './simplelist/simplelist.component';
import { SimplelistitemComponent } from './simplelistitem/simplelistitem.component';

@NgModule({
  imports: [
  CommonModule
  ],
  declarations: [
    VenusbuttonComponent, 
    SimpletitlecontainerComponent, 
    SimplelistComponent, 
    SimplelistitemComponent
  ],
  exports:[
    VenusbuttonComponent,
    SimpletitlecontainerComponent,
    SimplelistComponent,
    SimplelistitemComponent
  ]
})
export class VenusuiModule { }
