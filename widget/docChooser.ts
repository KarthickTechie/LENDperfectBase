import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Injectable } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { Platform } from '@ionic/angular';

declare var window;

@Injectable({
    providedIn: 'root'
})


export class DocChooser {
    imageResponse: any;
    options: any;

    constructor(public webview: WebView, public file: File, public platform: Platform, public camera: Camera, private crop: Crop, public permission: AndroidPermissions) {
        platform.ready().then(() => {
            this.checkAndCreateDir();
        });
    }

    //Check and create Directory for save Documents
    checkAndCreateDir() {
        this.file.checkDir(this.file.externalApplicationStorageDirectory, 'photos').then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error);
            this.file.createDir(this.file.externalApplicationStorageDirectory, 'photos', false).then(res => {
                console.log(res);
            })
        })
    }
    async checkPermissions() {
        let result = true;
        const read = await this.permission.checkPermission(this.permission.PERMISSION.READ_EXTERNAL_STORAGE);
        const write = await this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE);
        const manage = await this.permission.checkPermission(this.permission.PERMISSION.MANAGE_EXTERNAL_STORAGE);
        const camera = await this.permission.checkPermission(this.permission.PERMISSION.CAMERA);
        console.log(camera, read, write, 'crw');
        if (!read.hasPermission || !write.hasPermission || !camera.hasPermission) {
            console.log('inside if');
            const req = await this.permission.requestPermissions([this.permission.PERMISSION.READ_EXTERNAL_STORAGE, this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE, this.permission.PERMISSION.CAMERA]);
            console.log(req, 'req in docchoose');
            result = req['hasPermission'];
        }
        return result;
    }
    // multiple document upload
    getDocs(options): Promise<any[]> {

        return new Promise((resolve, reject) => {
            this.imageResponse = [];
            var self = this;

            this.file.checkDir(this.file.externalApplicationStorageDirectory, 'photos').then(async result => {
                if (await this.checkPermissions()) {
                    window.imagePicker.getPictures(
                        function (results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                let currentfilepath = results[i].split('tmp_')[0];
                                let _fileExtention = results[i].substr(results[i].lastIndexOf(".") + 1);
                                let fileName = results[i].substr(results[i].lastIndexOf("/") + 1, results[i].lastIndexOf(_fileExtention));
                                let newFileName = new Date().getTime().toString() + i.toString() + '.jpg';
                                self.file.moveFile(currentfilepath, fileName, self.file.externalApplicationStorageDirectory + 'photos/', newFileName).then(data => {
                                    // let movedprofPic = "file:///storage/emulated/0" + data.fullPath;
                                    let index = data.nativeURL.lastIndexOf("/") + 1;
                                    let fileName = data.nativeURL.substring(index);
                                    self.imageResponse.push({ webview: self.webview.convertFileSrc(data.nativeURL), native: data.nativeURL, name: fileName });
                                    if (self.imageResponse.length == results.length) {
                                        console.log(self.imageResponse);
                                        resolve(self.imageResponse);
                                    }
                                }, err => {
                                    console.log("move fail: " + JSON.stringify(err));
                                    reject(err)
                                })

                            }
                        }, function (error) {
                            console.log('Error: ' + error);
                            reject(error);
                        }, options
                    );
                }
            }).catch(error => {
                console.log(error);
            })
        });
    }



    async docPicUpload(): Promise<any[]> {
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
        // 
        console.log(fileName, srcPath, "file name");
        const fileMove = await this.file.moveFile(srcPath, fileName, this.file.externalApplicationStorageDirectory + '/photos', fileName);
        console.log(fileMove, "moved file");
        let convertFile = this.webview.convertFileSrc(fileMove.nativeURL);
        console.log(cameraImage, 'cameraaaaaaaaa');
        let index = fileMove.nativeURL.lastIndexOf('/') + 1;
        let ImgfileName = fileMove.nativeURL.substring(index);
        return [{ native: fileMove.nativeURL, webview: convertFile, name: ImgfileName }];
    }
    // plofile picture upload
    getProfilePic(options) {
        console.log('object');
        return new Promise((resolve, reject) => {
            this.file.checkDir(this.file.externalApplicationStorageDirectory, 'photos').then(result => {
                this.camera.getPicture(options).then((imageData) => {
                    this.moveFile(imageData).then(result => {
                        console.log(result, 'before resolve');
                        resolve(result)
                    }).catch(error => {
                        console.log("Image Move", `Unable to Move Image ${error}`);
                        reject(error);
                    })
                }, (err) => {
                    console.log(err);
                    // reject(err);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        }).catch(error => {
            console.log(error);
        });
    }

    //Move file from chache to photos Directory
    moveFile(picdata) {
        return new Promise((resolve, reject) => {
            picdata = picdata.split('?')[0]
            let _fileExtention = picdata.substr(picdata.lastIndexOf(".") + 1);
            let fileName = picdata.substr(picdata.lastIndexOf("/") + 1, picdata.lastIndexOf(_fileExtention));
            let timestamp = new Date().getTime().toString() + '.jpg';
            this.file.moveFile(this.file.externalCacheDirectory, fileName, this.file.externalApplicationStorageDirectory + 'photos/', timestamp).then(data => {
                resolve(this.webview.convertFileSrc(data.nativeURL));
            }, err => {
                console.log("move fail: " + JSON.stringify(err));
                reject(err)
            })

        })
    }

    //Image Croping
    CropImg(docs: any[], img): Promise<any> {
        return new Promise((resolve, reject) => {
            let filename = img.substr(img.lastIndexOf("/") + 1);
            this.crop.crop(this.file.externalApplicationStorageDirectory + 'photos/' + filename, { quality: 100 }).then(newImage => {
                console.log('new image path is: ' + newImage.split('?')[0]);
                // resolve(this.webview.convertFileSrc(newImage.split('?')[0]));
                this.moveFile(newImage.split('?')[0]).then(result => {
                    docs = docs.filter(e => e !== img);
                    docs.push(result);
                    resolve(docs)
                }).catch(error => {
                    console.log("Image Move", `Unable to Move Image ${error}`);
                    reject(docs);
                })
            })
                .catch(error => {
                    console.log(error);
                    // reject(error)
                });
        }).catch(error => {
            console.log(error);
        });
    }

}