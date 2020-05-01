import { Injectable } from '@angular/core';

import { GlobalService } from '../global/global.service';


@Injectable({
    providedIn: 'root'
})

export class HandlingError {

    constructor(private global: GlobalService) {
    }

    getUserPass() {
        this.global.presentAlert(`Login`, `Please Enter the username and password!`);
    }
    getValidPin() {
        this.global.presentAlert(`Alert`, `Please enter a valid pin!`);
    }
    pinCheck() {
        this.global.presentAlert('Alert', 'Plese Enter Your 4 Digit Pin.')
    }
    pinNotMatch() {
        this.global.presentAlert('Alert', " Your Pin Doesn't Match.")
    }
    pinField() {
        this.global.presentAlert(`Alert`, `Please Fill Both Pin Field!`);
    }


    personalvalid() {
        return {
            title: [
                { type: "required", message: "Select Title." },
            ],
            firstName: [
                { type: "required", message: "Enter First Name." },
                { type: "pattern", message: "Enter Valid First Name." },
            ],
            middleName: [
                { type: "pattern", message: "Enter Valid Middle Name." },
            ],
            lastName: [
                { type: "required", message: "Enter Last Name." },
                { type: "pattern", message: "Enter Valid Last Name." },
            ],
            dob: [
                { type: "required", message: "Must select Date Of Birth." },
            ],
            mobileNumber: [
                { type: "required", message: "Enter Mobile Number." },
                { type: "pattern", message: "Enter Valid Mobile Number." },
            ],
            email: [
                { type: "required", message: "Enter Email." },
                { type: "pattern", message: "Enter Valid Email." },
            ],
            permanentAddress1: [
                { type: "required", message: "Enter Address 1." },
            ],

            residentialAddress1: [
                { type: "required", message: "Enter Address 1." },
            ],
            customerCategory: [
                { type: "required", message: "Select Custom Categroy Type. " }
            ],
            custNationality: [
                { type: "required", message: "Select Nationality Type. " }
            ],
            stlCustomer: [
                { type: "required", message: "Select STL Customer Type. " }
            ],
            custType: [
                { type: "required", message: "Select Customer Type. " }
            ],
            bankingWith: [
                { type: "required", message: "Select Banking With field. " }
            ],
            vipFlag: [
                { type: "required", message: "Select VIP Flag Type. " }
            ],
            incomeAssign: [
                { type: "required", message: "Select Inome Assign Type. " }
            ],
            cbrbResult: [
                { type: "required", message: "Select CBRB Result Type. " }
            ],
            alEthiadBureau: [
                { type: "required", message: "Enter Bureau Value. " }
            ],
            accNo: [
                { type: "required", message: "Enter Account Number. " }
            ],
            passportNo: [
                { type: "required", message: "Enter Pasport Number. " }
            ],
            eidaNo: [
                { type: "required", message: "Enter EIDA No. " }
            ],
            rimNo: [
                { type: "required", message: "Enter RIM Number. " }
            ],
            poBoxNo: [
                { type: "required", message: "Enter PoBox Number. " }
            ],

        };
    }

    incomevalid() {
        return {
            empCategoryType: [
                { type: "required", message: "Select Employment Category Type." }
            ],
            empName: [
                { type: "pattern", message: "Enter Valid Employer Name." }
            ],
            doj: [
                { type: "required", message: "Select Date of Joining." }
            ],
            incomeType: [
                { type: "required", message: "Select Income Type." }
            ],
            grossIncome: [
                { type: "required", message: "Enter Employee Gross Income." },
                { type: "pattern", message: "Enter Valid Gross Income value." }
            ],
            statutory: [
                { type: "required", message: "Enter Employee Statutory Deduction Value." },
                { type: "pattern", message: "Enter Valid Statutory Deduction value." }
            ],
            otherDeductions: [
                { type: "required", message: "Enter Employee Other Deductions." },
                { type: "pattern", message: "Enter Valid Deduction value." }
            ],
            netIncome: [
                { type: "required", message: "Enter Employee Net Income." },
                { type: "pattern", message: "Enter Valid Net Income Value." }
            ],
            eosb: [
                { type: "required", message: " Enter EOSB Value." }
            ],
            lengthService: [
                { type: "required", message: " Enter Length Of Service Value (In Months)." }
            ]
        }
    }


    kycFormValidation() {
        return {
            kycIdType: [
                { type: "required", message: "Select Id Proof." },
            ],
            kycIdvalue: [
                { type: "required", message: "Enter Id Proof Value." },
            ],
            kycAddressType: [
                { type: "required", message: "Select Address Proof." },
            ],
            kycAddressvalue: [
                { type: "required", message: "Enter Address Proof Value." },
            ],
        }
    }

    loanFormValidation() {
        return {
            loanProduct: [
                { type: "required", message: "Select Loan Product Type." }
            ],
            interestType: [
                { type: "required", message: "Select Interest Type." }
            ],
            productType: [
                { type: "required", message: "Select Product Type." }
            ],
            loanAmountRange: [
                { type: "required", message: "Enter Loan Amount Range." },
                { type: "max", message: "Maximum Loan Amount Range is 2,50,00,000.00." },
                { type: "min", message: "Minimum Loan Amount Range is 2,50,000.00." }
            ],
            amountRequested: [
                { type: "required", message: "Enter Amount Requested." }
            ],
            tenure: [
                { type: "required", message: "Enter Periodicity of Installments (In Months)." },
                { type: "pattern", message: "Enter Valid Installments Period (In Months). " }
            ],
            moratorium: [
                { type: "required", message: "Enter Moratorium Period (In Months)." },
                { type: "pattern", message: "Enter Valid Moratorium Period (In Months). " }
            ],
            interestRateDefined: [
                { type: "required", message: "Select Interest Rate Defined Value." }
            ],
            loanpurpose: [
                { type: "required", message: "Select Loan Purpose Type." }
            ],
            repaymentMode: [
                { type: "required", message: "Select Repayment Mode Type." }
            ],
            repaymentType: [
                { type: "required", message: "Select Repayment Type." }
            ],
            proposalType: [
                { type: "required", message: "Select Proposal Type." }
            ],
            amortization: [
                { type: "required", message: "Select Amortization Value." }
            ],
        }
    }

    otherDocumentFormValidation() {
        return {
            otherDocument: [
                { type: "required", message: "Select Document Type." }
            ],
            otherDescription: [
                { type: "pattern", message: "Enter Valid Document Description." }
            ]
        }
    }



}