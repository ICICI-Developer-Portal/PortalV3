
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

import {
  Http,
  Headers,
  RequestOptions,
  Response,
  RequestMethod,
  ResponseContentType
} from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Router } from "@angular/router";
import { Config } from "../config/config";
import { Alert } from "selenium-webdriver";

import { Observable, fromEvent, merge, of, Subject, Subscription } from "rxjs";
import { timeout, catchError, map, mapTo } from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class MerchantOnboardingService {
 
  apiUrl: string;
  UAT_apiUrl: string;
  merchantData:any = {}
  constructor(
    private http: Http,
    private config: Config,
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.apiUrl = config.apiUrl;
    this.UAT_apiUrl = config.UAT_apiUrl;
    this.merchantData = {};
  }

  setMerchantData(val: object){
    this.merchantData= val;
  }
  getMerchantData(){
    return this.merchantData;
  }

  /**
 * 
 * @param json - Content-Type :  MULTIPART_FORM_DATA
bUserId : 
bUserName :
bUserEmail :
bUserHId ;
mName :
desc :
rManager :
reqDt :
domain :
domainApi :
ipList : 
cBackUrl :
nSign :
apiUrl :
certificate :  -(File type attachment)
remarks :
apiName :
encrypt :
decrypt :
mode :

 
 * @returns 
 */
saveMerchantOnboardRequest(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "merchantOnboard", query);
}
/**
 * 
 * @param json 
 * bUserId: CUST0558
 */
getBURequests(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getBEUserRequests", query, options);
}
/**
 * 
 * @param json
 * buHId : BH01 
 */
getBUHRequests(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getBEHRequests", query, options);
}
/**
 * 
 * @param json 
 *reqId : 3
 */
approveRequestBUH(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "approveReqIdByBEHead", query, options);
}
/**
 * 
 * @param json 
 */
getProductDetail() {
  var query = "";
  /* var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  } */
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getApiProductsDetails", query, options);
}
/**
 * 
 * @param json 
 *reqId : 3
 status : Approved
 */
updateRequestStatus(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "createJiraByReqId", query, options);
}

approveJiraByReqId(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "approveJiraByReqId", query, options);
}
/**
 * 
 * @param json 
 *bUserId: CUST0558
 */
getBEUserHeadId(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getBEUserHeadId", query, options);
}
downloadFromURL(url: string){
  return this.http.get(url, { responseType: ResponseContentType.Blob})
}
}
