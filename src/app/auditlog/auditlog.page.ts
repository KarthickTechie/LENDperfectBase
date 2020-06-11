import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.page.html',
  styleUrls: ['./auditlog.page.scss'],
})
export class AuditlogPage implements OnInit {
  uploadURL="http://192.168.0.43:9005/laps/rest/LosDocumentServices/uploadLogFile";
  constructor() { }

  ngOnInit() {
  }

}
