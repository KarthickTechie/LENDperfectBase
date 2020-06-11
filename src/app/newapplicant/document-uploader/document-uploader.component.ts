import { SignatureComponent } from './../signature/signature.component';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, interval, Observable } from 'rxjs';
import { GalleryViewComponent } from './../gallery-view/gallery-view.component';
import { GalleryDirective } from './../gallery.directive';
import { DocViewComponent } from './../doc-view/doc-view.component';
import { FileUploadResult, FileTransferError } from '@ionic-native/file-transfer/ngx';
import { ProgressBarDirective } from './../../document-upload/progress-bar.directive';
import { GlobalService } from './../../global/global.service';
import { DocUploadService, DocUploadResponse } from './../../global/doc-upload.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DocChooser } from '../../../../widget/docChooser';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { CropDocComponent } from '../../Components/crop-doc/crop-doc.component';
import { FormGroup } from '@angular/forms';
import { FormControlData } from '../formcontrol';

@Component({
  selector: 'app-document-uploader',
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.scss'],
})
export class DocumentUploaderComponent implements OnInit, AfterViewInit {
  @ViewChild(GalleryDirective, { static: false }) gallery: GalleryDirective;
  @ViewChild(ProgressBarDirective, { static: false }) progressBar: ProgressBarDirective;
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
  dlist: any[] = [];
  tempImage = [];
  imgTotal = 0;
  isRecorded = false;
  isSigned = false;
  signatureImage = { name: '', native: '', webview: '' }
  constructor(private camera: Camera, public location: Location, public docChooser: DocChooser, public actionSheetController: ActionSheetController,
    public modalController: ModalController, public docUploadService: DocUploadService, public globalService: GlobalService,
    public form: FormControlData, public compFactoryResolver: ComponentFactoryResolver, public router: Router, public mediaCap: MediaCapture,
    public file: File, public webView: WebView, public streaming: StreamingMedia, public vidPlayer: VideoPlayer) {
    this.documentList = [
      { name: "Aadhar document", code: "Aadhar Document" },
      { name: "PAN document", code: "PAN Document" },
      { name: "Driving License", code: "Driving License" },
      { name: "Voter Id Card", code: "Voter Id Card" },
      { name: "Other Document", code: "Other Document" },
      { name: "Video", code: "Video" },
      { name: "Signature", code: "Signature" }
    ]
  }

  ngOnInit() {
    this.otherDocument = this.form.otherDocumnetForm();
    this.docUploadService.galleryObservable.subscribe(async val => {
      this.pi = val.parentIndex;
      this.imgTotal = val.listArray.length;
    })
    this.docUploadService.deleteImage.subscribe(val => {
      if (val.add) {
        this.getDocs(val.parentIndex, false, val.childIndex, val.camera)
      } else {
        console.log(val, 'in docuploader');
        this.getDocs(val.parentIndex, true, val.childIndex);
      }
    })
    this.location.onUrlChange((url: string, state: unknown) => {
      console.log(url, 'location change');
      console.log(state, 'state');
      setInterval(() => { this.imgTotal = this.dlist[this.pi].imgs.length; }, 100)
    })
  }
  ngAfterViewInit() {
  }

  onClick() {
  }

  deleteFile() {
    console.log('this is delete');
  }

