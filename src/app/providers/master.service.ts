import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  getLoginTable() {
    return {
      //  id:  "INTEGER PRIMARYKEY AUTOINCREMENT",
      createddate: "DATETIME",
      deviceid: "TEXT NOT NULL DEFAULT ''",
      createduser: "VARCHAR(30) NOT NULL DEFAULT ''",
    }
  }

  getMasterTable() {
    return {
      code: "TEXT NOT NULL DEFAULT ''",
      name: "TEXT NOT NULL DEFAULT ''",
      master_id: "TEXT",
      refName: "TEXT"

    }
  }
  getprofileTypeList() {
    return [
      { Name: 'Profile', code: '01' },
      { Name: 'Occupation', code: '02' },
    ]
  }

  getStateTable() {
    return {
      // id: "INTEGER PRIMARY KEY AUTOINCREMENT",
      stateCode: "TEXT",
      stateName: "TEXT"
    }
  }

  getCityTable() {
    return {
      // id: "INTEGER PRIMARY KEY AUTOINCREMENT",
      stateCode: "TEXT",
      cityCode: "TEXT",
      cityName: "TEXT"
    }
  }

  getStaticMasterTable() {
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
      profileImage: "TEXT NOT NULL DEFAULT ''"
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

  getDocumentTable() {
    return {
      refId: "INTEGER NOT NULL DEFAULT ''",
      id: "INTEGER NOT NULL DEFAULT ''",
      otherDocumentType: "VARCHAR(40) NOT NULL DEFAULT ''",
      // otherDescription:"VARCHAR(50) NOT NULL DEFAULT ''",
      applicantType: "VARCHAR(20)",
      // imagePath:"VARCHAR(50) NOT NULL DEFAULT ''",
      // imageName:"VARCHAR(50) NOT NULL DEFAULT ''",
    }
  }

  getImageDocumentTable() {
    return {
      refId: "INTEGER NOT NULL DEFAULT ''",
      id: "INTEGER NOT NULL DEFAULT ''",
      otherDocumentType: "VARCHAR(40) NOT NULL DEFAULT ''",
      // otherDescription:"VARCHAR(50) NOT NULL DEFAULT ''",
      imagePath: "VARCHAR(100) NOT NULL DEFAULT ''",
      imageNativePath: "VARCHAR(100) NOT NULL DEFAULT ''",
      name: "VARCHAR(40) NOT NULL DEFAULT ''",
      applicantType: "VARCHAR(20)",
    }
  }


  getUploadDocumentTable() {
    return {
      refId: "INTEGER NOT NULL DEFAULT ''",
      id: "INTEGER NOT NULL DEFAULT ''",
      otherDocumentType: "VARCHAR(40) NOT NULL DEFAULT ''",
      imagePath: "VARCHAR(100) NOT NULL DEFAULT ''",
      name: "VARCHAR(40) NOT NULL DEFAULT ''",
      applicantType: "VARCHAR(20)",
      status: "VARCHAR(5) DEFAULT 'N'"
    }
  }


  getTitleList() {
    return [
      { OptionDesc: 'MR', code: '01' },
      { OptionDesc: 'MRS', code: '02' },
      { OptionDesc: 'M/S', code: '03' }
    ];
  }

  getSchemeCodeList() {
    return [
      { Name: "Scheme 1", code: '1' },
      { Name: "Scheme 2", code: '2' },
      { Name: "Scheme 3", code: '3' },
    ]
  }

  getSourceList() {
    return [
      { Name: "Dealer", code: 'dealer' },
      { Name: "DSA", code: 'dsa' },
    ]
  }


  getProductList() {
    return [
      { Name: "Product 1", code: '1' },
      { Name: "Product 2", code: '2' },
      { Name: "Product 3", code: '3' },
    ]
  }

  getEmpNameList() {
    return [
      { Name: "Employee Name", code: 'empName' },
      { Name: "Dealer Name", code: 'dealerName' },
    ]
  }


  getSolIdList() {
    return [
      { Name: " Sol ID 1", code: '1' },
      { Name: "Sol ID 2", code: '2' },
      { Name: "Sol ID 3", code: '3' },
    ]
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

  getMakeList() {
    return [
      { Name: "Option 1", code: '01' },
      { Name: "Option 2", code: '02' },
      { Name: "Option 3", code: '03' }
    ]
  }

  getModelList() {
    return [
      { Name: "Option 1", code: '01' },
      { Name: "Option 2", code: '02' },
      { Name: "Option 3", code: '03' }
    ]
  }

  getVariantList() {
    return [
      { Name: "Option 1", code: '01' },
      { Name: "Option 2", code: '02' },
      { Name: "Option 3", code: '03' }
    ]
  }

  getNdlpList() {
    return [
      { Name: "Option 1", code: '01' },
      { Name: "Option 2", code: '02' },
      { Name: "Option 3", code: '03' }
    ]
  }

  getResidenceStabilityList() {
    return [
      { Name: "Option 1", code: '01' },
      { Name: "Option 2", code: '02' },
      { Name: "Option 3", code: '03' }
    ]
  } //getResidenceStabilityList

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
      // { Name: 'Address Proof', code: "02" }
    ]
  }

  getKycScanType() {
    return [
      { Name: 'QR', code: "01", icon: "qr-code-outline" },
      { Name: 'OCR', code: "02", icon: "image-outline" }
    ]
  }
  getKycScanTypePan() {
    return [
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

  getFieldInspectList() {
    return [
      { Name: 'Product 1', code: "01" },
      { Name: 'Product 2', code: "02" },
      { Name: 'Product 3', code: "03" },
    ]
  }
  getConstitutionList() {
    return [
      { Name: 'Product 1', code: "01" },
      { Name: 'Product 2', code: "02" },
      { Name: 'Product 3', code: "03" },
    ]
  }

  getConstitutionListss() {
    return [
      { OptionDesc: 'Individual', code: 'individual' },
      { OptionDesc: 'Non Individual', code: 'nonIndividual' },
    ];
  }
  getsourceOfLeadList() {
    return [
      { OptionDesc: 'LOV', code: '01' },
      { OptionDesc: 'Marketing Officer', code: '02' },
      { OptionDesc: 'Online banking', code: '03' },
      { OptionDesc: 'Call center', code: '04' }
    ];
  }

  getStateList() {
    return [
      { Name: 'Delhi', code: 'delhi' },
      { Name: 'Karnataka', code: 'karnataka' },
      { Name: 'Kerala', code: 'kerala' },
      { Name: 'Tamil Nadu', code: 'tn' },
      { Name: 'Udhar Pradesh', code: 'up' },
      { Name: 'Gujarat', code: 'gujarat' },
    ];
  }


  getCityList() {
    return [
      { Name: 'Chennai', code: 'chennai' },
      { Name: 'Mumbai', code: 'mumbai' },
      { Name: 'Bangalore', code: 'bangalore' },
      { Name: 'Hyderabad', code: 'hyderabad' }
    ];
  }

  getbranchList() {
    return [
      { Name: 'Branch 1', code: "01" },
      { Name: 'Branch 2', code: "02" },
      { Name: 'Branch 3', code: "03" },
    ]
  }
  getloanPurposeList() {
    return [
      { Name: 'Purpose 1', code: "01" },
      { Name: 'Purpose 2', code: "02" },
      { Name: 'Purpose 3', code: "03" },
    ]
  }
  getcustomerSegmentList() {
    return [
      { Name: 'segment 1', code: "01" },
      { Name: 'segment 2', code: "02" },
      { Name: 'segment 3', code: "03" },
    ]
  }
  getproductList() {
    return [
      { Name: 'Product 1', code: "01" },
      { Name: 'Product 2', code: "02" },
      { Name: 'Product 3', code: "03" },
    ]
  }
  getfacilityList() {
    return [
      { Name: 'facility 1', code: "01" },
      { Name: 'facility 2', code: "02" },
      { Name: 'facility 3', code: "03" },
    ]
  }



  getWheelerList() {
    return [
      { Name: '1', code: "01" },
      { Name: '2', code: "02" },
      { Name: '3', code: "03" },
      { Name: '4', code: "04" },
      { Name: '5', code: "05" },
      { Name: '6', code: "06" },
      { Name: '7', code: "07" },
      { Name: '8', code: "08" },
      { Name: '9', code: "09" },
      { Name: '10', code: "10" },
    ]
  }

  getAppList() {
    return [
      { Name: 'Applicant', code: "01" },
      { Name: 'Co-Applicant', code: "02" },
    ]
  }

  getConfirmList() {
    return [
      { Name: 'Yes', code: "01" },
      { Name: 'No', code: "02" },
    ]
  }



  getActiveCloseList() {
    return [
      { Name: 'Active', code: "01" },
      { Name: 'Closed', code: "02" },
    ]

  }

  getOwnLeasedList() {
    return [
      { Name: 'Owned', code: "01" },
      { Name: 'Leased', code: "02" },
    ]

  }

  getPosNegList() {
    return [
      { Name: 'Positive', code: "01" },
      { Name: 'Negative', code: "02" },
    ]

  }


  getPreDocList() {
    return [
      { Name: 'KYC document', code: "01" },
      { Name: 'Land Documents', code: "02" },
      { Name: 'FI Copy/Mobile App', code: "03" },
      { Name: 'Track Record', code: "04" },
      { Name: 'Any other document', code: "05" },
    ]
  }
  getPostDocList() {
    return [
      { Name: 'NACH / UDC', code: "01" },
      { Name: 'Application form ', code: "02" },
      { Name: 'Loan Agreement', code: "03" },
      { Name: 'RTO Forms', code: "04" },
      { Name: 'Any other document', code: "05" },
    ]
  }
  getOtherDocList() {
    return [
      { Name: 'NACH / UDC', code: "0" },
      { Name: 'Application form ', code: "1" },
      { Name: 'Loan Agreement', code: "2" },
      { Name: 'RTO Forms', code: "3" },
      { Name: 'Any other document', code: "4" },
    ]
  }
  getapplicantList() {
    return [
      { Name: 'Borrower', code: "01" },
      { Name: 'Promoter ', code: "02" },
      { Name: 'Gurantor', code: "03" },
    ]
  }

  getAssetTypeList() {
    return [
      { Name: 'Non Agri Land', code: "nonAgriLand" },
      { Name: 'Flat / House ', code: "flat" },
      { Name: 'Agri Land', code: "agriLand" },
      { Name: 'Others', code: "other" },
    ];
  }

  getNonAgriLandTypeList() {
    return [
      { Name: 'Commercial', code: "commercial" },
      { Name: 'Resedential', code: "resedential" }
    ];
  }

  getYesNoList() {
    return [
      { Name: 'Yes', code: "yes" },
      { Name: 'No', code: "no" }
    ];
  }

  getJewellTypeList() {
    return [
      { Name: 'Gold', code: "gold" },
      { Name: 'Silver', code: "silver" },
      { Name: 'Others', code: "others" }
    ];
  }



  getAuditTable() {
    return {
      // auditid: "INTEGER PRIMARY KEY AUTOINCREMENT",
      deviceID: "TEXT",
      username: "TEXT",
      Timestamp: "TEXT",
      auditDate: "",
      service: "TEXT",
      action: "TEXT",
      value: "BLOB"
    }
  }





}
