import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormcontrolService {

  constructor(private formbuilder: FormBuilder) {

  }


  // personalform() {
  //   return this.formbuilder.group({
  //     //title: ['', Validators.compose([Validators.required])],
  //     firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  //     middleName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
  //     lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  //     //gender: ['', Validators.compose([Validators.required])],
  //     mobileNumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}$')])],
  //     email: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'), Validators.required])],
  //     empId: ['378456'],
  //     source: [''],
  //     empName: ['empName', Validators.compose([Validators.required])],
  //     product: [''],
  //     schemeCode: [''],
  //     solId: [''],
  //     leadNo: [''],

  //     //nationality: [''],
  //     // company: ['', Validators.compose([Validators.pattern('[0-9a-zA-Z ]*'), Validators.required])],
  //     // addressType: ['Permanent'],
  //     // samePermanentAdd: [''],
  //     // permanentAddress: ['', Validators.compose([Validators.required])],
  //     // residentialAddress: ['', Validators.compose([Validators.required])],
  //     // customerCategory: ['', Validators.compose([Validators.required])],
  //     // custNationality: ['', Validators.compose([Validators.required])],
  //     // stlCustomer: ['', Validators.compose([Validators.required])],
  //     // custType: ['', Validators.compose([Validators.required])],
  //     // bankingWith: ['', Validators.compose([Validators.required])],
  //     // vipFlag: ['', Validators.compose([Validators.required])],
  //     // incomeAssign: ['', Validators.compose([Validators.required])],
  //     // cbrbResult: ['', Validators.compose([Validators.required])],
  //     // alEthiadBureau: ['', Validators.compose([Validators.required])],
  //     // accNo: ['', Validators.compose([Validators.required])],
  //     // passportNo: ['', Validators.compose([Validators.required])],
  //     // eidaNo: ['', Validators.compose([Validators.required])],
  //     // rimNo: ['', Validators.compose([Validators.required])],
  //     // poBoxNo: ['', Validators.compose([Validators.required])]
  //   });
  // }

  personalform() {
    return this.formbuilder.group({
        title: ['', Validators.compose([Validators.required])],
        firstName:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        middleName:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
        lastName:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        businessEntityName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        mobileNumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}$'), Validators.required])],
        //email: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'), Validators.required])],
        dateOfIncorporation: ['', Validators.compose([Validators.required])],
        vintage: ['', Validators.compose([Validators.required])],
        constitution: ['individual', Validators.compose([Validators.required])],
        sourceOfLead:['', Validators.compose([Validators.required])],
        cinNumber:['', Validators.compose([Validators.required])],
    });
}
  addressform(){
    return this.formbuilder.group({
        addressType: ['Business'],
        sameBusinessAdd: [''],
        businessAddress: ['', Validators.compose([Validators.required])],
        nearestLandmarkBA :['', Validators.compose([Validators.required])],
        stateBA :['', Validators.compose([Validators.required])],
        districtBA :[''],
        cityBA :['', Validators.compose([Validators.required])],
        pincodeBA :['', Validators.compose([Validators.required])],
        factoryAddress: ['', Validators.compose([Validators.required])],
        nearestLandmarkFA :['', Validators.compose([Validators.required])],
        stateFA :['', Validators.compose([Validators.required])],
        districtFA :[''],
        cityFA :['', Validators.compose([Validators.required])],
        pincodeFA :['', Validators.compose([Validators.required])],
    });
}



  incomeform() {
    return this.formbuilder.group({
      empCategoryType: ['', Validators.compose([Validators.required])],
      empName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)])],
      doj: ['', Validators.compose([Validators.required])],
      incomeType: ['', Validators.compose([Validators.required])],
      grossIncome: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.pattern('[0-9]*'), Validators.required])],
      // statutory: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      otherDeductions: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      netIncome: ['', Validators.compose([Validators.required])],
      // eosb: ['', Validators.compose([Validators.required])],
      // lengthService: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      // otherincomes: this.formbuilder.array([])
    })
  }


  // kycform() {
  //   return this.formbuilder.group({
  //     proofType: [''],
  //     proofDocument: ['', Validators.compose([Validators.required])],
  //     proofvalue: ['', Validators.compose([Validators.required])],
  //     // kycAddressType: ['', Validators.compose([Validators.required])],
  //     // kycAddressvalue: ['', Validators.compose([Validators.required])]
  //   });
  // }

  kycform() {
    return this.formbuilder.group({
        udyogNumber: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]{12}'), Validators.maxLength(12), Validators.minLength(12)])],
        panNumber: ['', Validators.compose([Validators.required,Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$'),Validators.maxLength(10), Validators.minLength(10)])],
        gstRegister: ['no', Validators.compose([Validators.required])],
        gstNumber: ['', Validators.compose([Validators.required])],
        leiNumber: ['', Validators.compose([Validators.required])],
    });
}

  personalNewform(biometric?) {
    if (biometric) {
      return this.formbuilder.group({
        gender: ['M'],
        dob: ['1996-06-04'],
        age: ['24'],
        fatherName: ['Selvaraj', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)])],
        addressLine1: ['1/384, Easwaran Kovil St'],
        addressLine2: ['Mugaliwakkam'],
        village: [],
        taluka: [],
        district: ['Chennai'],
        state: ['Tamil Nadu'],
        pincode: ['600125'],
        picFromAadhar: [],
        picManual: [],
        currentAddress: ['checked'],
        updateCurrentAddress: ['Swetha Builders, Gerugambakkam, Chennai-129'],
        profileType: ["01"],
      })
    } else {
      return this.formbuilder.group({
        gender: [],
        dob: [],
        age: [],
        fatherName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)])],
        addressLine1: [],
        addressLine2: [],
        village: [],
        taluka: [],
        district: [],
        state: [],
        pincode: [],
        picFromAadhar: [],
        picManual: [],
        currentAddress: [],
        updateCurrentAddress: [],
        profileType: ["01"],
      })
    }
  }


  loanform() {
    return this.formbuilder.group({
      // product: ['', Validators.compose([Validators.required])],

      // producttype: ['1', Validators.compose([Validators.required])],
      // loan_amount_range: ['', Validators.compose([Validators.min(250000), Validators.max(25000000)])],
      make: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      variant: ['', Validators.compose([Validators.required])],
      ndlp: [''],
      amountRequested: ['', Validators.compose([Validators.required])],
      landHolding: ['', Validators.compose([Validators.required])],
      quotationAmount: [],
      houseDistance: [],
      residenceStability: [],
      voterId: [],
      form60: [],
      otp: [],
      // interestType: ['', Validators.compose([Validators.required])],
      // tenure: ['', Validators.compose([Validators.maxLength(3), Validators.minLength(1), Validators.pattern('[0-9]*'), Validators.required])],
      // moratorium: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(3), Validators.minLength(1), Validators.required])],
      // mclr: '',
      // loanpurpose: '',
      // repaymentMode: ['', Validators.compose([Validators.required])],
      // repaymentType: ['', Validators.compose([Validators.required])],
      // proposalType: ['', Validators.compose([Validators.required])],
      // amortization: ['', Validators.compose([Validators.required])]
    });
  }


  otherDocumnetForm() {
    return this.formbuilder.group({
      otherDocumentType: ['', Validators.compose([Validators.required])],
      // otherDescription: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
    });
  }



  applicationDetailsform(fidata) {
    console.log("form", fidata.RM_Name)
    return this.formbuilder.group({
      rmName: [fidata.RM_Name],
      rmEmpNo: [fidata.RM_EmpNo],
      appNo: [fidata.App_No],
      rmLoc: [fidata.RMLocation],
      dov: [fidata.DOV],
      appName: [fidata.Applicant_Name],
      addDeclare: [fidata.Addess_declare],
      fieldInspect: [''],
      VCAddress: [''],
      samePermanentAdd: [''],
      addressFLine: [''],
      addressSLine: [''],
      village: [''],
      taluka: [''],
      district: [''],
      state: [''],
      pincode: [''],
    })
  }

  informationDetailsform() {
    return this.formbuilder.group({
      name: [''],
      contactNo: [''],
      relApplicant: [''],
      roleDeal: [''],
    });
  }

  familyDetailsform() {
    return this.formbuilder.group({
      name: [''],
      relWithApp: [''],
      age: [''],
      wheDependent: [''],
      famEarn: [''],
    });
  }


  generalDetailsform(fidata) {
    return this.formbuilder.group({
      typeOfHouse: [''],
      residenceStatus: [''],
      appResidence: [''],
      borrowerType: [''],
      noOfYears: [fidata.Years_in_village],
      houseDistance: [fidata.House_Distance],
      collectRecov: [''],
      sourceIrri: [''],
      typeIrri: [''],
      cropsGrown: [''],
      recLoanAmt: [fidata.Recommended_Loan_Amt],
      costProject: [fidata.Cost_Project],
      preTenure: [fidata.Prepayment_Tenure],
      repayType: [fidata.Repayments_Type],
      repayDet: [''],
      minMargin: [''],
      geneComments: [''],
      specificObser: [''],
      noOfYearSame: [''],
      houseDistanceSame: [''],
    });
  }

  otherAssetsform() {
    return this.formbuilder.group({
      twoWheeler: [''],
      fourWheeler: [''],
      farmEquip: [''],
    });
  }

  profileDetailsform() {
    return this.formbuilder.group({
      appCoapp: [''],
      incomeElli: [''],
      landElli: [''],
      cautiousList: [''],
    });
  }

  incomeDetailsform() {
    return this.formbuilder.group({
      incomeCrop: [''],
      incomeAllied: [''],
      incomeOther: [''],
      incomeTractor: [''],
      incomeBusiness: [''],
      incomeTotal: [''],
    });
  }

  obligationsform(fiData) {
    return this.formbuilder.group({
      borrName: [fiData.Borrower_Name],
      faciType: [fiData.Facility_Type],
      accType: [fiData.Account_Type],
      sanAmt: [fiData.Sanction_Amt],
      outstandAmt: [fiData.Outstanding_Amt],
      obligaAnnual: [fiData.Annual_obj],
      ovedue: [fiData.Overdue],
      presenrDpd: [fiData.Present_DPD],
      maxDpd: [fiData.Max_DPD],
      wActive: [''],

    });
  }

  obligationsAddform() {
    return this.formbuilder.group({
      addborrName: [''],
      addFaciType: [''],
      addSanAmt: [''],
      addOutAmt: [''],
      Emi: [''],
      wheMonth: [''],
      wheObligate: [''],
    });
  }


  assetDetailsform() {
    return this.formbuilder.group({
      nameDealer: [''],
      typeAsset: [''],
      makeModel: [''],
      datePurchase: [''],
      assetCondition: [''],
      purPrice: [''],
      loanAmt: [''],
      sourceMargin: [''],
      tenure: [''],
      repayFre: [''],
      bankDeposits: [''],
      totalAssets: [''],
      netWorth: [''],
    });
  }

  landHoldingsform(fiData) {
    return this.formbuilder.group({
      appType: [fiData.App_Type],
      nameOwner: [''],
      wheOwnLeased: [''],
      village: [''],
      taluka: [''],
      state: [''],
      district: [''],
      bankDistance: [''],
      gatSurNo: [''],
      totalArea: [''],
      perArea: [''],
      shareLand: [fiData.Share_Land_Holding],
      totalLand: [fiData.Total_Land_Holding],
      sourceIrri: [''],
    });
  }

  // referenceDetailsform() {
  //   return this.formbuilder.group({
  //     name: [''],
  //     contact: [''],
  //     address: [''],
  //     feedback: [''],
  //     refName: [''],
  //     refContact: [''],
  //     refAddress: [''],
  //     refFeedback: [''],
  //     creditAvail: [''],
  //     cifDetails: [''],
  //     posNeg: [''],
  //   });
  // }
  referenceDetailsform() {
    return this.formbuilder.group({
      name: [''],
      occupation:[''],
      mobNo: [''],
      address: ['']
    });
  }
  getLiabilitesBorrowerform() {
    return this.formbuilder.group({
      borrowFrom: [''],
      purpose:[''],
      amt: [''],
      security: [''],
      repayment: [''],
      outstandBal: ['']
    });
  }
  getGurantorLiabilitesform() {
    return this.formbuilder.group({
      personName: [''],
      bankName:[''],
      gurantAmt: [''],
      accStatus: [''],
      outstandBal: ['']
    });
  }

  assetImmovableForm(){
    return this.formbuilder.group({
      assetTypeTab:['immovable'],
      assetType : [],
      nonAgriLandType : [],
      ownName : [],
      area  : [],
      freeHold  : [],
      address : [],
      purchaseCost  : [],
      presentValue  : [],
      whetherEncumbered : [],
    });
  }

  assetMovableInsuranceForm(){
    return this.formbuilder.group({
      companyName :[],
      branchName:[],
      policyNo  :[],
      dateOfIssue :[],
      sumAssured        :[],
      surrenderValue  :[],
      annualPremium :[],
      premiumUpto :[]
    })
  }

  assetMovableMutualFundForm(){
    return this.formbuilder.group({
      companyName : [],
      numOfShare  : [],
      certificateNo : [],
      scheme  : [],
      fullPaid  : [],
      currentMarketValue  : [],
    })
  }

  assetMovableTermDepositForm(){
    return this.formbuilder.group({
      receiptNo : [],
      bankName  : [],
      type  : [],
      amountOfReceipt : [],
      dateOfReceipt : [],
      maturityDate  : [],
      maturityAmount  : [],
    })
  }

  assetMovableInvestmentForm(){
    return this.formbuilder.group({
      certificateNo : [],
      natureOfSecurity  : [],
      dateOfPurchase  : [],
      issuingOffice : [],
      faceValue : [],
      dueDate : [],
      maturityAmount  : [],
    })
  }

  assetMovableVehiclesForm(){
    return this.formbuilder.group({
      vehicleType :[],
      registrationNo :[],
      model :[],
      yearOfMake  :[],
      purchaseCost  :[],
      rcBookDetails :[],
      presentValue  :[],
    })
  }

  assetMovableJewelleryForm(){
    return this.formbuilder.group({
      jewellType  : [],
      quantity  : [],
      valuation : [],
      otherDetails  : [],
    })
  }

  assetMovableBusinessInvestmentForm(){
    return this.formbuilder.group({
      companyName : [],
      amount  : [],
      otherDetails  : [],
    });
  }

  assetMovableOtherInvestmentForm(){
    return this.formbuilder.group({
      assetName : [],
      amount  : [],
      otherDetails  : [],
    })
  }

  preSanctionform() {
    return this.formbuilder.group({
      remarks: ['']
      
    });
  }
  checkEligibilityForm() {
    return this.formbuilder.group({
      borCib: [''],
      proCib:[''],
      exiLia: [''],
      loanApply: [''],
      amtTenor: [''],
      policyPar: ['']
    });
  }

  loanDetailsform() {
    return this.formbuilder.group({
      custSeg: [''],
      product:['',Validators.required],
      facility: [''],
      loanAmt: [''],
      period: [''],
      interest: [''],
      emi: [''],
      branch: [''],
      loanPurpose: ['']
    });
  }
  monthlyFinancialform() {
    return this.formbuilder.group({
      grossSale: [''],
      netProfit:[''],
      monthlySales: [''],
      otherIncome: [''],
      totalIncome: [''],
      stock: [''],
      rentExp: [''],
    });
  }


  accountDetailsform() {
    return this.formbuilder.group({
      loanPurpose: [''],
      pslCode: ['']
    })
  }
  securityDetailsform() {
    return this.formbuilder.group({
      facType: [''],
      secType: [''],
      charType: [''],
      secParticular: [''],
      secvalue: [''],
    })
  }
  cifDetailsform() {
    return this.formbuilder.group({
      staIndicator: [''],
      motherName: [''],
      panNo: [''],
      comReligi: [''],
      eduQua: [''],
      speCate: [''],
      scSt: [''],
      marStatus: [''],
    })
  }

  preDocDetailsform() {
    return this.formbuilder.group({
      preDocument: [''],
      quoDealer: [''],
      crossSell: [''],
    });
  }
  postDocDetailsform() {
    return this.formbuilder.group({
      postDocument: [''],
    });
  }

  getOtherDocsForm(){
    return this.formbuilder.group({
      appType: [''],
      docType: [''],
    });
  }

  insurancedetailsForm() {
    return this.formbuilder.group({
      insPolicy: [''],
      insAmount: [''],
      insBenefit: [''],
      insNomName: [''],
      insNomDOB: [''],
      insNomGender: [''],
      insNomMobNum: [''],
      insNomRelate: [''],
      insNomRemarks: ['']
    });
  }

  repaymentSchedule() {
    return this.formbuilder.group({
      propNum: ['111111111'],
      Tenor: ['36'],
      prodCode: ['137'],
      propLimit: ['5000000'],
      repayType: [''],
      flowId: [''],
      startDate: [''],
      noOfInstall: [''],
      frequency: [''],
      amount: ['']
    });
  }
  groupConcern() {
    return this.formbuilder.group({
      nameofAssCon: [''],
      constitution: [''],
      addOfAssCon: [''],
      
    });
  }

  getMasterData() {
    return this.formbuilder.group({
      state: [''],
      
    });
  }

  followUpFields() {
    return this.formbuilder.group({
      followPriod: [''],
      followFrom: [''],
      followTo: ['']
    });
  }

  prospectiveLeads() {
    return this.formbuilder.group({
      prosBusiName: [''],
      prosCustName: [''],
      prosContact: [''],
      prosStatus: [''],
      prosDate: [''],
      prosBusiType: [''],
      prosProduct: [''],
      prosEstimate: [''],
      prosRemarks: ['']
    });
  }

  getauditlogform() {
    return this.formbuilder.group({
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])]
    });
  }



}
