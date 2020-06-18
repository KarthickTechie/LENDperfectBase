import { ErrorHandlingService } from './../../error-handling.service';
import { HandlingError } from './../../utility/ErrorHandling';
import { AppDashboardPage } from './../app-dashboard/app-dashboard.page';
import { SqliteProvider } from './../../global/sqlite';
import { SignatureComponent } from './../signature/signature.component';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GalleryDirective } from './../gallery.directive';
import { FileUploadResult, FileTransferError } from '@ionic-native/file-transfer/ngx';
import { ProgressBarDirective } from './../../document-upload/progress-bar.directive';
import { GlobalService } from './../../global/global.service';
import { DocUploadService, DocUploadResponse } from './../../global/doc-upload.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DocChooser } from '../../../../widget/docChooser';
import { ActionSheetController, ModalController, AlertController, IonBackButtonDelegate } from '@ionic/angular';
import { CropDocComponent } from '../../Components/crop-doc/crop-doc.component';
import { FormGroup } from '@angular/forms';
import { FormControlData } from '../formcontrol';
import { keyInsert } from './../keyinsert';


@Component({
  selector: 'app-document-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.scss'],
})
export class DocumentUploaderComponent implements OnInit, AfterViewInit {
  @ViewChild(GalleryDirective, { static: false }) gallery: GalleryDirective;
  @ViewChild(ProgressBarDirective, { static: false }) progressBar: ProgressBarDirective;
  @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;
  galleryCloseSub: Subscription;
  otherDocument: FormGroup;
  networkStatus: any;
  imageResponse: any = [];
  documentList: any;
  modal: any;
  trickIndex = 0;
  documentType: any;
  documnetDescription: any;
  profPic: any;
  profImg: boolean = false;
  isSelected = false;
  pi: number;
  imagecount = 5;
  errorMessage: any;
  dlist: any[] = [];
  tempImage = [];
  imgTotal = 0;
  isRecorded = false;
  isSigned = false;
  signatureImage = { name: '', native: '', webview: '', docType: '', docDescription: '' };
  refId: any;
  id: any;
  docId: any;
  applicantType: any;
  slideCheck: Subscription;
  @Output() saveStatus = new EventEmitter();
  keyInsertSub: Subscription;


  constructor(private camera: Camera, public location: Location, public docChooser: DocChooser, public actionSheetController: ActionSheetController,
    public modalController: ModalController, public docUploadService: DocUploadService, public globalService: GlobalService,
    public form: FormControlData, public compFactoryResolver: ComponentFactoryResolver, public router: Router, public mediaCap: MediaCapture,
    public file: File, public webView: WebView, public streaming: StreamingMedia, public vidPlayer: VideoPlayer, public sqlite: SqliteProvider,
    public global: GlobalService, public dashboard: AppDashboardPage, private errorHandling: HandlingError,
    public keyinsert: keyInsert, public errorLogService: ErrorHandlingService, public changeDet: ChangeDetectorRef) {
    this.documentList = [
      { name: "Aadhar document", code: "Aadhar Document" },
      { name: "PAN document", code: "PAN Document" },
      { name: "Driving License", code: "Driving License" },
      { name: "Voter Id Card", code: "Voter Id Card" },
      { name: "Other Document", code: "Other Document" },
      { name: "Video", code: "Video" },
      { name: "Signature", code: "Signature" }
    ]
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();
    (this.refId) ? this.getDocumentDetails() : this.refId = "";


  }

