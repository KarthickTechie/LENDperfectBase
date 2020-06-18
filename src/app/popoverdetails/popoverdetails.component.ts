import { SqliteProvider } from './../global/sqlite';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { NavParams } from '@ionic/angular';
import '../../assets/js/progressbar.js';


declare var ProgressBar: any;
declare var circleAnim_container: any;

@Component({
  selector: 'app-popoverdetails',
  templateUrl: './popoverdetails.component.html',
  styleUrls: ['./popoverdetails.component.scss'],
})
export class PopoverdetailsComponent implements OnInit {

  viewApplication = 'A';
  applicantview: boolean = false;
  appItems = [];
  coAppItems = [];
  gauItems = [];
  totalImageCount: number = 13;
  personalPicCount: number = 2;
  profilePic = [];
  detailsview: any;
  showMeter: boolean = false;
  refId: any;
  id: any;
  applicantType: any;
  existingData: any;
  appProfile: any;
  otherDoc = [];
  showSpinner:boolean = false;
  showIcon:boolean = true;

  constructor(public global: GlobalService, public NavParams: NavParams, public sqlite: SqliteProvider) {
    this.detailsview = this.NavParams.get("data");
    this.existingData = this.NavParams.get("applicant");
    if (this.existingData) {
      this.refId = this.existingData.refId;
      this.id = this.existingData.id;
      this.applicantType = this.existingData.applicantType;
    }
    this.getFullDetails();




  }
  ngOnInit() { }

  ngAfterViewInit() {
    //  // var animId = document.getElementById('circleAnim_container');
    //   var animation = document.querySelector('.circleAnim_container');
    //   animation.classList.add('svg');
    // var bar = new ProgressBar.SemiCircle(circleAnim_container, {
    //   strokeWidth: 15,
    //   color: "teal",
    //   trailColor: '#eee',
    //   trailWidth: 13,
    //   easing: 'easeInOut',
    //   duration: 4000,
    //   svgStyle: null,
    //   text: {
    //     value: '',
    //     alignToBottom: true
    //   },
    //   from: { color: '#4000ff' },
    //   to: { color: ' #0080ff' },
    //   // Set default step function for all animate calls
    //   step: (state, bar) => {
    //     bar.path.setAttribute('stroke', state.color);
    //     var value = Math.round(bar.value() * 100);
    //     if (value === 0) {
    //       bar.setText('');
    //     } else {
    //       bar.setText(value + "");
    //     }
    //     bar.text.style.color = "#0080ff";
    //   }
    // });
    // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    // bar.text.style.fontSize = '1.2rem';
    // bar.animate(0.90);
  }

  closeInfo() {
    this.global.infoClose('close');
  }

  segmentChanged(event) {
    this.viewApplication = event.target.value;
  }

  showAppDetails() {
    this.applicantview = !this.applicantview;
  }


  checkBureau(){
    this.showSpinner = true;
    this.showIcon = false;
  }


  startMeter() {
    this.showSpinner = false;
    this.showIcon = false;
    this.showMeter = true;
    // this.chart();
    // if (this.showMeter) {
      // var animId = document.getElementById('circleAnim_container');
      // console.log('annimated', animId)
      // animId.classList.add('svg');
      // var bar = new ProgressBar.SemiCircle(circleAnim_container, {
      //   strokeWidth: 15,
      //   color: "teal",
      //   trailColor: '#eee',
      //   trailWidth: 13,
      //   easing: 'easeInOut',
      //   duration: 4000,
      //   svgStyle: null,
      //   text: {
      //     value: '',
      //     alignToBottom: true
      //   },
      //   from: { color: '#4000ff' },
      //   to: { color: ' #0080ff' },
      //   // Set default step function for all animate calls
      //   step: (state, bar) => {
      //     bar.path.setAttribute('stroke', state.color);
      //     var value = Math.round(bar.value() * 100);
      //     if (value === 0) {
      //       bar.setText('');
      //     } else {
      //       bar.setText(value + "");
      //     }
      //     bar.text.style.color = "#0080ff";
      //   }
      // });
      // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      // bar.text.style.fontSize = '1.4rem';
      // bar.animate(0.100);
    // }
  }


  async chart(){
    var bar =await new ProgressBar.SemiCircle(circleAnim_container, {
      strokeWidth: 15,
      color: "teal",
      trailColor: '#eee',
      trailWidth: 13,
      easing: 'easeInOut',
      duration: 4000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: true
      },
      from: { color: '#4000ff' },
      to: { color: ' #0080ff' },
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        var value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(value + "");
        }
        bar.text.style.color = "#0080ff";
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1.2rem';
    bar.animate(0.90);
  }

  

  async getFullDetails() {
    let allDetails = await this.sqlite.getAllDetails(this.refId, "A");
    (allDetails) ? this.appItems = allDetails : this.appItems = [];
    (allDetails) ? this.appProfile = allDetails[0].profileImage : this.appProfile = "assets/imgs/round_headshot.png";
    let coAppCount = await this.sqlite.getAllCoapplicants(this.refId, "C");
    if (coAppCount.length) {
      let allCoappDetails = await this.sqlite.getAllDetails(this.refId, "C", coAppCount.length);
      (allCoappDetails) ? this.coAppItems = allCoappDetails : this.coAppItems = [];
    }
    let gurCount = await this.sqlite.getAllGurantors(this.refId, "G");
    if (gurCount.length) {
      let allGurDetails = await this.sqlite.getAllDetails(this.refId, "G", gurCount.length);
      (allGurDetails) ? this.gauItems = allGurDetails : this.gauItems = [];
    }
    let allDoc = await this.sqlite.getAllDocuments(this.refId);
    (allDoc) ? this.otherDoc = allDoc : this.otherDoc = [];
    let profileDoc = await this.sqlite.getAllProfilePic(this.refId);
    (profileDoc) ? this.profilePic = profileDoc : this.profilePic = [];
    this.totalImageCount = this.profilePic.length + this.otherDoc.length;
  }
}

