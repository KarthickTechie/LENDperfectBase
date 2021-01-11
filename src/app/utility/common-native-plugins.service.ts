import { FilePath } from '@ionic-native/file-path/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonNativePluginsService {

  constructor(public webview: WebView, public file: File, public platform: Platform, public camera: Camera, private crop: Crop, public permission: AndroidPermissions,
    public mediaCap: MediaCapture, public streaming: StreamingMedia, public filePath: FilePath) {
    setTimeout(() => {
      console.log('hahah')
      this.checkPermissions();
      this.checkDirectory()
    }, 1000);
  }

  async checkPermissions() {
    let result = true;
    const read = await this.permission.checkPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE);
    const write = await this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE);
    const manage = await this.permission.checkPermission(this.permission.PERMISSION.MANAGE_EXTERNAL_STORAGE);
    const camera = await this.permission.checkPermission(this.permission.PERMISSION.CAMERA);
    console.log(camera, read, write, manage, 'crw');
    if (!read.hasPermission || !write.hasPermission || !camera.hasPermission) {
      const req = await this.permission.requestPermissions([this.permission.PERMISSION.READ_EXTERNAL_STORAGE, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE, this.permission.PERMISSION.CAMERA]);
      result = req['hasPermission'];
    }

    return result;
  }

  async checkDirectory() {
    let dirCheck;
    try {
      dirCheck = await this.file.checkDir(this.file.externalApplicationStorageDirectory, 'photos');
    } catch (error) {
      console.log(error, 'dirCheck err')
      if (error.message === 'NOT_FOUND_ERR') {
        await this.file.createDir(this.file.externalApplicationStorageDirectory, 'photos', false);
        this.checkDirectory();
      }
    }
    console.log(dirCheck, 'check directory');

  }
  async takeImage(value: number) {
    let image;
    try {
      image = await this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true,
        sourceType: value
      });
    } catch (error) {
      console.log("camera plugin error");
    }
    console.log(image, 'takeImage')
    let conFile = await this.filePath.resolveNativePath(image)
    let sourcePath = conFile.substring(0, image.lastIndexOf('/'));
    let soureFile = conFile.substring(image.lastIndexOf('/') + 1);
    let moveFile;
    console.log(conFile, "ttttttttttttt");

    try {
      // moveFile = await this.file.moveFile(sourcePath, soureFile, this.file.externalApplicationStorageDirectory + 'photos/', soureFile);
      moveFile = await this.file.copyFile(sourcePath, soureFile, this.file.externalApplicationStorageDirectory + 'photos/', soureFile);
      console.log(moveFile, 'moveFile')
    } catch (error) {
      console.log(error, "plugin error");
    }
    return [{ native: moveFile.nativeURL, webview: this.webview.convertFileSrc(moveFile.nativeURL) }]

  }


  async takeVideo() {
    const video = await this.mediaCap.captureVideo({ duration: 60, quality: 1 });
    let lastIndex = video[0].fullPath.lastIndexOf('/') + 1;
    let filePath = video[0].fullPath.substring(0, lastIndex);
    let fileName = video[0].fullPath.substring(lastIndex);
    const move = await this.file.moveFile(filePath, fileName, this.file.externalApplicationStorageDirectory + 'Vidoes/', fileName);
    let webViewLink = this.webview.convertFileSrc(move.nativeURL);
    return [{ name: fileName, webview: move.nativeURL, webviews: webViewLink }]
  }

  playVideo(playContent) {
    this.streaming.playVideo(playContent, { successCallback: () => console.log('object'), errorCallback: e => console.log(e), controls: true, shouldAutoClose: true });
  }



}
