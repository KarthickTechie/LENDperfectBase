import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.page.html',
  styleUrls: ['./video-gallery.page.scss'],
})
export class VideoGalleryPage implements OnInit {
  videoList = []; signatureImage;
  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  isDrawingDone = false;
  isClearable = false;
  constructor(public mediaCap: MediaCapture, public file: File, public webView: WebView, public streaming: StreamingMedia, public vidPlayer: VideoPlayer) { }
  ngOnInit() {
  }
  async record() {
    let index;
    const video = await this.mediaCap.captureVideo({ duration: 10, quality: 1 });
    index = video[0].fullPath.lastIndexOf('/') + 1;
    let filePath = video[0].fullPath.substring(0, index);
    let fileName = video[0].fullPath.substring(index);
    const move = await this.file.moveFile(filePath, fileName, this.file.externalApplicationStorageDirectory, fileName);
    let webViewLink = this.webView.convertFileSrc(move.nativeURL);
    
    this.videoList.push({ name: fileName, native: move.nativeURL, webview: webViewLink })
  }
  play(url) {
    //this.vidPlayer.play(url, { volume: 0.5 }).then(val => console.log(val)).catch(err => console.log(err))
    this.streaming.playVideo(url, { successCallback: () => console.log('object'), errorCallback: e => console.log(e), controls: true, shouldAutoClose: true });
  }
  drawStart() {
    this.isClearable = true;

  }
  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.isDrawingDone = false;

  }
  drawClear() {
    this.isClearable = false;
    this.isDrawingDone = false;
    this.signaturePad.clear();
  }
  showImage(data) {
    this.signatureImage = data
  }
}
