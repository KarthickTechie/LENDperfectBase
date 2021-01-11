import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Config {

    masterLink = window.atob("aHR0cDovLzE5Mi4xNjguMC4zOTo4MTg4L2xhcHMvcmVzdC8="); //"http://192.168.0.39:8188/laps/rest/"; // bharanika-System

    getUrl() {
        return this.masterLink;
    }

}
