import { KycScanOptionComponent } from './component/kyc-scan-option/kyc-scan-option.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { ReferenceCardComponent } from './component/reference-card/reference-card.component';
import { NearbyLeadssComponent } from './component/nearby-leadss/nearby-leadss.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ListviewComponent } from './component/listview/listview.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { Device } from '@ionic-native/device/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { DirectivesModule } from './directives/directives.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NearbyLeadssComponent, ReferenceCardComponent,KycScanOptionComponent],
  entryComponents: [NearbyLeadssComponent, ReferenceCardComponent,KycScanOptionComponent],

  imports: [BrowserModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient],

    }
  }), HttpClientModule, DirectivesModule],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    File, Crop, AndroidPermissions,
    FileTransfer,
    Camera,
    AppVersion,
    Device,
    WebView,
    HTTP,
    MediaCapture,
    Network,
    StreamingMedia,
    FilePath, InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
