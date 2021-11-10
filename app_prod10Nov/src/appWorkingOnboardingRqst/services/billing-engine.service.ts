
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

@Injectable()
export class BillingEngineService {
  
  apiUrl: string;
  UAT_apiUrl: string;
  userData;
  appData;
  gMerchantList:any = [];
  gMerchantDetail:any= [];

  getDataFromComponent$: Observable<any>;
  private getDataFromComponentSubject = new Subject<any>();



  
  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  constructor(
    private http: Http,
    private config: Config,
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.apiUrl = config.apiUrl;
    this.UAT_apiUrl = config.UAT_apiUrl;
    this.getDataFromComponent$ = this.getDataFromComponentSubject.asObservable();
    this.userData= {};
    this.gMerchantList = [];
    this.gMerchantDetail = [];
  }

  
/**
 * 
 * @param json - 
 * @returns 
 */
getMerchantList(json) {
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
  return this.http.post(this.apiUrl + "getMerchantList", query, options);
}
/**
 * 
 * @param json - email
 * @returns 
 */
getMerchantDetail(json) {
  var query = "";
  var key;
  /* for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  } */
  let headers = new Headers({
    "Content-Type": "application/json"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getMerchantDetail", json, options);
}
getData() {
  return this.http.get('https://jsonplaceholder.typicode.com/todos');
 }

 changeMessage(message: string) {
  this.messageSource.next(message)
}

getDataFromComponent(data) {
  console.log(data); // I have data! Let's return it so subscribers can use it!
  // we can do stuff with data if we want
  this.getDataFromComponentSubject.next(data);
}

  /**
   * 
   * @param val set and get User profile
   */  
setUserData(val: object){
  this.userData= val;
}
getUserData(){
  return this.userData;
}
 
setAppData(val: object){
  this.appData= val;
}
getAppData(){
  return this.appData;
}
/**
 * 
 * @param val Get set merchant list
 */
setMerchantListData(val: object){
  this.gMerchantList= val;
}
getMerchantListData(){
 
  return this.gMerchantList;
}
setMerchantDetailData(val: object){
  this.gMerchantDetail= val;
}
getMerchantDetailData(){
 
  return this.gMerchantDetail;
}

/**
 * Get App detail for merchant
 * @param json 
 * @returns json
 */
getMerchantAppDetail(json) {
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
  return this.http.post(this.apiUrl + "getMerchantAppDetail", query, options);
}
/**
 * Gets app details on the basis of App ID
 * @param json - appId
 * @returns 
 */

 getAppDetail(json) {
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
  return this.http.post(this.apiUrl + "getAppDetail", query, options);
}
/**
 * 
 * @param json -apiProductName
 * @returns 
 */
getProductAttributes(json) {
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
  return this.http.post(this.apiUrl + "getProductAttributes", query, options);
}
getApiProducts () {
 // https://developer.icicibank.com/rest/apiProducts 
  var query = "";
  /* var key;
   for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }  */
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "apiProducts", query, options);
}
getRatePlane() {
  var query = "";
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getRateplans", query, options);
   
}
/**
 * 
 * @param json 
 appName : 
email : 
appId :
status :
developerId : 
attributes :

 */

saveRatePlan(json) {
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
  return this.http.post(this.apiUrl + "setRatePlan", query, options);
}
getApps() {
  var query = "";
  /* var key;
   for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }  */
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getApps", query, options);
}
getAppsDetail(json) {
  /* var query = "";
  var key;
   for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }  */
  let headers = new Headers({
    "Content-Type": "application/json"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getAllAppDetails", json, options);
}
getRatePlanPending() {
  var query = "";
  /* var key;
   for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }  */
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getRatePlanPending", query, options);
}
getRatePlanPendingDetail() {
  var query = "";
  /* var key;
   for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }  */
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "getRatePlanPendingDetail", query, options);
}
getBEngineHeadRequests(json) {
  console.log("yes")
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
  return this.http.post("https://developer.icicibank.com/rest/getBEngineHeadRequests", query, options);
}

getBEngineUserRequests(json) {
  console.log("yes")
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
  return this.http.post("https://developer.icicibank.com/rest/getBEngineUserRequests", query, options);
}

}

