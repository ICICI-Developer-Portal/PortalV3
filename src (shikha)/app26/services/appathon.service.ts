import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from '../config/config';
import { Alert } from 'selenium-webdriver';

import { Observable, fromEvent, merge, of, Subject, Subscription } from 'rxjs';
import { timeout, catchError, map, mapTo } from 'rxjs/operators';

@Injectable()
export class AppathonService {
  apiUrl: string;
  private user_id = new Subject<any>();
  private user_name = new Subject<any>();

  constructor(
    private http: Http,
    private config: Config,
    private HttpClient: HttpClient,
    private router: Router,
  ) {
    this.apiUrl = config.apiUrl;
  }

  fetchAppathonDetails(data) {
    // var query = 'username=' + userName;
    var key;
    var query = '';
    for (key in data) {
      query +=
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
    }
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'fetch_appathon_details', query, options);
  }


  update_appathon_details(data) {
    var key;
    var query = '';
    for (key in data) {
      query +=
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
    }
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'update_appathon_details', query, options);
  }



  appathonFileUpload(data) {
    
    let headers = new Headers({
      'Content-Type': 'multipart/form-data',
      
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      'https://developer.icicibank.com/FileUplaodHandler_Appathon',
      data,
    );
  }
}
