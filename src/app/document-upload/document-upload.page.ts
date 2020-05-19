import { FileUploadResult, FileTransferError } from '@ionic-native/file-transfer/ngx';
import { ProgressBarDirective } from './progress-bar.directive';
import { Network } from '@ionic-native/network/ngx';
import { DocUploadService, DocumentUploadOptions, DocUploadResponse } from './../global/doc-upload.service';
import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
})

export class DocumentUploadPage implements OnInit, OnDestroy {
  @ViewChild(ProgressBarDirective, { static: false }) progressBar: ProgressBarDirective;
  fileInfo = { inProgress: false, progress: 0 };
  networkStatus: string;
  conChange: Subscription;
  network = new Network();
  uploadOptions: DocumentUploadOptions;


  constructor(
    private docUploadService: DocUploadService,
    public compFactoryResolver: ComponentFactoryResolver, public globalSerivice: GlobalService) { }

  ngOnInit() {
    this.networkStatus = this.network.type;
    this.conChange = this.network.onChange().subscribe(obs => {

    });
    setInterval(() => {
      this.networkStatus = this.network.type;
    }, 1000);
  }

  async docUpload(): Promise<FileUploadResult | FileTransferError | DocUploadResponse[]> {
    this.networkStatus = this.docUploadService.networkStatusCheck();
    if (this.networkStatus === "none" || this.networkStatus === "unknown") {
      this.globalSerivice.presentAlert("Alert", "No network detected.");
      return;
    } else if (this.networkStatus === "2g") {
      this.globalSerivice.presentAlert("Alert", "Network is unstable");
    } else {
      const upload = await this.docUploadService.uploadDocument(this.progressBar, { uploadType: "single", endPoint: "" });
      return upload;
    }
  }

  ngOnDestroy() {
    this.conChange.unsubscribe();
  }

}
