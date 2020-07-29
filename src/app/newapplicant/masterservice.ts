import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class MasterData {

    constructor() {

    }

    getLoginTable() {
        return {
            // id: "INTEGER PRIMARYKEY AUTOINCREMENT",
            // userName: "VARCHAR(30) NOT NULL DEFAULT ''",
            password: "VARCHAR(30) NOT NULL DEFAULT ''",
            // organisationLevel: "TEXT",
            // organisationcode: "TEXT",
            // organisationName: "TEXT",
            loginDate: "DATETIME",
            // constraint:"CONSTRAINT constraint_name UNIQUE (userName)"
        }
    }

    getStateTable(){
        return{
        // id: "INTEGER PRIMARY KEY AUTOINCREMENT",
		stateCode: "TEXT",
		stateName: "TEXT"
        }
    }

getCityTable(){
    return{
        // id: "INTEGER PRIMARY KEY AUTOINCREMENT",
		stateCode: "TEXT",
		cityCode: "TEXT",
		cityName: "TEXT"
    }
}

getStaticMasterTable(){
    return {
        // id: "INTEGER PRIMARY KEY AUTOINCREMENT",
		masterDataSeqId: "TEXT",
		staticDataDesc: "TEXT"
    }
}
    getRootTable() {
        return {
            // id: "INTEGER PRIMARYKEY AUTO_INCREMENT",
            createdDate: "DATETIME",
            deviceId: "VARCHAR(30)",
            createdUser: "VARCHAR(30)",
            referenceNumber: "VARCHAR(40)",
            submitStatus: "VARCHAR(5) DEFAULT 'N'",
            submitDate: "DATETIME",
            backup: "VARCHAR(1) DEFAULT 'N'",
            sync: "VARCHAR(1) DEFAULT 'N'",
            tempAppNo: "VARCHAR(30)"
        }
    }

    getPersonalTable() {
        return {
            // id: "INTEGER PRIMARYKEY AUTO_INCREMENT",
            refId: "INTEGER NOT NULL DEFAULT ''",
            title: "VARCHAR(10) NOT NULL DEFAULT ''",
            firstName: "VARCHAR(30) NOT NULL DEFAULT ''",
            middleName: "VARCHAR(30) NOT NULL DEFAULT ''",
            lastName: "VARCHAR(30) NOT NULL DEFAULT ''",
            gender: "VARCHAR(30) NOT NULL DEFAULT ''",
            mobileNumber: "BIGINT NOT NULL DEFAULT ''",
            email: "VARCHAR(50) NOT NULL DEFAULT ''",
            dob: "DATETIME NOT NULL DEFAULT ''",
            nationality: "VARCHAR(40) NOT NULL DEFAULT ''",
            addressType: "VARCHAR(20) DEFAULT 'Permanent'",
            samePermanentAdd: "VARCHAR(20) NOT NULL DEFAULT ''",
            permanentAddress: "VARCHAR(100) NOT NULL DEFAULT ''",
            residentialAddress: "VARCHAR(100) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",
            profileImage:"TEXT NOT NULL DEFAULT ''"
        }

    }
    getLoadTable() {
        return {
            refId: "INTEGER NOT NULL DEFAULT ''",
            id: "INTEGER NOT NULL DEFAULT ''",
            amountRequested: "VARCHAR(20) NOT NULL DEFAULT ''",
            interestType: "VARCHAR(20) NOT NULL DEFAULT ''",
            tenure: "VARCHAR(20) NOT NULL DEFAULT ''",
            moratorium: "VARCHAR(20)",
            repaymentMode: "VARCHAR(30) NOT NULL DEFAULT ''",
            repaymentType: "VARCHAR(30) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)"

        }
    }

    getKycTable() {
        return {
            refId: "INTEGER NOT NULL DEFAULT ''",
            id: "INTEGER NOT NULL DEFAULT ''",
            proofType: "VARCHAR(30) NOT NULL DEFAULT ''",
            proofDocument: "VARCHAR(30) NOT NULL DEFAULT ''",
            proofvalue: "VARCHAR(30) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",
        }
    }

    getIncomeTable() {
        return {
            refId: "INTEGER NOT NULL DEFAULT ''",
            id: "INTEGER NOT NULL DEFAULT ''",
            empCategoryType: "VARCHAR(30) NOT NULL DEFAULT ''",
            empName: "VARCHAR(40)",
            doj: "DATETIME NOT NULL DEFAULT ''",
            incomeType: "VARCHAR(40) NOT NULL DEFAULT ''",
            grossIncome: "VARCHAR(30) NOT NULL DEFAULT ''",
            otherDeductions: "VARCHAR(30) NOT NULL DEFAULT ''",
            netIncome: "VARCHAR(30) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",
        }
    }

    getDocumentTable(){
        return {
            refId:"INTEGER NOT NULL DEFAULT ''",
            id:"INTEGER NOT NULL DEFAULT ''",
            otherDocumentType:"VARCHAR(40) NOT NULL DEFAULT ''",
            // otherDescription:"VARCHAR(50) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",
            // imagePath:"VARCHAR(50) NOT NULL DEFAULT ''",
            // imageName:"VARCHAR(50) NOT NULL DEFAULT ''",
        }
    }

    getImageDocumentTable(){
        return{
            refId:"INTEGER NOT NULL DEFAULT ''",
            id:"INTEGER NOT NULL DEFAULT ''",
            otherDocumentType:"VARCHAR(40) NOT NULL DEFAULT ''",
            // otherDescription:"VARCHAR(50) NOT NULL DEFAULT ''",
            imagePath:"VARCHAR(100) NOT NULL DEFAULT ''",
            imageNativePath:"VARCHAR(100) NOT NULL DEFAULT ''",
            name:"VARCHAR(40) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",   
        }
    }


    getUploadDocumentTable(){
        return{
            refId:"INTEGER NOT NULL DEFAULT ''",
            id:"INTEGER NOT NULL DEFAULT ''",
            otherDocumentType:"VARCHAR(40) NOT NULL DEFAULT ''",
            imagePath:"VARCHAR(100) NOT NULL DEFAULT ''",
            name:"VARCHAR(40) NOT NULL DEFAULT ''",
            applicantType: "VARCHAR(20)",  
            status:"VARCHAR(5) DEFAULT 'N'"
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

    getKycProofType() {
        return [
            { Name: 'Id Proof', code: "01" },
            { Name: 'Address Proof', code: "02" }
        ]
    }

    getKycScanType() {
        return [
            { Name: 'QR', code: "01", icon: "qr-code-outline" },
            { Name: 'OCR', code: "02", icon: "image-outline" }
        ]
    }

    getKycproofList() {
        return [
            { Name: 'Pan Card', code: "01" },
            { Name: 'Aadhar Card', code: "02" },
            { Name: 'Voter ID Card', code: "03" },
            { Name: 'Passport', code: "04" },
            { Name: 'Driving License', code: "05" },
        ]
    }

}
