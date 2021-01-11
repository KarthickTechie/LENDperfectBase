import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormGroup } from '@angular/forms';
import { DocumentuploadService } from './../../providers/documentupload.service';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { GlobalService } from './../../providers/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otherdocuments',
  templateUrl: './otherdocuments.page.html',
  styleUrls: ['./otherdocuments.page.scss'],
})
export class OtherdocumentsPage implements OnInit {
  otherDocDetails: FormGroup;
  preDocList: any;
  DocumentList: any;
  applicantList: any;
  showSegbar:boolean = false;
  
  selectedDocList = [
    {
      docDescription: "NACH Bank Verified", docType: "NACH Bank Verified", imgs: []
    },
    {
      docDescription: "Application Form", docType: "Application Form", imgs: []
    },
    {
      docDescription: "Loan Agreement", docType: "Loan Agreement", imgs: []
    },
    {
      docDescription: "RTO Forms", docType: "RTO Forms", imgs: []
    }, {
      docDescription: "Any Other Document", docType: "Any Other Document", imgs: []
    }
  ];

  borrowerDocList = [];

  promoterDocList = [];

  guarantorDocList = [];
  data: boolean = true;
  fitab: any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute,
    public global: GlobalService,public webview:WebView,
    public actionSheetController: ActionSheetController,
    public formctrl: FormcontrolService, public master: MasterService, public docUploadService: DocumentuploadService, public alertCtrl: AlertController) {
    this.activatedRoute.queryParamMap.subscribe(data => {
      this.fitab = data['params'].value;
      this.data = true;
    });
  }

  ngOnInit() {


    this.otherDocDetails = this.formctrl.getOtherDocsForm();
    this.preDocList = this.master.getPostDocList();
    this.DocumentList = this.master.getOtherDocList();
    this.applicantList = this.master.getapplicantList();
  }

  otherDocDetailsSave(value) {
    this.showSegbar=true;
    console.log(value, 'otherDoc');
    let applicantType = value.appType
    switch (applicantType) {
      case "01":
        this.borrowerDocList.push(this.selectedDocList[+value.docType]);
        break;

      case "02":
        this.promoterDocList.push(this.selectedDocList[+value.docType]);
        break;

      case "03":
        this.guarantorDocList.push(this.selectedDocList[+value.docType]);
        break;

      default:
        break;
    }
    this.otherDocDetails.reset();
  }

  async docActionSheet(docIndex, remove, index, document) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Chooser',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          // await this.getDocs(docIndex, remove, index, true);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          // this.getDocs(docIndex, remove, index, false);
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

  async viewDoc(document, parentIndex) {
    console.log(document, "iamge view");
    // if (document.length) {
    this.router.navigate(['gallery'], { skipLocationChange: true }).then(val => {
      if (val) {
        let convertFile = this.webview.convertFileSrc('file:///storage/emulated/0/Android/data/com.sysarc.lendperfectbase/bankstate.jpg');
        this.docUploadService.galleryView([{webview:convertFile}], parentIndex);
      }
    });
    // } else {
    // this.global.presentAlert("Alert", "No images attached");
    // }

  }

  // async docUpload(): Promise<FileUploadResult | FileTransferError | DocUploadResponse[]> {
  async docUpload() {
    this.data = false;
    this.global.globalLodingPresent('Document uploading...');
    setTimeout(async () => {
      this.global.globalLodingDismiss();

      let alert = await this.alertCtrl.create({
        header: "Alert",
        message: "Document uploaded successfully...",
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/newapplication'], { relativeTo: this.activatedRoute });
            }
          }
        ]
      });
      await alert.present();


    }, 5000);



    //   let documents = [{ name: "20170817_195517.jpg", native:"file:///storage/emulated/0/Android/data/com.sysarc.rbl/20170817_195517.jpg"}];
    // const upload = await this.docUploadService.uploadDocument(this.progressBar, { uploadType: "single",file:documents, endPoint: "", });
    // return upload;
    // } else {
    // this.global.presentAlert("Alert", "Please enable network connection!");
    // }
  }

}
