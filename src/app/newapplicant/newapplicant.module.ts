import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { FormControlData } from '../newapplicant/formcontrol';

@NgModule({

    declarations: [
        PersonalDetailsComponent,
        IncomeDetailsComponent,
        KycDetailsComponent,
        LoanDetailsComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ],
    providers: [FormControlData],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        PersonalDetailsComponent,
        IncomeDetailsComponent,
        KycDetailsComponent,
        LoanDetailsComponent,
    ]
})

export class newApplicantModule { }