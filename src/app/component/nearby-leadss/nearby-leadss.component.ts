import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby-leadss',
  templateUrl: './nearby-leadss.component.html',
  styleUrls: ['./nearby-leadss.component.scss'],
})
export class NearbyLeadssComponent implements OnInit {
  applicantDetails= [
    {company: "Xerox shop", address: "#123, Thiruvalluvar street, Thiruvanmiyur, Chennai, Tamilnadu - 600032, India", user: "User 1 at 20/09/2020", status: "Interested", distance: "1km", applNo: "BOI123455"},
    {company: "Flower shop", address: "#123, Thiruvalluvar street, Thiruvanmiyur, Chennai, Tamilnadu - 600032, India", user: "User 1 at 20/09/2020", status: "Interested", distance: "1km", applNo: "BOI123456"},
  ]
  constructor() { }

  ngOnInit() {}

}
