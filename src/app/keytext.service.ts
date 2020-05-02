import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeytextService {

  constructor() { }

  personalDetails = {
    'Personal DATA': 'Personal DATA',
    'First Name': 'First Name',
    'Last Name': 'Last Name'
  }
}
