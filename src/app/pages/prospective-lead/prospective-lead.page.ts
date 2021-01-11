import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prospective-lead',
  templateUrl: './prospective-lead.page.html',
  styleUrls: ['./prospective-lead.page.scss'],
})
export class ProspectiveLeadPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  openFollowUp(){
    this.router.navigate(['/followup']);
  }
  openProspectiveLead(){
    this.router.navigate(['/prospectivedetails']);
  }

}
