import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestService } from "src/app/providers/rest";

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.page.html',
  styleUrls: ['./new-application.page.scss'],
})
export class NewApplicationPage implements OnInit {

  constructor(public router: Router, public rest: RestService) { }

  ngOnInit() {
      }

  goBack(){
    this.router.navigate(['/homescreen']);

  }

  borrowerDetails(){
    this.router.navigate(['/borrowerdetails'],{queryParams:{value:'borrower'}});
  }
  openPromotorDetails(){
    this.router.navigate(['/borrowerdetails'],{queryParams:{value:'promotor'}});
  }
  openGurantorDetails(){
    this.router.navigate(['/borrowerdetails'],{queryParams:{value:'gurantor'}});
  }
  
  additionalDetails(){
    this.router.navigate(['/additionaldetails']);
  }
  openReallocation(){
    this.router.navigate(['/reallocation']);
  }

  openOtherDocuments(){
    this.router.navigate(['/otherdocuments']);
  }
  openCheckEligibility(){
    this.router.navigate(['/checkeligibility']);
  }

  

}
