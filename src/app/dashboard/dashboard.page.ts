import { File } from '@ionic-native/file/ngx';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonFab } from '@ionic/angular';
import { MediaCapture, CaptureVideoOptions, MediaFile, MediaFileData } from "@ionic-native/media-capture/ngx";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  searchtext: boolean = false;
  items: any[];
  selectedItem: any;
  @ViewChild('fab', { static: false }) fab: IonFab;


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public mediaCap: MediaCapture, public file: File) { }


  ngOnInit() {

    this.items = [{ label: "Submitted" }, { label: "Non Submitted" }, { label: "Pending" }]
  }



  onInput(e) {

  }

  openExistingPage() {
    this.router.navigate(['/existapp'], { relativeTo: this.activatedRoute });
  }
  newApplicant() {
    this.router.navigate(['/newapp'], { relativeTo: this.activatedRoute });
  }

  doSearch() {
    this.searchtext = true;
  }

  select(i) {
    this.selectedItem = i;
  }

  searchCancel(event) {
    this.searchtext = false;
  }
  closeFab() {
    this.fab.close();
  }


}
