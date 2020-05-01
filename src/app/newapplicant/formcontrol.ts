import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Injectable()

export class FormControlData {

    constructor(private formbuilder: FormBuilder) {

    }

    personalform() {
        return this.formbuilder.group({
            title: ['', Validators.compose([Validators.required])],
            firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            middleName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
            lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.required]), Validators.pattern('[[0-9]{10}]'), Validators.minLength(10), Validators.maxLength(10)],
            email: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'), Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            nationality: [''],
            company: ['', Validators.compose([Validators.pattern('[0-9a-zA-Z ]*'), Validators.required])],
            ad_type: [''],
            samePermanentAdd: [''],
            permanentAddress1: ['', Validators.compose([Validators.required])],
            residentialAddress1: ['', Validators.compose([Validators.required])],
            customerCategory: ['', Validators.compose([Validators.required])],
            custNationality: ['', Validators.compose([Validators.required])],
            stlCustomer: ['', Validators.compose([Validators.required])],
            custType: ['', Validators.compose([Validators.required])],
            bankingWith: ['', Validators.compose([Validators.required])],
            vipFlag: ['', Validators.compose([Validators.required])],
            incomeAssign: ['', Validators.compose([Validators.required])],
            cbrbResult: ['', Validators.compose([Validators.required])],
            alEthiadBureau: ['', Validators.compose([Validators.required])],
            accNo: ['', Validators.compose([Validators.required])],
            passportNo: ['', Validators.compose([Validators.required])],
            eidaNo: ['', Validators.compose([Validators.required])],
            rimNo: ['', Validators.compose([Validators.required])],
            poBoxNo: ['', Validators.compose([Validators.required])]
        });
    }


    incomeform() {
        return this.formbuilder.group({
            empCategoryType: ['', Validators.compose([Validators.required])],
            empName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)])],
            doj: [''],
            incomeType: ['', Validators.compose([Validators.required])],
            grossIncome: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.pattern('[0-9]*'), Validators.required])],
            statutory: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            otherDeductions: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            netIncome: ['', Validators.compose([Validators.required])],
            eosb: ['', Validators.compose([Validators.required])],
            lengthService: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            otherincomes: this.formbuilder.array([])
        })
    }


    kycform() {
        return this.formbuilder.group({
            kycIdType: ['', Validators.compose([Validators.required])],
            kycIdvalue: ['', Validators.compose([Validators.required])],
            kycAddressType: ['', Validators.compose([Validators.required])],
            kycAddressvalue: ['', Validators.compose([Validators.required])]
        });
    }


    loanform() {
        return this.formbuilder.group({
            product: ['', Validators.compose([Validators.required])],
            interesttype: ['', Validators.compose([Validators.required])],
            producttype: ['1', Validators.compose([Validators.required])],
            loan_amount_range: ['', Validators.compose([Validators.min(250000), Validators.max(25000000)])],
            amount: ['', Validators.compose([Validators.required, Validators.min(1000), Validators.pattern('[0-9]*')])],
            tenure: ['', Validators.compose([Validators.maxLength(3), Validators.minLength(1), Validators.pattern('[0-9]*'), Validators.required])],
            moratorium: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(3), Validators.minLength(1), Validators.required])],
            mclr: '',
            loanpurpose: '',
            repaymentMode: ['', Validators.compose([Validators.required])],
            repaymentType: ['', Validators.compose([Validators.required])],
            proposalType: ['', Validators.compose([Validators.required])],
            amortization: ['', Validators.compose([Validators.required])]
        });
    }


    otherDocumnetForm() {
        return this.formbuilder.group({
            otherDocument: ['', Validators.compose([Validators.required])],
            otherDescription: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9]*')])]
        });
    }


}