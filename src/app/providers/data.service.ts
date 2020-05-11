import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }


}
