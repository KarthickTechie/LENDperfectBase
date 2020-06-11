import { JJzip } from 'ionic-native-j-jzip/ngx';
import { ProgressBarDirective } from '../document-upload/progress-bar.directive';
import { Base64 } from '@ionic-native/base64/ngx';
import { File, Entry } from '@ionic-native/file/ngx';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, ComponentFactoryResolver, ComponentRef, ComponentFactory, ViewContainerRef, Directive, OnDestroy, Output, EventEmitter } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { of, Subscription, Observable, Subject } from 'rxjs';
import { FileTransfer, FileTransferObject, FileUploadOptions, FileTransferError, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { ProgressWidgetComponent } from '../document-upload/progress-widget/progress-widget.component';
import { Network } from '@ionic-native/network/ngx';
import { ErrorHandlingService } from '../error-handling.service';

@Injectable({
  providedIn: 'root'
})

export class DocUploadService implements OnDestroy {
  private postUrl = 'https://study-ce9e8.firebaseio.com/posts.json';
  zipUrl = "http://192.168.0.67:8188/laps/rest/LOSRestServices/uploadDocument";
  imgStartCount: number;
  imgTotalCount: number;
  fileInfo = { inProgress: false, progress: 0 };
  progressCount = 0;
  progressTotalCount: number;
  networkStatus: string;
  netChange: Subscription;
  file = new File();
  base64 = new Base64();
  transfer = new FileTransfer();
  network = new Network();
  zip = new JJzip();
  constructor(
    private http: HttpClient,
    public compFactoryResolver: ComponentFactoryResolver,
    public errorHandling: ErrorHandlingService,
  ) { }
  async copyfiles(files) {
    let arr = []
    for (let i = 0; i < files.length; i++) {
      const copyResult = await this.file.copyFile(files[i].native.substring(0, files[i].native.lastIndexOf("/")), files[i].native.substring(files[i].native.length - 18), this.file.externalApplicationStorageDirectory
        + "/photos/upload", files[i].native.substring(files[i].native.length - 18));
      arr.push(copyResult);
    }
    return arr;
  }
  async uploadDocument(progressBar: ProgressBarDirective, options: DocumentUploadOptions): Promise<FileUploadResult | FileTransferError | DocUploadResponse[]> {
    switch (options.uploadType) {
      case "zip":
        let uploadDir = await this.file.createDir(this.file.externalApplicationStorageDirectory + "/photos", "upload", true);
        console.log(uploadDir, "directory");
        let copy = await this.copyfiles(options.file)
        console.log(copy, 'hahahahahahaha');
        try {
          const zip = await this.zipUpload(progressBar);
          return zip;
        } catch (error) {
          this.errorHandling.errorLog(new Error(JSON.stringify(error)));
          return error;
        }
      case "single":
        let encodedImage: any[];
        try {
          encodedImage = await this.imageEncoding(options.file);
        } catch (error) {
          this.errorHandling.errorLog(new Error(JSON.stringify(error)));
        }
        try {
          const single = await this.singleDocUpload(encodedImage, progressBar);
          return single;
        } catch (error) {
          this.errorHandling.errorLog(new Error(JSON.stringify(error)));
        }
    }
  }

  networkStatusCheck() {
    this.netChange = this.network.onChange().subscribe(obs => {
      this.networkStatus = this.network.type;
    });
    return this.networkStatus;
  }

  async singleDocUpload(data: any[], progressBar: ProgressBarDirective): Promise<DocUploadResponse[]> {
    let resArr = [];
    const progressComponent: ComponentFactory<ProgressWidgetComponent> = this.compFactoryResolver.resolveComponentFactory(ProgressWidgetComponent);
    const hostViewContainer: ViewContainerRef = progressBar.viewContainerRef;
    hostViewContainer.clear();
    const componentRef: ComponentRef<ProgressWidgetComponent> = hostViewContainer.createComponent(progressComponent);
    componentRef.instance.docUpload = true;
    componentRef.instance.zipUpload = false;
    componentRef.instance.closeBtn.subscribe(observer => {
      componentRef.destroy();
    });
    for (let index = 0; index < data.length; index++) {
      componentRef.instance.imgStartCount = index;
      componentRef.instance.imgTotalCount = data.length;
      let httpResp: HttpResponse<object> | HttpErrorResponse;
      try {
        httpResp = await this.http.post(this.postUrl, { name: 'haha', value: data[index] }, { reportProgress: true, observe: 'events' })
          .pipe(map(event => {
            this.fileInfo.inProgress = true;
            switch (event.type) {
              case HttpEventType.UploadProgress:
                componentRef.instance.progress(Math.round(event.loaded * 100 / event.total));
                break;
              case HttpEventType.Response:
                if (index === data.length - 1) {
                  componentRef.instance.imgStartCount += 1;
                  componentRef.instance.successClose = true;
                  componentRef.instance.setImageProcess.imgSuccess = true;
                  componentRef.instance.setImageProcess.imgProcess = false;
                  componentRef.instance.setImageProcess.imgFailure = false;
                }
                return event;
            }
          }), catchError((error: HttpErrorResponse) => {
            this.fileInfo.inProgress = false;
            this.errorHandling.errorLog(new Error(JSON.stringify(error)));
            return of(error);
          })).toPromise();
      } catch (error) {
      }
      resArr.push({ index, response: httpResp });
    }
    const isError = resArr.filter(value => value.response.status !== 200);
    if (isError.length) {
      componentRef.instance.docUpload = false;
      componentRef.instance.setImageProcess.imgFailure = true;
      componentRef.instance.setImageProcess.imgProcess = false;
      componentRef.instance.setImageProcess.imgSuccess = false;
      componentRef.instance.showButton = true;
      const errIndex = isError.map(i => i.index);
      const filteredData = data.filter((val, i) => (errIndex.indexOf(i) !== -1) === true);
      componentRef.instance.docReupload.subscribe(observer => {
        this.singleDocUpload(filteredData, progressBar);
      });
    }
    return resArr;
  }

  async imageEncoding(files) {
    let fileListArray = files;
    let base64Encoded: string;
    const base64Arr = [];
    for (let i = 0; i < fileListArray.length; i++) {
      try {
        base64Encoded = await this.base64.encodeFile(fileListArray[i].native);
        base64Arr.push({ name: fileListArray[i].native.substring(fileListArray[i].native.length - 18), data: base64Encoded });
      }
      catch (error) {
        this.errorHandling.errorLog(new Error(JSON.stringify(error)));
      }
    }
    return base64Arr;
  }

  async zipUpload(processBar: ProgressBarDirective) {
    const alertComp: ComponentFactory<ProgressWidgetComponent> = this.compFactoryResolver.resolveComponentFactory(ProgressWidgetComponent);
    const hostViewContainer: ViewContainerRef = processBar.viewContainerRef;
    hostViewContainer.clear();
    const componentRef: ComponentRef<ProgressWidgetComponent> = hostViewContainer.createComponent(alertComp);
    componentRef.instance.startProgress();
    const PathToFileInString: string = this.file.externalApplicationStorageDirectory + "photos/upload";
    const PathToResultZip: string = this.file.externalApplicationStorageDirectory;
    const localFile = `Ionic${Date.now()}.zip`;
    try {
      const zipResult = await this.zip.zip(PathToFileInString, { target: PathToResultZip, name: localFile.replace('.zip', '') });
    } catch (error) {
      this.errorHandling.errorLog(new Error(JSON.stringify(error)));
    }
    const zipPath = PathToResultZip + localFile;
    const options: FileUploadOptions = {
      fileKey: "attachment",
      fileName: localFile,
      httpMethod: "POST",
      mimeType: "application/zip",
      chunkedMode: false,
      params: { fileName: localFile },
      headers: { Connection: "close" },
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    let uploadSuccess: FileUploadResult | FileTransferError;
    try {
      uploadSuccess = await fileTransfer.upload(zipPath, this.zipUrl, options);
      componentRef.instance.progressSuccess();
      componentRef.instance.closeBtn.subscribe(obs => {
        componentRef.destroy();
      });
    } catch (error) {
      componentRef.instance.progressFailure();
      try {
        const removeZip = await this.file.removeFile(PathToResultZip, localFile);
      } catch (error) {
        const zipRemoveErr = new Error(JSON.stringify(error));
        this.errorHandling.errorLog(new Error(JSON.stringify(error)));
      }
      componentRef.instance.zipReupload.subscribe(observer => {
        this.zipUpload(processBar);
      });
      componentRef.instance.closeBtn.subscribe(obs => {
        componentRef.destroy();
      });
      this.errorHandling.errorLog(new Error(JSON.stringify(error)));
      uploadSuccess = error;
    }
    return uploadSuccess;
  }

  //Gallery
  @Output() deleteImage: EventEmitter<any> = new EventEmitter(false);
  galleryDelete(parentIndex, childIndex, add = false, camera = false) {
    this.deleteImage.emit({ parentIndex, childIndex, add, camera });
  }

  galleryObservable = new Subject<any>();

  galleryView(listArray: any[], parentIndex: number, ) {
    console.log(listArray, parentIndex, "inside doc service");
    this.galleryObservable.next({ listArray, parentIndex });
    // this.galleryObservable = Observable.create(observer => {
    //   observer.next({ listArray, parentIndex });
    // })
  }


  ngOnDestroy() {
    this.netChange.unsubscribe();
  }
}

export interface DocumentUploadOptions {
  uploadType: string;
  endPoint: string;
  file?: any[];
}

export interface DocUploadResponse {
  index: number;
  response: HttpResponse<object> | HttpErrorResponse;

}
