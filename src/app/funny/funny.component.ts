import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router'
@Component({
  selector: 'app-funny',
  templateUrl: './funny.component.html',
  styleUrls: ['./funny.component.css']
})
export class FunnyComponent implements OnInit {

  constructor(private r:Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.r.navigateByUrl('/home')
  }

}
