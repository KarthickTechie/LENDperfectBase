import { NgModule } from "@angular/core";
import { FunnyComponent } from './funny.component';
import { RouterModule } from "@angular/router";
import { VenusuiModule } from "app/venusui/venusui.module";


@NgModule({

    declarations:[FunnyComponent],
    imports:[
        VenusuiModule,
        RouterModule.forChild(
            [
                {path:'',component:FunnyComponent}
            ]
        )
    ],
    exports:[],
    providers:[]
})
export class FunnyModule{

}