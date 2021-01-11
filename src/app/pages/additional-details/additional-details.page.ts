import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.page.html',
  styleUrls: ['./additional-details.page.scss'],
})
export class AdditionalDetailsPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  openGroupConcern(){
    this.router.navigate(['/groupconcerndetails']);

  }

  openReferenceDetails(){
    this.router.navigate(['/referencedetails']);

  }
  openMonthlyFinacials(){
    this.router.navigate(['/montlyfinancial']);

  }
  openPreSanction(){
    this.router.navigate(['/preinspection']);

  }



}
