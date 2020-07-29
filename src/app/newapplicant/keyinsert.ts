import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class keyInsert {

    constructor(public formbuilder: FormBuilder) {

    }

    personalform() {
        return this.formbuilder.group({
            title: ['01',Validators.compose([Validators.required])],
            firstName: ['Karthick',Validators.compose([Validators.required])],
            middleName: ['Kumar'],
            lastName: ['S',Validators.compose([Validators.required])],
            gender: ['M',Validators.compose([Validators.required])],
            mobileNumber: ['9945123214',Validators.compose([Validators.required])],
            email: ['karthick@sysarcinfomatix.com',Validators.compose([Validators.required])],
            dob: ['1993-12-22',Validators.compose([Validators.required])],
            nationality: ['IND'],
            addressType: ['Permanent'],
            samePermanentAdd: ['false'],
            permanentAddress: ['45, LB road, Adyar',Validators.compose([Validators.required])],
            residentialAddress: ['35, rb lane, guindy',Validators.compose([Validators.required])]
        });
    }


    incomeform() {
        return this.formbuilder.group({
            empCategoryType: ['01',Validators.compose([Validators.required])],
            empName: ['Sam'],
            doj: ['2020-03-06',Validators.compose([Validators.required])],
            incomeType: ['01',Validators.compose([Validators.required])],
            grossIncome: ['5000',Validators.compose([Validators.required])],
            otherDeductions: ['8000',Validators.compose([Validators.required])],
            netIncome: ['13000',Validators.compose([Validators.required])],
        })
    }


    kycform() {
        return this.formbuilder.group({
            proofType: ['01',Validators.compose([Validators.required])],
            proofDocument: ['02',Validators.compose([Validators.required])],
            proofvalue: ['444433332222',Validators.compose([Validators.required])],
        });
    }


    loanform() {
        return this.formbuilder.group({
            amountRequested: ['300000',Validators.compose([Validators.required])],
            interestType: ['Fixed',Validators.compose([Validators.required])],
            tenure: ['36',Validators.compose([Validators.required])],
            moratorium: ['10',Validators.compose([Validators.required])],
            repaymentMode: ['cash',Validators.compose([Validators.required])],
            repaymentType: ['2',Validators.compose([Validators.required])],
        });
    }


    otherDocumnetForm() {
        return this.formbuilder.group({
            otherDocumentType: ['Aadhar Document',Validators.compose([Validators.required])],
            // otherDescription: ['444433332222']
        });
    }

}