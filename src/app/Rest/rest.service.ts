import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {AuditLogService} from '../AuditLogger/audit-log.service'


@Injectable({
  providedIn: 'root'
})
export class RestService {

  masterLink: any;
  constructor(private http: HTTP, public auditLog: AuditLogService) { 
    this.masterLink = window.atob("aHR0cDovLzE5Mi4xNjguMC40Mzo5MDA1L2xhcHMvcmVzdC8=");//Keerthana-System http://192.168.0.43:9005/laps/rest/
  }

  restApiCall(className, method, data) {
    return new Promise((resolve, reject) => {
        this.http.setDataSerializer("json");
        let link;
        link = this.masterLink + className + '/' + method;
    this.auditLog.addAuditTrail(link, method + " Request", JSON.stringify(data));
    this.http.post(link, data, {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }).then(response => {
      this.auditLog.addAuditTrail(link, method + " Response", response);
      resolve(response);
    }, error => {
      this.auditLog.addAuditTrail(link, method + " Error Response", JSON.stringify(error));
      reject(error);
    });
    });
  }
}
