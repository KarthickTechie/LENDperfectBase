import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { Route, RouterModule} from '@angular/router';
import { VenusuiModule } from './../venusui/venusui.module';
import { DatacenterService } from 'app/services/datacenter.service';

const route:Route[] = [
  {path:'',component:ApplicationsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    VenusuiModule
  ],
  declarations: [ApplicationsComponent],
  providers:[DatacenterService]
})
export class ApplicationsModule { }
