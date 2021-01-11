import { SqliteProvider } from 'src/app/providers/sqlite';
// import { Post, Login } from './post.modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Config } from "./../providers/config";
import { map, finalize, catchError } from "rxjs/operators";
import { HTTP } from '@ionic-native/http/ngx';
import { from, throwError } from 'rxjs';

import { GlobalService } from './global.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class RestService {
    // link: any = window.atob("aHR0cDovLzE5Mi4xNjguMC4zOTo4MTg4L2xhcHMvcmVzdC8=");
    url: any = 'http://192.168.0.143:9161/api/v1.0/';
    // http://localhost:9161/api/v1.0/idfy/video-kyc-profile/create
    // http://192.168.0.143:9161/api/v1.0/scoreme/getcompanyinfo
    // /api/v1.0/karza/DigitalEssentials/MobileOTP

    // link: any = 'https://losuat.janabank.com:19080/lapswebpre/rest/LOSMobileRestServices/';

    constructor(public config: Config, public http: HTTP, public global: GlobalService, public sqlite: SqliteProvider) {

    }



    restApiCall(serviceName, methodName, data) {
        if (this.global.getNetworkStatus() != 'none') {
            this.global.globalLodingPresent("Please Wait...");

            let link = this.url + methodName;

            let header = { 'clientID': '168', 'productID': '1' };
            // header.append('clientID', '168');
            // header.append('productID', '1');
            this.http.setDataSerializer('json');
            this.http.setRequestTimeout(5000);

            let dateTime = new Date();
            let curDateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
            this.sqlite.addAuditTrail(curDateTime, link, methodName + " Request", JSON.stringify(data));
            return new Promise((resolve, reject) => {
                // let nativeUrl = this.http.post(link, data, { headers: header });
                let nativeUrl = this.http.sendRequest(link, { method: 'post', data, headers: header });
                from(nativeUrl).
                    pipe(
                        map(responseData => {
                            let data = JSON.parse(responseData.data);
                            const postArray = [];
                            // if (Array.isArray(data)) {
                            //     return data
                            // } else {
                            //     return postArray.push(data);
                            // }
                            // for (const key in data) {
                            //     postArray.push({ ...data })
                            // }
                            return data//postArray;
                        }),
                        finalize(() => this.global.globalLodingDismiss()),
                        catchError(err => {
                            console.log("Error inside rest service catch error", err);
                            return throwError(err);
                        }),
                    )
                    .subscribe(data => {
                        console.log("data", data);
                        resolve(data);
                        this.sqlite.addAuditTrail(curDateTime, link, methodName + " Request", JSON.stringify(data));
                    }, error => {
                        console.log("Subscribe Error", error);
                        reject(error);
                        this.sqlite.addAuditTrail(curDateTime, link, methodName + " Request", JSON.stringify(error));
                    })


                // this.http.post(link, data, {}).then((res) => {
                //     console.log(res, "aaaaaaaa");
                //     resolve(res);
                // }, error => {
                //     console.log(error);
                //     reject(error);
                // })
            })


        }

        else {
            this.global.presentAlert("Alert", "Please Enable Internet Connection");
        }



    }

}