import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.page.html',
  styleUrls: ['./net-worth.page.scss'],
})
export class NetWorthPage implements OnInit {
  appType:any;
  constructor(public router:Router,public activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParamMap.subscribe(data => {
      this.appType = data['params'].appType;
    });
  }

  ngOnInit() {
  }

  openLiabilites(){
this.router.navigate(['/liabilitydetails'],{queryParams:{appType:this.appType}})
  }

  openAsset(){
    this.router.navigate(['/assetdetails']);
  }

}
