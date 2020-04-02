import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name="citizen";
  username:string='John';
  items=['ball','coke','water']
  constructor() { 
   
  }

  ngOnInit() {
  }

  onInput(val){
    console.log(val.target.value)
    this.username = val.target.value;
  }

}
