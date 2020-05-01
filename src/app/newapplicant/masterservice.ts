import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class MasterData {

    constructor() {

    }

    getPersonalTable() {
        return {
            title: "TEXT",
            firstName: "TEXT",
            middleName: "TEXT",
            lastName: "TEXT",
            gender: "TEXT",
            mobileNumber: "TEXT",
            email: "TEXT",
            dob: "TEXT",
            nationality: "TEXT",
            company: "TEXT",
            ad_type: "TEXT",
            samePermanentAdd: "TEXT",
            permanentAddress1: "TEXT",
            residentialAddress1: "TEXT",
            customerCategory: "TEXT",
            custNationality: "TEXT",
            stlCustomer: "TEXT",
            custType: "TEXT",
            bankingWith: "TEXT",
            vipFlag: "TEXT",
            incomeAssign: "TEXT",
            cbrbResult: "TEXT",
            alEthiadBureau: "TEXT",
            accNo: "TEXT",
            passportNo: "TEXT",
            eidaNo: "TEXT",
            rimNo: "TEXT",
            poBoxNo: "TEXT"
        }
    }

    getLoadTable() {
        return {
            product: "TEXT",
            interesttype: "TEXT",
            producttype: "TEXT",
            loan_amount_range: "TEXT",
            amount: "TEXT",
            tenure: "TEXT",
            moratorium: "TEXT",
            mclr: "TEXT",
            loanpurpose: "TEXT",
            repaymentMode: "TEXT",
            repaymentType: "TEXT",
            proposalType: "TEXT",
            amortization: "TEXT"
        }
    }

    getKycTable() {
        return {
            kycIdType: "TEXT",
            kycIdvalue: "TEXT",
            kycAddressType: "TEXT",
            kycAddressvalue: "TEXT"
        }
    }

    getIncomeTable() {
        return {
            empCategoryType: "TEXT",
            empName: "TEXT",
            doj: "TEXT",
            incomeType: "TEXT",
            grossIncome: "TEXT",
            statutory: "TEXT",
            otherDeductions: "TEXT",
            netIncome: "TEXT",
            eosb: "TEXT",
            lengthService: "TEXT",
            otherincomes: "TEXT"
        }
    }

    getTitleList() {
        return [
            { OptionDesc: 'MR', code: '01' },
            { OptionDesc: 'MRS', code: '02' },
            { OptionDesc: 'M/S', code: '03' }
        ];
    }

    getNationalityList() {
        return [
            { Name: 'INDIA', code: 'IND' }
        ]
    }

    getMaritalStatusList() {
        return [
            { Name: 'Married', code: 'married' },
            { Name: 'UnMarried', code: 'unmarried' },
            { Name: 'Widow', code: 'widow' }
        ];
    }

    getempCategoryList() {
        return [
            { Name: "Government", code: '01' },
            { Name: "Self Employed", code: '02' },
            { Name: "Private", code: '03' },
            { Name: "Others", code: '04' },
        ]
    }

    getincomeTypeList() {
        return [
            { Name: "Daily", code: '01' },
            { Name: "Weekly", code: '02' },
            { Name: "Monthly", code: '03' },
            { Name: "Yearly", code: '04' }
        ];
    }

    getincomeList() {
        return [
            { Name: 'Agriculture', code: '01' },
            { Name: 'Business', code: '02' },
            { Name: 'Rent', code: '03' },
            { Name: 'Others', code: '04' }
        ];
    }


    getloanProductList() {
        return [
            { Name: 'Personal Loan', code: '01' },
            { Name: 'Home Loan', code: '02' },
            { Name: 'Vehicle Loan', code: '03' }
        ];
    }

    getinterestTypeList() {
        return [
            { Name: 'Fixed', code: 'Fixed' },
            { Name: 'Floating', code: 'Floating' }
        ];
    }

    getrepaymenttypeList() {
        return [
            { Name: 'Monthly', code: '2' },
            { Name: 'Yearly', code: '12' }
        ];
    }

    getrepaymentModeList() {
        return [
            { Name: 'Cash', code: 'cash' },
            { Name: 'EMI', code: 'emi' },
            { Name: 'Others', code: 'others' }
        ];
    }

    getKycproofList() {
        return [
            { Name: 'Pan Card', code: "01 " },
            { Name: 'Aadhar Card', code: "02 " },
            { Name: 'Voter ID Card', code: "03 " },
            { Name: 'Passport', code: "04 " },
            { Name: 'Driving License', code: "05 " },
        ]
    }

}