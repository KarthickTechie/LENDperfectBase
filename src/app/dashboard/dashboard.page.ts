import { File } from '@ionic-native/file/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonFab } from '@ionic/angular';
import {GlobalService} from '../global/global.service';

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


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public file: File,public global:GlobalService) { }


  ngOnInit() {

    this.items = [{ label: "Submitted" }, { label: "Non Submitted" }, { label: "Pending" }]
  }

  // async record() {
  //   console.log('object');
  //   let index;
  //   const video = await this.mediaCap.captureVideo({ duration: 10, quality: 1 });
  //   index = video[0].fullPath.lastIndexOf('/') + 1;
  //   let filePath = video[0].fullPath.substring(0, index);
  //   let fileName = video[0].fullPath.substring(index);
  //   const move = await this.file.moveFile(filePath, fileName, this.file.externalApplicationStorageDirectory, fileName);
  //   console.log(video, 'capture video');
  // }

  onInput(e) {

  }

  openExistingPage() {
    this.router.navigate(['/existapp'], { relativeTo: this.activatedRoute });
  }
  newApplicant() {
    this.global.setApplicantType("A");
    this.global.setRefId("");
    this.global.setId("");
    this.global.setProfileImage("");
    this.global.setEditSaveStatus("");
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
