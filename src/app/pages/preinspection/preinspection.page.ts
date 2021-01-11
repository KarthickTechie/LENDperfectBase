import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { DocumentuploadService } from './../../providers/documentupload.service';
import { Router } from '@angular/router';
import { CommonNativePluginsService } from './../../utility/common-native-plugins.service';
import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit } from '@angular/core';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-preinspection',
  templateUrl: './preinspection.page.html',
  styleUrls: ['./preinspection.page.scss'],
})
export class PreinspectionPage implements OnInit {
  preSancation:FormGroup;
  showCameraBtn =true;
  showVideoBtn =true;
  imageResult:any[];
  videoResult:any [];
  constructor(public formctrl: FormcontrolService,public plugin:CommonNativePluginsService,public router:Router,
    public docUploadService:DocumentuploadService,public mediaCap: MediaCapture,public streaming:StreamingMedia,public file:File,public webView:WebView) { }

  ngOnInit() {
    this.preSancation = this.formctrl.preSanctionform();

  }

 async openCamera(){
    this.imageResult = await this.plugin.takeImage(1);
    if(this.imageResult){
      this.showCameraBtn = false;
    }
  }

  async openVideo(){
  this.videoResult = await this.plugin.takeVideo();
    if(this.videoResult){
      this.showVideoBtn = false;
    }

  }

  showVideo(){
    this.plugin.playVideo(this.videoResult[0].webview);
  }

  showImage(){
    this.router.navigate(['gallery'], { skipLocationChange: true }).then(val => {
      if (val) {
        this.docUploadService.galleryView(this.imageResult, 0);
      }
    });
  }


}
