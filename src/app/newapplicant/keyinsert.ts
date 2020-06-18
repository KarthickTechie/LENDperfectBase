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
            title: ['01'],
            firstName: ['Rajesh'],
            middleName: ['Kumar'],
            lastName: ['S'],
            gender: ['M'],
            mobileNumber: ['9945123214'],
            email: ['raj@sysarcinfomatix.com'],
            dob: ['1993-12-22'],
            nationality: ['IND'],
            addressType: ['Residential'],
            samePermanentAdd: ['false'],
            permanentAddress: ['45, LB road, Adyar'],
            residentialAddress: ['35, rb lane, guindy']
        });
    }


    incomeform() {
        return this.formbuilder.group({
            empCategoryType: ['01'],
            empName: ['Sam'],
            doj: ['2020-03-06'],
            incomeType: ['01'],
            grossIncome: ['5000'],
            otherDeductions: ['8000'],
            netIncome: ['13000'],
        })
    }


    kycform() {
        return this.formbuilder.group({
            proofType: ['01'],
            proofDocument: ['02'],
            proofvalue: ['444433332222'],
        });
    }


    loanform() {
        return this.formbuilder.group({
            amountRequested: ['300000'],
            interestType: ['fixed'],
            tenure: ['36'],
            moratorium: ['10'],
            repaymentMode: ['cash'],
            repaymentType: ['2'],
        });
    }


    otherDocumnetForm() {
        return this.formbuilder.group({
            otherDocumentType: ['Aadhar Document'],
            otherDescription: ['444433332222']
        });
    }

}