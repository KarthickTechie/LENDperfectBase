import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { VenusuiModule } from './../venusui/venusui.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

const route: Routes = [{
    path:'',
    component:HomeComponent
}]

@NgModule({
    declarations:[
        HomeComponent,
    ],
    imports:[
    CommonModule,
    FormsModule,
    VenusuiModule,
    RouterModule.forChild(route)
    ],
    exports:[]
})
export class HomeModule{
    
}