  ngOnInit() {

    this.keyInsertSub = this.global.dataInsert.subscribe(data => {
      if (data) {
        this.otherDocument = this.keyinsert.otherDocumnetForm();
      } else {
        this.otherDocument = this.form.otherDocumnetForm();
      }
    })

    this.otherDocument = this.form.otherDocumnetForm();


    this.errorMessage = this.errorHandling.otherDocumentFormValidation();
    this.docUploadService.galleryObservable.subscribe(async val => {
      this.pi = val.parentIndex;
      this.imgTotal = val.listArray.length;
    })
    this.docUploadService.deleteImage.subscribe(val => {
      if (val.add) {
        this.getDocs(val.parentIndex, false, val.childIndex, val.camera)
      } else {
        this.getDocs(val.parentIndex, true, val.childIndex);
      }
    })
    this.location.onUrlChange((url: string, state: unknown) => {
      this.getDocumentDetails();
      this.changeDet.detach();
      this.changeDet.detectChanges();

      // let test = this.dlist.slice();
      // this.dlist = [];
      // console.log(test,"test id");
      // this.dlist = test;
      // console.log(this.dlist,"dlist inisde url");

      // setInterval(() => { this.imgTotal = this.dlist[this.pi].imgs.length; }, 100)
    })

    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "document") {
        this.refId = this.global.getRefId();
        this.applicantType = this.global.getApplicantType();
        this.id = this.global.getId();
      }
    })
  }
  ngAfterViewInit() {
  }


  ionViewDidEnter() {
  }


  onClick() {
  }

  deleteFile() {
  }

  // multiple document upload
  async getDocs(listIndex, remove = false, childIndex, camera = false, sign = false) {
    let options = {
      maximumImagesCount: 10,
      quality: 25,
      outputType: 0
    };
    if (remove) {
      try {
        let delArr = this.dlist[listIndex].imgs.splice(childIndex, 1);
        if (this.dlist[listIndex].otherDocumentType == 'Signature') {
          this.isSigned = false;
        }
        this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
        let delIndex = this.imageResponse.findIndex(val => val.webview == delArr[0].webview);
        if (delIndex !== -1) {
          this.imageResponse.splice(delIndex, 1);
          this.arrangeImages(this.imageResponse);
        }

      } catch (error) {
        console.log(error, 'error');
      }
    } else {

      try {
        if (camera) {
          const docs = await this.docChooser.docPicUpload();
          if (this.dlist[listIndex].otherDocumentType) {
            docs.forEach(val => {
              val.docType = this.dlist[listIndex].otherDocumentType;
              val.docDescription = this.dlist[listIndex].otherDescription;
            });
          }
          this.dlist[listIndex].imgs.push(...docs);
          this.dlist[listIndex].length = this.dlist[listIndex].imgs.length;
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
          this.imageResponse = this.imageResponse.concat(docs);
          this.isSelected = true;
        } else if (sign) {
          this.dlist[listIndex].imgs.push(this.signatureImage);
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
          this.signatureImage.docType = this.dlist[listIndex].otherDocumentType;
          this.signatureImage.docDescription = this.dlist[listIndex].otherDescription;
          this.imageResponse = this.imageResponse.concat([this.signatureImage]);
          this.isSelected = true;
        }
        else {
          const docs = await this.docChooser.getDocs(options);
          if (this.dlist[listIndex].otherDocumentType) {
            docs.forEach(val => {
              val.docType = this.dlist[listIndex].otherDocumentType;
              val.docDescription = this.dlist[listIndex].otherDescription;
            });
          }
          this.dlist[listIndex].imgs.push(...docs);
          this.dlist[listIndex].length = this.dlist[listIndex].imgs.length;
          // this.docUploadService.tempArray = this.dlist;
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
          this.imageResponse = this.imageResponse.concat(docs);
          this.isSelected = true;
        }
        this.arrangeImages(this.imageResponse);
      } catch (error) {
        console.log(error, 'getDocs functon err');
      }
    }
  }

  arrangeImages(imageData) {
    let data = imageData;
    const filteredArr = data.reduce((acc, current) => {
      const x = acc.find(item => item.docType === current.docType);
      if (!x) {
        const newCurr = {
          docType: current.docType,
          docDescription: current.docDescription,
          name: current.name,
          imagepath: [current.webview],
          imageNativePath: [current.native]
        }
        return acc.concat([newCurr]);
      } else {
        const currData = x.imagepath.filter(d => d === current.imagepath);
        if (!currData.length) {
          const newData = x.imagepath.push(current.webview);
          const newDataNative = x.imageNativePath.push(current.native);
          const newCurr = {
            docType: current.docType,
            docDescription: current.docDescription,
            name: current.name,
            imagepath: newData,
            imageNativePath: newDataNative
          }
          return acc;
        } else {
          return acc;
        }
      }
    }, []);

    for (let image of filteredArr) {
      this.sqlite.documentImageDelete(image.docType, this.applicantType, this.refId, this.id);
      this.sqlite.documentImageInsertion(image, this.applicantType, this.refId, this.id);

    }
    this.saveStatus.emit({ value: "documentTick", slide: "N" });
  }


  async viewDoc(document, parentIndex) {
    if (document.length) {
      this.router.navigate(['gallery']).then(val => {
        if (val) {
          this.docUploadService.galleryView(document, parentIndex);
        }
      });
    } else {
      this.globalService.presentAlert("Alert", "No images attached");
    }
  }

  async docUpload(): Promise<FileUploadResult | FileTransferError | DocUploadResponse[]> {
    const upload = await this.docUploadService.uploadDocument(this.progressBar, { uploadType: "single", endPoint: "", file: this.imageResponse });
    return upload;
  }


  otherDocumentSave(docValue) {

    let docName = docValue.otherDocumentType;
    let docNameIndex = this.dlist.findIndex(val => val.otherDocumentType == docName);
    let aadharIndex = this.dlist.map(val => val.otherDocumentType).lastIndexOf('Aadhar Document');
    if (this.dlist.length != 0) {
      if (this.dlist.findIndex(val => val.otherDocumentType == docValue.otherDocumentType) !== -1) {
        this.globalService.presentAlert("Alert", `${docValue.otherDocumentType} already saved`);
      } else {
        docValue.index = this.trickIndex;
        this.trickIndex++;
        docValue.length = 0;
        docValue.imgs = [];
        this.sqlite.documentInsertion(docValue, this.applicantType, this.refId, this.id);
        this.dlist.push(docValue);
        if (this.otherDocument.valid) {
          this.documentType = docValue.otherDocumentType;
          this.documnetDescription = docValue.otherDescription;
        }
      }
    } else {
      docValue.index = this.trickIndex;
      this.trickIndex++;
      docValue.length = 0;
      docValue.imgs = [];
      this.sqlite.documentInsertion(docValue, this.applicantType, this.refId, this.id);
      this.dlist.push(docValue);
      if (this.otherDocument.valid) {
        this.documentType = docValue.otherDocumentType;
        this.documnetDescription = docValue.otherDescription;
      }
    }

    this.otherDocument.reset();
  }

  async docActionSheet(docIndex, remove, index, document) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chooser',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: async () => {
          await this.getDocs(docIndex, remove, index, true);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.getDocs(docIndex, remove, index, false);
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

  async presentActionSheet() {
    if (this.profImg == false) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Chooser',
        buttons: [{
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.getProfilePic(1)
          }
        }, {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.getProfilePic(0)
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.profImg = true;
          }
        }]
      });
      await actionSheet.present();
    }
    else {
      this.modal = await this.modalController.create({
        component: CropDocComponent,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'doc': {
            doc: this.profPic,
            view: true
          }
        }, showBackdrop: true, backdropDismiss: true
      });

      await this.modal.present();
      let updateImg = await this.modal.onDidDismiss();
      if (updateImg.data.updateProfileIMAGE) {
        this.profImg = false;
        this.presentActionSheet();
      }
    }
  }

  // profile pic upload
  getProfilePic(srcTyp) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: srcTyp
    }

    this.docChooser.getProfilePic(options).then(docs => {
      this.profPic = docs;
      this.profImg = true;
    }).catch(error => {
      console.log(error, 'moorthi error');
    })
  }

  //to crop img/DOC
  CropImg(img) {
    this.docChooser.CropImg(this.imageResponse, img).then(docs => {
      // this.imageResponse = [];
      this.imageResponse = docs;
    }).catch(error => {
      console.log(error);
    })
  }

  //Remove Documents
  removeDoc(doc) {
    this.imageResponse = this.imageResponse.filter(e => e !== doc);
  }

  //view Documents
  async Viewimg(img) {
    this.modal = await this.modalController.create({
      component: CropDocComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'doc': {
          doc: img,
          view: false
        }
      }, showBackdrop: true, backdropDismiss: true
    });

    await this.modal.present();
  }

  trackByName(index: number, doc: any) {
    return doc.otherDescription;
  }

  async videoRecord(docIndex, play, index, remove = false) {
    if (remove) {
      if (this.dlist[docIndex].imgs.length) {

        let alert = await new AlertController().create({
          header: "Alert",
          message: "Are you sure want to delete this video?",
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('cancel');
              }
            }, {
              text: 'Yes',
              handler: () => {
                let deletedVideo = this.dlist[docIndex].imgs.pop();
                this.sqlite.documentImageDelete(this.dlist[docIndex].otherDocumentType, this.applicantType, this.refId, this.id);

                this.isRecorded = false;
              }
            }
          ]
        });
        await alert.present();

      } else {
        this.globalService.presentAlert("Alert", "No videos to delete!");
      }
    } else {
      if (play) {
        this.streaming.playVideo(this.dlist[index].imgs[0].webview, { successCallback: () => console.log('object'), errorCallback: e => console.log(e), controls: true, shouldAutoClose: true });
      } else {
        let lastIndex;
        const video = await this.mediaCap.captureVideo({ duration: 60, quality: 1 });
        lastIndex = video[0].fullPath.lastIndexOf('/') + 1;
        let filePath = video[0].fullPath.substring(0, lastIndex);
        let fileName = video[0].fullPath.substring(lastIndex);
        const move = await this.file.moveFile(filePath, fileName, this.file.externalApplicationStorageDirectory, fileName);
        let webViewLink = this.webView.convertFileSrc(move.nativeURL);
        this.dlist[docIndex].imgs.push({ name: fileName, native: move.nativeURL, webview: webViewLink });
        this.isRecorded = true;
        // this.sqlite.documentImageDelete(image.docType,this.applicantType, this.refId, this.id);
        this.sqlite.documentImageInsertion(this.dlist[docIndex], this.applicantType, this.refId, this.id);
      }
    }
  }


  async signature(docIndex, remove, index) {
    const signModal = await this.modalController.create({
      component: SignatureComponent,
      cssClass: 'sign-modal',
      showBackdrop: true,
      backdropDismiss: false
    });
    await signModal.present()
    const value = await signModal.onDidDismiss();
    if (value.data.signature) {
      this.isSigned = true;
      this.signatureImage.name = 'Signature';
      this.signatureImage.native = value.data.image;
      this.signatureImage.webview = value.data.image;
      this.getDocs(docIndex, false, index, false, true);
    }
  }

  async getDocumentDetails() {
    let getDoc = await this.sqlite.getDocuments(this.refId, this.id, this.applicantType);
    let imageRes = await this.sqlite.getImageResponse(this.refId, this.id, this.applicantType);
    (imageRes) ? this.imageResponse = imageRes : this.imageResponse = [];
    this.dlist = [];
    if (getDoc.length) {
      this.dlist = await getDoc;
      (getDoc[0].otherDocumentType == "Video") ? this.isRecorded = true : this.isRecorded = false;
      this.saveStatus.emit({ value: "documentTick", slide: "N" });
      this.refId = getDoc[0].refId;
      this.id = getDoc[0].id;

    }
  }

  deleteSign() {

  }

  ngOnDestroy() {
    this.keyInsertSub ? this.keyInsertSub.unsubscribe() : "";
  }

}
