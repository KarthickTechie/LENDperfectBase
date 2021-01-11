import { GlobalService } from './../providers/global.service';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root'
})

export class HandlingError {

    constructor(public global: GlobalService) {
        // this.global.presentAlert(`Login`, `Please Enter the username and password!`);
    }

    // getUserPass() {
    //     this.global.presentAlert("Login", "Please Enter the username and password!");
    // }

    // pinCheck() {
    //     this.global.presentAlert('Alert', 'Plese Enter Your 4 Digit Pin.')
    // }
    // getValidPin() {
    //     this.global.presentAlert(`Alert`, `Please enter a valid pin!`);
    // }
    // pinNotMatch() {
    //     this.global.presentAlert('Alert', " Your Pin Doesn't Match.")
    // }
    // pinField() {
    //     this.global.presentAlert(`Alert`, `Please Fill Both Pin Field!`);
    // }

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
    ocrErrorInCapture() {
        this.global.presentAlert("Alert", "Error Occured while capturing Image, Please try Again.! ")
    }
    panCardSuccessAlert() {
        this.global.presentAlert("Alert", "", "PAN Card Scanned Successfully");
    }
    notScanPan() {
        this.global.presentAlert("Alert", "Didn't Scan Pan Card ", 'Kindly choose your Document Correctly.')
    }
    aadharCardSuccessAlert() {
        this.global.presentAlert("Alert", "", "Aadhar Card Scanned Successfully");
    }
    notScanAadhar() {
        this.global.presentAlert("Alert", "Didn't Scan Aadhar Card ", 'Kindly choose your Document Correctly.')
    }
    dlSuccessAlert() {
        this.global.presentAlert("Alert", "", "Driving License Scanned Successfully");
    }
    notScanDl() {
        this.global.presentAlert("Alert", "Didn't Scan Driving License ", 'Kindly choose your Document Correctly.')
    }
    voterSuccessAlert() {
        this.global.presentAlert("Alert", "", "Voter ID Scanned Successfully");
    }
    notScanVoter() {
        this.global.presentAlert("Alert", "Didn't Scan Voter ID ", 'Kindly choose your Document Correctly.')
    }
    qrScannerErr() {
        this.global.presentAlert("Alert", "Error Occured in Scanning Process");
    }
    qrResFormatErr() {
        this.global.presentAlert("Alert", "QR Response doen't Match with valid format");
    }
    kycNotMatchErr() {
        this.global.presentAlert("Alert", "QR Response doen't Match with Proof Selected");
    }
    chooseProofDocument() {
        this.global.presentAlert(`Alert`, `Please Select KYC Proof Type and Proof Document`);
    }
    backupListExceeds() {
        this.global.presentAlert(`Alert`, `Maximum 10 Applications can be select to Back-up process`);
    }
    backupListMinCount() {
        this.global.presentAlert(`Alert`, `Maximum 1 Application needed to start the Back-up process`);
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
            residentialStatus: [
                { type: "required", message: "Select Residential Status." },
            ],
            panNo: [
                { type: "required", message: "Enter PAN number." },
                { type: "pattern", message: "Enter Valid PAN number." },
            ],
            aadharNo: [
                { type: "pattern", message: "Enter Valid Aadhar number." },
            ],
            presentAddress1: [
                { type: "required", message: "Enter Present Address1." },
            ],
            presentAddress2: [
                { type: "required", message: "Enter Present Address2." },
            ],
            presentDistrict: [
                { type: "required", message: "Enter Present District." },
            ],
            presentCity: [
                { type: "required", message: "Enter Present City." },
            ],
            presentState: [
                { type: "required", message: "Enter Present State." },
            ],

            permanentAddress1: [
                { type: "required", message: "Enter Permanent Address1." },
            ],
            permanentAddress2: [
                { type: "required", message: "Enter Permanent Address2." },
            ],
            permanentDistrict: [
                { type: "required", message: "Enter Permanent District." },
            ],
            permanentCity: [
                { type: "required", message: "Enter Permanent City." },
            ],
            permanentState: [
                { type: "required", message: "Enter Permanent State." },
            ]
        };
    }

    addressValid() {
        return {
            businessAddress: [
                { type: "required", message: "Enter Business Address." },
                { type: "pattern", message: "Enter Valid Business Address." },
            ],
            nearestLandmarkBA: [
                { type: "required", message: "Enter Nearest Landmark of Business Address." },
                { type: "pattern", message: "Enter Valid Nearest Landmark of Business Address." },
            ],
            stateBA: [
                { type: "required", message: "Select State of Business Address." },
            ],
            districtBA: [
                { type: "pattern", message: "Enter Valid District of Business Address." },
            ],
            cityBA: [
                { type: "required", message: "Select City of Business Address." },
            ],
            pincodeBA: [
                { type: "required", message: "Enter Pincode of Business Address." },
                { type: "pattern", message: "Enter Valid Pincode of Business Address." },
            ],
            factoryAddress: [
                { type: "required", message: "Enter Unit / Factory Address." },
                { type: "pattern", message: "Enter Valid Business Address." },
            ],
            nearestLandmarkFA: [
                { type: "required", message: "Enter Nearest Landmark of Unit / Factory Address." },
                { type: "pattern", message: "Enter Valid Nearest Landmark of Unit / Factory Address." },
            ],
            stateFA: [
                { type: "required", message: "Select State of Unit / Factory Address." },
            ],
            districtFA: [
                { type: "pattern", message: "Enter Valid District of Unit / Factory Address." },
            ],
            cityFA: [
                { type: "required", message: "Select City of Unit / Factory Address." },
            ],
            pincodeFA: [
                { type: "required", message: "Enter Pincode of Unit / Factory Address." },
                { type: "pattern", message: "Enter Valid Pincode of Unit / Factory Address." },
            ]
        };
    }

    incomevalid() {
        return {
            empCategoryType: [
                { type: "required", message: "Select Employment Category Type." }
            ],
            empName: [
                { type: "required", message: "Enter Employer Name." },
                { type: "pattern", message: "Enter valid Employer Name." }
            ],
            doj: [
                { type: "required", message: "Select Date of Joining." }
            ],
            takeIncome: [
                { type: "required", message: "Enter Net Take Home." },
                { type: "pattern", message: "Enter valid Net Take Home." }

            ],
            grossIncome: [
                { type: "required", message: "Enter Gross Income." },
                { type: "pattern", message: "Enter valid Gross Income." }

            ],
            otherEmi: [
                { type: "required", message: "Enter Other EMI" },
                { type: "pattern", message: "Enter valid Other EMI." }
            ],
            netIncome: [
                { type: "required", message: "Enter Net Income." },
                { type: "pattern", message: "Enter valid Net Income" }

            ],
            natureBusiness: [
                { type: "required", message: " Enter Nature of Business" },
                { type: "pattern", message: "Enter valid Nature of Business" }

            ],
            yearOfEsta: [
                { type: "required", message: " Enter Year of Establishment" }
            ],
            businessIncome: [
                { type: "required", message: " Enter Business Income." },
                { type: "pattern", message: "Enter valid Business Income." }

            ],
            otherIncome: [
                { type: "required", message: " Enter Other Income." },
                { type: "pattern", message: "Enter valid Other Income." }

            ],
            otherObi: [
                { type: "required", message: " Enter Other Obligations." },
                { type: "pattern", message: "Enter valid Other Obligations." }

            ],
            deduction: [
                { type: "required", message: " Enter Deduction." },
                { type: "pattern", message: "Enter valid Deduction." }

            ],
            totalNetIncome: [
                { type: "required", message: " Enter Total Net Income." },
                { type: "pattern", message: "Enter valid Total Net Income." }

            ],
            itrReturn: [
                { type: "required", message: " Enter ITR returns(3 years)." },
                { type: "pattern", message: "Enter valid ITR returns(3 years)." }

            ]
        }
    }


    kycFormValidation() {
        return {
            proofType: [
                { type: "required", message: "Select Proof Type." },
            ],
            proofDocument: [
                { type: "required", message: "Select Proof Document." },
            ],
            panNumber: [
                { type: "required", message: "Enter PAN Number." },
                { type: "pattern", message: "Enter Valid PAN Number ." }

            ],
            udyogNumber: [
                { type: "required", message: "Enter Aadhaar Number." },
                { type: "pattern", message: "Enter Valid Aadhaar Number." }

            ]
        }
    }

    loanFormValidation() {
        return {

            loanProduct: [
                { type: "required", message: "Select Loan Product Type." }
            ],
            amountRequested: [
                { type: "required", message: "Enter Amount Requested." }
            ],
            tenure: [
                { type: "required", message: "Enter Periodicity of Installments (In Months)." },
                { type: "pattern", message: "Enter Valid Installments Period (In Months). " }
            ],
            roi: [
                { type: "required", message: "Enter Rate of Interest." }
            ],
            EMI: [
                { type: "required", message: "Enter EMI." }
            ],
            preferredBranch: [
                { type: "required", message: "Select Preferred Branch." }
            ]

        }
    }

    otherDocumentFormValidation() {
        return {
            otherDocumentType: [
                { type: "required", message: "Select Document Type." }
            ],
            otherDescription: [
                { type: "required", message: "Enter Document Description." },
                { type: "pattern", message: "Enter Valid Document Description." }
            ]
        }
    }

    assetImmovableValid() {
        return {
            assetType: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            nonAgriLandType: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            ownName: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            area: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            freeHold: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            address: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            purchaseCost: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            presentValue: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
            whetherEncumbered: [
                { type: "required", message: "." },
                { type: "pattern", message: "." }
            ],
        }
    }

}
