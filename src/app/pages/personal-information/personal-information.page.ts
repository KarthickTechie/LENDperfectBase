import { KycScanOptionComponent } from './../../component/kyc-scan-option/kyc-scan-option.component';
import { RestService } from 'src/app/providers/rest';
import { DocumentuploadService } from './../../providers/documentupload.service';
import { CommonNativePluginsService } from './../../utility/common-native-plugins.service';
import { Subscription } from 'rxjs';
import { KycScanAPI, ScannerOptions } from './../../utility/kyc-scan-api';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { OtpcheckComponent } from './../../component/otpcheck/otpcheck.component';
import { MasterService } from './../../providers/master.service';
import { GlobalService } from './../../providers/global.service';
import { AlertController, ModalController, ActionSheetController, Platform, PopoverController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HandlingError } from './../../utility/ErrorHandling';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
// import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { take, delay } from 'rxjs/operators';



@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  personalDetails: FormGroup;
  addressDetails: FormGroup;
  kycDetails: FormGroup;
  loanDetails: FormGroup;

  validation_messages: any;
  validation_messages_address: any;
  applicantType: any;
  validation_messages_kyc: any;

  titleList: any;
  constitutionList: any;
  sourceOfLeadList: any;
  cityList: any;
  stateList: any;
  errorMessage: any;


  showIndividual: boolean = true;
  showNonIndividual: boolean = false;


  items: any = [];
  convertFile: any;
  udhyogImage: any;
  personalUpHide: boolean = false;
  addressUpHide: boolean = false;
  kycUpHide: boolean = false;
  loanUpHide: boolean = false;

  kycAadharHide: boolean = false;
  kycPanHide: boolean = false;
  kycGstHide: boolean = false;
  kycLeiHide: boolean = false;
  itemsAadhar: any = [];
  itemsPan: any = [];
  itemsGst: any = [];
  itemsLei: any = [];
  gstNo: any;

  //address
  addressType: String;
  ionCheck: boolean = false;
  itemsAdd: any = [];

  //kyc
  itemsKYC: any = [];
  showGstRegister: boolean = false;

  //loan
  itemsLoan: any = [];
  branchList: any;
  loanPurposeList: any;
  customerSegmentList: any;
  productList: any;
  facilityList: any;
  pageName: any;
  appType: any;
  showDetails: boolean = true;
  @ViewChild('fillBadge', { static: false }) fillBadge: ElementRef;

  //verifiedButton
  mobileVerified = false;
  beforeVerify = true;
  otpSub: Subscription;
  showCinVerified = false;
  cinSub: Subscription;
  aadharSub: Subscription;
  gstSub: Subscription;
  scansubscrip: Subscription;

  showAadharverify = false;
  showPanverify = false;
  showGSTverify = false;
  showLeiverify = false;
  viewAadharDoc = true;
  viewLeiDoc = true;
  viewGstDoc = true;
  viewPanDoc = true;
  aadharCount = 0;
  panCount = 0;
  gstCount = 0;
  leiCount = 0;
  kycVid = 'kycVideo';
  responseURL: any;
  initiateVid = true;
  processVid = false;
  proceedVid = false;
  successVid = false;

  resume = false;
  requestID: any;
  kycChange = false;
  personChange = false;
  loanChange = false;
  addrChange = false;
  constitution: any = 'individual';

  Documents = [{ docName: 'aadhar', imgs: [] }, { docName: 'pan', imgs: [] }, { docName: 'gst', imgs: [] }, { docName: 'lei', imgs: [] }]



  constructor(public formctrl: FormcontrolService, private errorHandling: HandlingError, public camera: Camera, public webview: WebView, public file: File,
    public master: MasterService, public global: GlobalService, public modalController: ModalController, public alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute, public render: Renderer2, public scanner: KycScanAPI, public actionSheetController: ActionSheetController,
    public plugin: CommonNativePluginsService, public docUploadService: DocumentuploadService, public router: Router, public restService: RestService,
    public platform: Platform, public popoverController: PopoverController) {
    this.addressType = "Business";
    this.items = [{ expanded: false }];
    this.itemsAdd = [{ expanded: false }];
    this.itemsKYC = [{ expanded: false }];
    this.itemsLoan = [{ expanded: false }];
    this.itemsAadhar = [{ expanded: false }];
    this.itemsPan = [{ expanded: false }];
    this.itemsGst = [{ expanded: false }];
    this.itemsLei = [{ expanded: false }];

    this.otpSub = this.global.mobileAddress.subscribe(resData => {
      if (resData) {
        this.mobileVerified = true;
        this.beforeVerify = false;
        let address = resData['contact']['address'].split(' ');
        let newAdd = '';
        newAdd = newAdd.concat(address[0], " ", address[1], " ", address[2], " ");
        let newAddOne = '';
        newAddOne = newAddOne.concat(address[address.length - 1], " ", address[address.length - 2]);
        this.addressDetails.get('businessAddress').setValue(newAdd);
        this.addressDetails.get('businessAddress').updateValueAndValidity();

        this.addressDetails.get('nearestLandmarkBA').setValue(newAddOne);
        this.addressDetails.get('nearestLandmarkBA').updateValueAndValidity();
      } else {
        this.beforeVerify = true;
      }
    })


    // this.cinSub = this.global.cinVerify.subscribe(data => {
    //   if (data) {
    //     this.showCinVerified = true;

    //   } else {
    //     this.showCinVerified = false;

    //   }
    // })
    // this.aadharSub = this.global.aadharVerify.subscribe(data => {
    //   if (data) {
    //     this.showAadharverify = true;

    //   } else {
    //     this.showAadharverify = false;

    //   }
    // })
    this.gstSub = this.global.gstVerify.subscribe(data => {
      if (data) {
        this.showGSTverify = true;

      } else {
        this.showGSTverify = false;

      }
    })




  }

  ngOnInit() {
    this.personalDetails = this.formctrl.personalform();
    this.addressDetails = this.formctrl.addressform();
    this.kycDetails = this.formctrl.kycform();
    this.loanDetails = this.formctrl.loanDetailsform();
    this.validation_messages_kyc = this.errorHandling.kycFormValidation();
    console.log(this.errorMessage, "errrr msg");



    this.validation_messages = this.errorHandling.personalvalid();
    this.validation_messages_address = this.errorHandling.addressValid();
    this.titleList = this.master.getTitleList();
    this.constitutionList = this.master.getConstitutionListss();
    this.sourceOfLeadList = this.master.getsourceOfLeadList();
    this.cityList = this.master.getCityList();
    this.stateList = this.master.getStateList();
    this.branchList = this.master.getbranchList();
    this.loanPurposeList = this.master.getloanPurposeList();
    this.customerSegmentList = this.master.getcustomerSegmentList();
    this.productList = this.master.getproductList();
    this.facilityList = this.master.getfacilityList();

    this.global.globalLodingPresent('Please wait..');


    this.activatedRoute.queryParamMap.subscribe(data => {
      console.log(data, "ddddddddddddd");
      this.pageName = data['params'].page;
      this.appType = data['params'].appType;
      console.log(this.pageName, "aaaaaaaaaaa");
      if (this.pageName == "personalInfo") {
        // this.expandItem(this.items[0]);
        // setTimeout(() => {
        this.global.globalLodingDismiss();

        this.getPersonal();
        // }, 500);
      } else if (this.pageName == "addressInfo") {
        // this.expandItemAddress(this.itemsAdd[0])
        console.log(this.pageName, "add")
        // setTimeout(() => {
        this.global.globalLodingDismiss();

        this.getAddress();
        // }, 500);
      } else if (this.pageName == "loanInfo") {
        this.expandItemLoan(this.itemsLoan[0]);
        // setTimeout(() => {
        this.global.globalLodingDismiss();

        this.getLoan();
        // }, 500);

      } else if (this.pageName == "kycInfo") {
        // this.expandItemKYC(this.itemsKYC[0]);
        // setTimeout(() => {
        this.global.globalLodingDismiss();

        this.getKyc();
        // }, 500);

      }

      if (this.appType == 'borrower') {
        this.showDetails = true;
        this.applicantType = 'Borrower Details';

      } else if (this.appType == 'promotor') {
        this.showDetails = false;
        this.applicantType = 'Promtor Details';


      } else if (this.appType == 'gurantor') {
        this.showDetails = false;
        this.applicantType = 'Gurantor Details';

      }
    });

    this.platform.resume.subscribe(async (data) => {
      console.log(data, "ddddddddddddddddddddddd");
      // alert('Resume event detected');
      if (this.resume) {
        this.initiateVid = false;
        this.processVid = false;
        this.proceedVid = false;
        this.successVid = true;
      }

    });





  }

  ionViewDidEnter() {

  }



  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }


  addressTab(value: String) {
    console.log(value);
    if (this.ionCheck) {
      this.addressDetails.get('factoryAddress').setValue(this.addressDetails.get('businessAddress').value);
    }
    if (this.addressDetails.get('businessAddress').value == "") {
      this.addressDetails.get('addressType').setValue('Business');
      this.addressDetails.get('addressType').updateValueAndValidity();
      this.global.presentToast('Please fill Business address');
    } else {
      // this.personalDetails.get('addressType').setValue('Residential');
      // this.personalDetails.get('addressType').updateValueAndValidity();
    }
  }

  async checkConstitution() {

    console.log(this.constitution, "mmmmmmmtttttttttttt");
    // this.global.presentAlert('Alert','Would you like to clear the values').then(data=>{

    // })
    console.log(this.personalDetails.dirty, "sssssssssssssss");


    if (this.personalDetails.dirty || this.kycDetails.dirty || this.loanDetails.dirty || this.addressDetails.dirty || this.kycDetails.get('panNumber').value != '' || this.kycDetails.get('udyogNumber').value != '') {
      console.log('trueeeeeeeee');
      const alert = await this.alertCtrl.create({
        header: 'Alert',
        message: 'Would you like to clear the entered values?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              alert.dismiss().then(data => {
                if (data) {
                  if (this.constitution == 'nonIndividual') {
                    this.constitution = "individual";

                  } else {
                    this.constitution = "nonIndividual";

                  }
                }
              })




            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss().then(data => {

                this.personalDetails.reset();
                this.kycDetails.reset();
                this.addressDetails.reset();
                this.loanDetails.reset();
                this.kycDetails.get('panNumber').setValue('');
                this.kycDetails.get('panNumber').updateValueAndValidity();
                this.kycDetails.get('udyogNumber').setValue('');
                this.kycDetails.get('udyogNumber').updateValueAndValidity();
                this.addressDetails.get('addressType').setValue('Business');
                this.addressDetails.get('addressType').updateValueAndValidity();
                this.addressType = "Business";
                if (this.constitution == 'nonIndividual') {
                  this.showNonIndividual = true;
                  this.showIndividual = false;
                }
                else {
                  this.showNonIndividual = false;
                  this.showIndividual = true;
                }
              })

            }
          }
        ]
      });
      await alert.present();

    } else {
      if (this.constitution == 'nonIndividual') {
        this.showNonIndividual = true;
        this.showIndividual = false;
      }
      else {
        this.showNonIndividual = false;
        this.showIndividual = true;
      }
      console.log('falsesssssssss');

    }


  }

  personalSave(value) {
    console.log(value);
  }

  getCheckedStatus() {
    if (this.ionCheck == true) {
      this.addressDetails.get('factoryAddress').setValue(this.addressDetails.get('businessAddress').value);
      this.addressDetails.get('factoryAddress').updateValueAndValidity();

      this.addressDetails.get('nearestLandmarkFA').setValue(this.addressDetails.get('nearestLandmarkBA').value);
      this.addressDetails.get('nearestLandmarkFA').updateValueAndValidity();

      this.addressDetails.get('stateFA').setValue(this.addressDetails.get('stateBA').value);
      this.addressDetails.get('stateFA').updateValueAndValidity();

      this.addressDetails.get('districtFA').setValue(this.addressDetails.get('districtBA').value);
      this.addressDetails.get('districtFA').updateValueAndValidity();

      this.addressDetails.get('cityFA').setValue(this.addressDetails.get('cityBA').value);
      this.addressDetails.get('cityFA').updateValueAndValidity();

      this.addressDetails.get('pincodeFA').setValue(this.addressDetails.get('pincodeBA').value);
      this.addressDetails.get('pincodeFA').updateValueAndValidity();

    } else {
      this.addressDetails.get('factoryAddress').setValue('');
      this.addressDetails.get('factoryAddress').updateValueAndValidity();

      this.addressDetails.get('nearestLandmarkFA').setValue("");
      this.addressDetails.get('nearestLandmarkFA').updateValueAndValidity();

      this.addressDetails.get('stateFA').setValue("");
      this.addressDetails.get('stateFA').updateValueAndValidity();

      this.addressDetails.get('districtFA').setValue("");
      this.addressDetails.get('districtFA').updateValueAndValidity();

      this.addressDetails.get('cityFA').setValue("");
      this.addressDetails.get('cityFA').updateValueAndValidity();

      this.addressDetails.get('pincodeFA').setValue("");
      this.addressDetails.get('pincodeFA').updateValueAndValidity();
    }
  }

  addressSave(value) {
    console.log(value);
  }

  expandItem(item): void {
    console.log(item, "iiiiiiiiiiiiiiiii");
    this.personalUpHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.personalUpHide = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandItemAddress(item): void {
    this.addressUpHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.addressUpHide = false;
    } else {
      this.itemsAdd.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandItemKYC(item): void {
    console.log(item, "kyccccccccccccccc");
    this.kycUpHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.kycUpHide = false;
    } else {
      this.itemsKYC.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }


  expandItemAadhar(item): void {
    console.log(item, "kyccccccccccccccc");
    setTimeout(() => {
      document.getElementById('kyc').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 50);
    if (this.itemsGst[0].expanded || this.itemsLei[0].expanded || this.itemsPan[0].expanded) {
      this.itemsGst[0].expanded = false;
      this.itemsLei[0].expanded = false;
      this.itemsPan[0].expanded = false;
    }
    this.kycAadharHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.kycAadharHide = false;
    } else {
      this.itemsAadhar.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandItemPan(item): void {
    console.log(item, "kyccccccccccccccc");
    this.kycPanHide = true;
    setTimeout(() => {
      document.getElementById('udyog').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 50);
    if (this.itemsAadhar[0].expanded || this.itemsGst[0].expanded || this.itemsLei[0].expanded) {
      this.itemsAadhar[0].expanded = false;
      this.itemsGst[0].expanded = false;
      this.itemsLei[0].expanded = false;
    }
    if (item.expanded) {
      item.expanded = false;
      this.kycPanHide = false;
    } else {
      this.itemsPan.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  expandItemGst(item): void {
    console.log(item, "kyccccccccccccccc");
    setTimeout(() => {
      document.getElementById('pan').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 50);
    if (this.itemsAadhar[0].expanded || this.itemsLei[0].expanded || this.itemsPan[0].expanded) {
      this.itemsAadhar[0].expanded = false;
      this.itemsLei[0].expanded = false;
      this.itemsPan[0].expanded = false;
    }
    this.kycGstHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.kycGstHide = false;
    } else {
      this.itemsGst.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandItemLei(item): void {
    console.log(item, "kyccccccccccccccc");
    setTimeout(() => {
      document.getElementById('lei').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 50);
    if (this.itemsAadhar[0].expanded || this.itemsGst[0].expanded || this.itemsPan[0].expanded) {
      this.itemsAadhar[0].expanded = false;
      this.itemsGst[0].expanded = false;
      this.itemsPan[0].expanded = false;
    }
    this.kycLeiHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.kycLeiHide = false;
    } else {
      this.itemsLei.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandItemLoan(item): void {
    this.loanUpHide = true;
    if (item.expanded) {
      item.expanded = false;
      this.loanUpHide = false;
    } else {
      this.itemsLoan.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  gstRegisterFun(value) {
    console.log(value.detail.value);
    let gstRegisterOrNot = value.detail.value;
    if (gstRegisterOrNot == 'yes') {
      this.showGstRegister = true;
    } else {
      this.showGstRegister = false;
    }
  }

  async uploadProfilePic(stringValue) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 1
    }

    const cameraImage = await this.camera.getPicture(options);
    const fileName = cameraImage.substring(cameraImage.lastIndexOf('/') + 1);
    const srcPath = cameraImage.substring(0, cameraImage.lastIndexOf('/') + 1);

    const fileMove = await this.file.moveFile(srcPath, fileName, this.file.externalApplicationStorageDirectory + '/photos', fileName);
    switch (stringValue) {
      case "profile":
        this.convertFile = this.webview.convertFileSrc(fileMove.nativeURL);
        break;
      case "udyogNum":
        this.udhyogImage = this.webview.convertFileSrc(fileMove.nativeURL);
        break;

    }


    console.log(this.convertFile, "image dp");
    //let index = fileMove.nativeURL.lastIndexOf('/') + 1;
    //let ImgfileName = fileMove.nativeURL.substring(index);
    //return [{ native: fileMove.nativeURL, webview: convertFile, name: ImgfileName }];    
  }



  cinNumberVerification() {
    if (this.personalDetails.get('cinNumber').value == '') {
      this.global.presentToast("Please Enter Your CIN Number");
    } else {

      let data =
      {
        "cin_llpin": "U72400TN1997PTC038865"
      }


      this.restService.restApiCall('', 'scoreme/getcompanyinfo', data).then(resData => {
        console.log(resData, "response data");
        this.showCinVerified = true;
        // if (data) {
        // this.global.globalLodingDismiss();
        let address = resData['data']['aboutCompany']['data'].registeredAddress.split(',')[0];
        let landmark = resData['data']['aboutCompany']['data'].registeredAddress.split(',')[1];
        let district = resData['data']['aboutCompany']['data'].registeredAddress.split(',')[2].split('-')[0];
        let city = resData['data']['aboutCompany']['data'].registeredAddress.split(',')[2].split('-')[0];
        let state = resData['data']['aboutCompany']['data'].registeredAddress.split(',')[3].split(' ')[1];
        let pincode = +resData['data']['aboutCompany']['data'].registeredAddress.split(',')[3].split(' ')[2];

        this.personalDetails.get('businessEntityName').setValue(resData['data']['aboutCompany']['data'].companyName);
        this.personalDetails.get('dateOfIncorporation').setValue(resData['data']['aboutCompany']['data'].dateOfIncorporation);
        this.personalDetails.get('vintage').setValue(resData['data']['aboutCompany']['data'].age);
        this.addressDetails.get('businessAddress').setValue(address);
        this.addressDetails.get('nearestLandmarkBA').setValue(landmark);
        this.addressDetails.get('districtBA').setValue(district);
        this.addressDetails.get('cityBA').setValue(city);
        this.addressDetails.get('stateBA').setValue(state);
        this.addressDetails.get('pincodeBA').setValue(pincode);




        // }
      }, error => {
        this.global.presentAlert('Alert', error.error);
        console.log(error, "response errir");
      })
      // this.global.globalLodingPresent('Please Wait..Verifying CIN Number');
      // if (this.personalDetails.get('cinNumber').value == '45678') {
      //   this.global.globalLodingDismiss();
      //   this.global.presentAlert('Alert', 'CIN Number Verified Successfully');
      //   this.personalDetails.get('businessEntityName').setValue('ABC Company');
      //   this.personalDetails.get('dateOfIncorporation').setValue('2019-02-20');
      //   this.addressDetails.get('businessAddress').setValue('No:1/123, Shakthi Nagar');
      //   this.addressDetails.get('nearestLandmarkBA').setValue('Opposite to Saravana Store');
      //   this.addressDetails.get('stateBA').setValue('tn');
      //   this.addressDetails.get('districtBA').setValue('Kancheepuram');
      //   this.addressDetails.get('cityBA').setValue('chennai');
      //   this.addressDetails.get('pincodeBA').setValue('600123');
      //   this.global.verifyCin();

      // } else {
      //   this.global.globalLodingDismiss();
      //   this.global.presentAlert('Alert', 'CIN Number Verification Failed');
      //   this.personalDetails.get('businessEntityName').setValue('');
      //   this.personalDetails.get('dateOfIncorporation').setValue('');
      //   this.addressDetails.get('businessAddress').setValue('');
      //   this.addressDetails.get('nearestLandmarkBA').setValue('');
      //   this.addressDetails.get('stateBA').setValue('');
      //   this.addressDetails.get('districtBA').setValue('');
      //   this.addressDetails.get('cityBA').setValue('');
      //   this.addressDetails.get('pincodeBA').setValue('');
      // }
    }
  }

  loanDetailsSave(value) {
    console.log(value);
  }

  getDocs() {

  }



  getPersonal() {
    setTimeout(() => {

      document.getElementById('personal').scrollIntoView({ behavior: "smooth" });
      // this.render.addClass(this.fillBadge.nativeElement,'selectAll');     

      console.log("elemeny", document.getElementById('fillBadge').getElementsByTagName('ion-badge').length)

      this.scrollEvent(0);
    }, 500);




  }
  getAddress() {
    setTimeout(() => {

      document.getElementById('address').scrollIntoView({ behavior: "smooth" });
      this.scrollEvent(1);
    }, 500);


  }
  getLoan() {
    setTimeout(() => {

      document.getElementById('Loan').scrollIntoView({ behavior: "smooth" });
      this.scrollEvent(2);
    }, 500);



  }
  getKyc() {
    setTimeout(() => {

      document.getElementById('kyc').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

      if (this.appType != 'borrower') {
        this.scrollEvent(2);


      } else {
        this.scrollEvent(3);

      }
    }, 500);



  }



  callGST() {
    this.confirmAlert("Confirmation Alert", "Are you sure to procedd with GST consent?");
  }
  async confirmAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: subtitle,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancel');
            this.global.presentAlert("Alert", "Basic Content is Fetched");
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.presentModalOTP('fromGST', 'gst');
            // this.global.presentAlert("Alert", "GST Successfully Verified and your Details are fetched.")
          }
        }
      ]
    });
    await alert.present();
  }
  async presentModalOTP(stringValue?, data?) {
    if (stringValue) {
      const modal = await this.modalController.create({
        component: OtpcheckComponent,
        cssClass: 'otp-class',
        componentProps: { value: data }
      });
      return await modal.present();
    }

    if (data == "mobile" && this.personalDetails.get('mobileNumber').value == "") {
      this.global.presentToast('Please Enter Mobile Number to verify OTP');
    } else if (data == "aadhar" && this.kycDetails.get('udyogNumber').value == "") {
      this.global.presentToast('Please Enter Udyog Number to verify OTP');
    } else if (data == "gst" && this.kycDetails.get('gstNumber').value == "") {
      this.global.presentToast('Please Enter GST Number to verify OTP');
    }
    else {

      const modal = await this.modalController.create({
        component: OtpcheckComponent,
        cssClass: 'otp-class',
        componentProps: { value: data, otpRequest: this.requestID, mobile: this.personalDetails.get('mobileNumber').value }
      });
      // this.beforeVerify = false;
      // this.mobileVerified = true;
      return await modal.present();

    }
  }

  verification(value) {
    if (value == 'pan') {
      let panValue =
      {
        "status": "Active",
        "panNumber": "AAGCV1355E",
        "lastUpdate": "18/07/2019",
        "nameOnTheCard": "VSKM TRADING BUSINESS PRIVATE LIMITED",
        "statusDescription": "Existing and Valid",
        "name": "M/s   VSKM TRADING BUSINESS PRIVATE LIMITED"
      }

      if (this.kycDetails.get('panNumber').value == "") {
        this.global.presentToast('Please Enter PAN number');
      } else {

        // this.global.globalLodingPresent('please wait...');
        let data =
        {
          "docNumber": this.kycDetails.get('panNumber').value
        }


        this.restService.restApiCall('', 'cpts/id/pan', data).then(data => {
          console.log(data, "response data");
          // if (data) {
          // this.global.globalLodingDismiss();
          this.personalDetails.get('businessEntityName').setValue(data['nameOnTheCard']);
          this.personalDetails.get('firstName').setValue(data['nameOnTheCard']);

          this.showPanverify = true;
          // }
        }, error => {
          this.global.presentAlert('Alert', error.error);
          console.log(error, "response errir");
        })
        // setTimeout(() => {
        //   this.global.globalLodingDismiss();
        //   this.personalDetails.get('businessEntityName').setValue(panValue.nameOnTheCard);
        //   this.personalDetails.get('firstName').setValue(panValue.nameOnTheCard);

        //   this.showPanverify = true;
        // }, 2000);
      }


    } else if (value == 'lei') {
      if (this.kycDetails.get('leiNumber').value == "") {
        this.global.presentToast('Please Enter LEI number');
      } else {
        this.global.globalLodingPresent('please wait...');
        setTimeout(() => {
          this.global.globalLodingDismiss();
          this.showLeiverify = true;
        }, 2000);
      }
    }
  }

  async attachDoc(name) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Chooser',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: async () => {
          // await this.getDocs(docIndex, remove, index, true);
          try {

            let attach = await this.plugin.takeImage(1);
            let docsIndex = this.Documents.findIndex(data => {
              // if (data.docName == name) {
              return data.docName == name;

              //   data.imgs.push(attach);
              // }
            })
            this.Documents[docsIndex].imgs.push(attach);


            if (name == 'aadhar') {
              this.viewAadharDoc = false;
              this.aadharCount = this.Documents[docsIndex].imgs.length;

            } else if (name == 'pan') {
              this.viewPanDoc = false;
              this.panCount = this.Documents[docsIndex].imgs.length;


            } else if (name == 'gst') {
              this.viewGstDoc = false;
              this.gstCount = this.Documents[docsIndex].imgs.length;



            } else if (name == 'lei') {
              this.viewLeiDoc = false;
              this.leiCount = this.Documents[docsIndex].imgs.length;


            }
            console.log(this.Documents, "aaaaaaa");


            return true;
          } catch (error) {
            console.log(error, "eeeee");
          }
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: async () => {
          // this.getDocs(docIndex, remove, index, false);
          let attach = await this.plugin.takeImage(0);
          let docsIndex = this.Documents.findIndex(data => {
            // if (data.docName == name) {
            return data.docName == name;

            // data.imgs.push(attach);
            // }
          })
          this.Documents[docsIndex].imgs.push(attach);
          if (name == 'aadhar') {
            this.viewAadharDoc = false;
            this.aadharCount = this.Documents[docsIndex].imgs.length;
          } else if (name == 'pan') {
            this.viewPanDoc = false;
            this.panCount = this.Documents[docsIndex].imgs.length;


          } else if (name == 'gst') {
            this.viewGstDoc = false;
            this.gstCount = this.Documents[docsIndex].imgs.length;



          } else if (name == 'lei') {
            this.viewLeiDoc = false;
            this.leiCount = this.Documents[docsIndex].imgs.length;


          }
          console.log(this.Documents, "aaaaaaa");

          return true;

        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();

  }

  viewDoc(value, parentIndex) {
    this.router.navigate(['gallery'], { skipLocationChange: true }).then(val => {
      if (val) {
        let newDoc = this.Documents.findIndex(data => {
          // if (data.docName == value) {
          return data.docName == value;
          // }

        })
        this.docUploadService.galleryView(this.Documents[newDoc].imgs, parentIndex);
      }
    });
  }

  onScroll(event) {
    if (document.getElementById('address').offsetTop <= event.detail.scrollTop && event.detail.scrollTop <= (document.getElementById('Loan').offsetTop - 1)) {
      this.scrollEvent(1);
    } else if (document.getElementById('Loan').offsetTop <= event.detail.scrollTop && event.detail.scrollTop <= (document.getElementById('kyc').offsetTop - 1)) {
      this.scrollEvent(2);
    } else if (document.getElementById('kyc').offsetTop <= event.detail.scrollTop) {
      this.scrollEvent(3);
    } else if ((document.getElementById('address').offsetTop - 1) >= event.detail.scrollTop) {
      this.scrollEvent(0);
    }
  }
  scrollEvent(index) {
    for (let i = 0; i < document.getElementById('fillBadge').getElementsByTagName('ion-badge').length; i++) {
      if (i == index) {
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[index].style.color = 'white';
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[index].style.background = '#017DC7';
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[index].style.border = '1px solid #017DC7';
      } else {
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[i].style.color = 'white';
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[i].style.background = '#FA7F22';
        document.getElementById('fillBadge').getElementsByTagName('ion-badge')[i].style.border = '1px solid #FA7F22';
      }
    }
  }


  verifyaadhar() {
    let data =
    {
      "docNumber": this.kycDetails.get('udyogNumber').value
    }


    this.restService.restApiCall('', 'cpts/id/AadhaarVerification:', data).then(data => {
      console.log(data, "response data");
      this.showAadharverify = true;
      // if (data) {
      // this.global.globalLodingDismiss();
      this.addressDetails.get('stateBA').setValue(data['State']);
      // this.personalDetails.get('firstName').setValue(data['nameOnTheCard']);

      // this.showPanverify = true;
      // }
    }, error => {
      this.global.presentAlert('Alert', error.error);
      console.log(error, "response errir");
    })

  }

  initiateVideo() {
    let timeStamp = new Date().getTime().toString().substring(8);
    let data = {
      "config": {
        "id": "f65b7574-9a08-46f8-8554-cb8a3c91117e"
      },
      "group_id": `9a08-46f8-8554-cb8a3c91117e_2way${timeStamp}`,
      "reference_id": `9a08-46f8-8554-cb8a3c91117e_2way${timeStamp}`,
      "data": {
      }
    }
    this.initiateVid = false;
    this.processVid = true;
    this.proceedVid = false;

    this.restService.restApiCall('', 'idfy/video-kyc-profile/create', data).then(responseData => {
      setTimeout(() => {

        this.initiateVid = false;
        this.processVid = false;
        this.proceedVid = true;
      }, 2000);
      this.responseURL = responseData['data'].capture_link;
    }, error => {
      this.global.presentAlert('Alert', error.error);
      console.log(error, "video eror");
    })

  }

  processVideo() {

    this.initiateVid = false;
    this.processVid = false;
    this.proceedVid = true;
  }

  proceedVideo() {

    window.open(this.responseURL, '_self', 'location=yes');
    setTimeout(() => {
      this.resume = true;
    }, 2000);
    // this.initiateVid = false;
    // this.processVid = false;
    // this.proceedVid = false;
    // this.successVid = true;

    // const browser = this.iab.create('https://www.techiediaries.com', '_self', { location: 'no' });
  }
  //   openOCR(value) {
  // console.log(value,"aaaaaaaaa");
  //     this.scanner.scanDocument(value).subscribe(scanOutput => {
  //       console.log(scanOutput, "output");
  //     })
  //   }


  async showScannerOption(ev, type) {

    // this.hideScanOption = !this.hideScanOption;
    const popover = await this.popoverController.create({
      component: KycScanOptionComponent,
      componentProps: { show: type },
      cssClass: 'popOver',
      event: ev,
      mode: 'ios',
      translucent: true,
      showBackdrop: true,
      animated: true,
    });
    //console.log('outside filter', filter);

    this.scansubscrip = this.global._scanTypeSelected.pipe(take(1)).subscribe(data => {
      if (data) {
        localStorage.setItem('model', data);
        this.calAPIMethods(data, type);
        popover.dismiss();

      }

    })
    return await popover.present();

  }


  calAPIMethods(scannerType, type) {



    // this.scanner = new KycScanAPI();
    const scanoptions: ScannerOptions = {
      scannerType: scannerType,
      proofType: type
    }

    if (type == 'aadhar') {

      this.scanner.scanDocument(scanoptions).pipe(take(1), delay(1000)).subscribe(scanoutput => {
        console.log(scanoutput, 'hahahahahahahahahahaha');
        // this.proofValueEmitted.unsubscribe();

        if (Array.isArray(scanoutput)) {

          this.kycDetails.get('udyogNumber').setValue('XXXXXXXX' + scanoutput[0].substring(8));
          this.kycDetails.get('udyogNumber').updateValueAndValidity();

        } else {
          this.kycDetails.get('udyogNumber').setValue('XXXXXXXX' + scanoutput.substring(8));
          this.kycDetails.get('udyogNumber').updateValueAndValidity();
        }

      });
    } else if (type == 'pan') {

      this.scanner.scanDocument(scanoptions).pipe(take(1), delay(1000)).subscribe(scanoutput => {
        console.log(scanoutput, 'hahahahahahahahahahaha');
        // this.proofValueEmitted.unsubscribe();


        if (Array.isArray(scanoutput)) {
          this.kycDetails.get('panNumber').setValue(scanoutput[0]);
          this.kycDetails.get('panNumber').updateValueAndValidity();

        } else {
          this.kycDetails.get('panNumber').setValue(scanoutput);
          this.kycDetails.get('panNumber').updateValueAndValidity();
        }


      });

    }
  }

  sendOTP() {
    if (this.personalDetails.get('mobileNumber').value == "") {
      this.global.presentToast('Please Enter Mobile Number to verify OTP');
    } else {
      let data =
      {
        "consent": "Y",
        "mobile": this.personalDetails.get('mobileNumber').value
      }
      this.restService.restApiCall('', 'karza/DigitalEssentials/MobileOTP', data).then(resData => {
        console.log(resData, "otp");
        if (resData['status-code'] == '101') {
          this.beforeVerify = false;
          this.requestID = resData['request_id'];
          this.global.presentToast(resData['result'].message);
        } else {
          this.beforeVerify = true;
          this.global.presentToast(resData['result'].message);
        }

      }, error => {
        this.global.presentAlert('Alert', error.error);
        console.log(error, "response errir");
      })
    }
  }

  ngOnDestroy() {
    if (this.otpSub) {
      this.otpSub.unsubscribe();
    }
    if (this.cinSub) {
      this.cinSub.unsubscribe();
    }
    if (this.aadharSub) {
      this.aadharSub.unsubscribe();
    }
    if (this.gstSub) {
      this.gstSub.unsubscribe();
    }
    if (this.scansubscrip) {
      this.scansubscrip.unsubscribe();
    }




  }

}
