import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { SqliteProvider } from './global/sqlite';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { OCR } from '@ionic-native/ocr/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { JJzip } from 'ionic-native-j-jzip/ngx';
import { ColorPickerModule } from "ngx-color-picker";
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CropDocComponent } from './Components/crop-doc/crop-doc.component';
import { DocumentUploadPageModule } from './document-upload/document-upload.module';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent, CropDocComponent],
  entryComponents: [CropDocComponent],
  imports: [
    BrowserModule,
    ColorPickerModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }), HttpClientModule,
    DocumentUploadPageModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SqliteProvider,
    BarcodeScanner,
    OCR,
    Camera,
    FilePath,
    File,
    WebView,
    Network,
    AppVersion,
    Device,
    FileTransfer,
    HTTP,
    Crop, JJzip, AndroidPermissions, MediaCapture,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
