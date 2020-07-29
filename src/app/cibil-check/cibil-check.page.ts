import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cibil-check',
  templateUrl: './cibil-check.page.html',
  styleUrls: ['./cibil-check.page.scss'],
})
export class CibilCheckPage implements OnInit {
  showSpinner:boolean = false;
  showIcon:boolean = true;
  showMeter:boolean = false;
  showProgress:boolean = false;
  constructor(public router:Router) { }

  ngOnInit() {
  }

  closeView(){
    console.log("close clicked");
    this.router.navigate(['/existapp'],{skipLocationChange:true})
  }


}