  // multiple document upload
  async getDocs(listIndex, remove = false, childIndex, camera = false, sign = false) {
    console.log(listIndex, "listIndex");
    let options = {
      maximumImagesCount: 10,
      quality: 25,
      outputType: 0
    };
    if (remove) {
      try {
        console.log(this.dlist[listIndex], 'signnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        console.log(this.dlist[listIndex].imgs, 'before splice');
        let delArr = this.dlist[listIndex].imgs.splice(childIndex, 1);
        console.log(delArr, 'after splice');
        if (this.dlist[listIndex].otherDocumentType == 'Signature') {
          this.isSigned = false;
        }
        this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
        let delIndex = this.imageResponse.findIndex(val => val.native == delArr[0].native);
        console.log(delIndex, 'index of image delllll');
        if (delIndex !== -1) {
          this.imageResponse.splice(delIndex, 1);
        }

      } catch (error) {
        console.log(error, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      }
    } else {

      try {
        if (camera) {
          const docs = await this.docChooser.docPicUpload();
          this.dlist[listIndex].imgs.push(...docs);
          this.dlist[listIndex].length = this.dlist[listIndex].imgs.length;
          console.log(this.dlist, "dlist index");
          // this.docUploadService.tempArray = this.dlist;
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
          this.imageResponse = this.imageResponse.concat(docs);
          this.isSelected = true;
        } else if (sign) {
          this.dlist[listIndex].imgs.push(this.signatureImage);
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);
          this.imageResponse = this.imageResponse.concat([this.signatureImage]);
          this.isSelected = true;
        }
        else {
          const docs = await this.docChooser.getDocs(options);
          this.dlist[listIndex].imgs.push(...docs);
          this.dlist[listIndex].length = this.dlist[listIndex].imgs.length;
          console.log(this.dlist, "dlist index");
          // this.docUploadService.tempArray = this.dlist;
          this.docUploadService.galleryView(this.dlist[listIndex].imgs, listIndex);

          this.imageResponse = this.imageResponse.concat(docs);
          this.isSelected = true;
        }
      } catch (error) {
        console.log(error, 'getDocs functon err');
      }
    }
  }


  async viewDoc(document, parentIndex) {
    console.log(document, 'doctest');
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
    const upload = await this.docUploadService.uploadDocument(this.progressBar, { uploadType: "zip", endPoint: "", file: this.imageResponse });
    return upload;
  }


  otherDocumentSave(docValue) {
    console.log(docValue, 'doc val');
    console.log(this.dlist, "first docvale");
    let docName = docValue.otherDocumentType;
    console.log(this.dlist.map(val => val.otherDocumentType).lastIndexOf('Aadhar Document'), 'hahahahahahaha');
    let docNameIndex = this.dlist.findIndex(val => val.otherDocumentType == docName);
    let aadharIndex = this.dlist.map(val => val.otherDocumentType).lastIndexOf('Aadhar Document');
    if (docValue.otherDocumentType == "Aadhar Document" && aadharIndex !== -1) {
      this.globalService.presentAlert("Alert", "Aadhar already saved");
      this.dlist = [];
      console.log(docNameIndex, aadharIndex, "docnameIndex and aadhar index");
    }
    if (this.dlist.findIndex(val => val.otherDocumentType == docValue.otherDocumentType) !== -1) {
      this.globalService.presentAlert("Alert", `${docValue.otherDocumentType} already saved`);
    } else {
      docValue.index = this.trickIndex;
      this.trickIndex++;
      docValue.length = 0;
      docValue.imgs = [];
      console.log(this.dlist, "before docvalue push");
      this.dlist.push(docValue);
      console.log(this.dlist, "after docvalue push");
      if (this.otherDocument.valid) {
        this.documentType = docValue.otherDocumentType;
        this.documnetDescription = docValue.otherDescription;
      }
    }
  }

  async docActionSheet(docIndex, remove, index) {

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
          console.log('Cancel clicked');

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
            console.log('Cancel clicked');
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
    //console.log(doc, "track byyyyyyyyyyyyyyyyyyyyyyyyyy");
    return doc.imgs.length;
  }

  async videoRecord(docIndex, play, index, remove = false) {
    console.log('object');
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
        console.log("playyy");
        //this.vidPlayer.play(url, { volume: 0.5 }).then(val => console.log(val)).catch(err => console.log(err))
        this.streaming.playVideo(this.dlist[docIndex].imgs[0].native, { successCallback: () => console.log('object'), errorCallback: e => console.log(e), controls: true, shouldAutoClose: true });
      } else {
        let lastIndex;
        const video = await this.mediaCap.captureVideo({ duration: 60, quality: 1 });
        lastIndex = video[0].fullPath.lastIndexOf('/') + 1;
        let filePath = video[0].fullPath.substring(0, lastIndex);
        let fileName = video[0].fullPath.substring(lastIndex);
        const move = await this.file.moveFile(filePath, fileName, this.file.externalApplicationStorageDirectory, fileName);
        let webViewLink = this.webView.convertFileSrc(move.nativeURL);
        console.log(video, 'capture video');
        console.log(move, 'move');
        this.dlist[docIndex].imgs.push({ name: fileName, native: move.nativeURL, webview: webViewLink });
        this.isRecorded = true;
        // this.videoList.push({ name: fileName, native: move.nativeURL, webview: webViewLink })
      }
    }
  }

  test() {
    this.docUploadService.videoUpTest(this.progressBar);
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
    console.log(value, 'ondismiss value');
    if (value.data.signature) {
      console.log('haha');
      this.isSigned = true;
      this.signatureImage.name = 'Signature';
      this.signatureImage.native = value.data.image;
      this.signatureImage.webview = value.data.image;
      this.getDocs(docIndex, false, index, false, true);
    }
  }

  deleteSign() {

  }
}
