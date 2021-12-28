import { Injectable } from "@angular/core";
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

@Injectable()
export class LoginService {
  
  apiUrl: string;
  UAT_apiUrl: string;
  private user_id = new Subject<any>();
  private user_name = new Subject<any>();
  private salt = new Subject<any>();

  constructor(
    private http: Http,
    private config: Config,
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.apiUrl = config.apiUrl;
    this.UAT_apiUrl = config.UAT_apiUrl;
  }

  sendUserId(id: string) {
    this.user_id.next(id);
    this.user_name.next(localStorage.getItem("username"));
   
  }
  check_user_log() {
    if (localStorage.getItem("id") == "" || !localStorage.getItem("id")) {
      this.sendUserId("");
      this.LogoutPortal().subscribe(
        res => {
          this.router.navigate(["/index"]);
        },
        err => {
          this.router.navigate(["/index"]);
        }
      );
      this.router.navigate(["/index"]);
    }
  }
  clearUserId() {
    this.user_id.next();
  }

  getUserId(): Observable<any> {
    this.user_name.next(localStorage.getItem("username"));
    return this.user_id.asObservable();
  }

  sendUserName(id: string) {
    this.user_name.next(id);
  }

  clearUserName() {
    this.user_name.next();
  }

  getUserName(): Observable<any> {
    return this.user_name.asObservable();
  }

  sendSalt(id: string) {
    this.salt.next(id);
  }

  clearSalt() {
    this.salt.next();
  }

  getSaltValue(): Observable<any> {
    return this.salt.asObservable();
  }
 
  //#region Login Api
  Login(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers  });
 // return this.http.post(this.apiUrl + "login", query, options);
  return this.http.post(this.apiUrl + "loginProd", query, options);
//return this.http.post(this.UAT_apiUrl + "login1", query, options);
  }
  LoginTest(data,token) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : token ,
    });
    let options = new RequestOptions({ headers: headers  });
   return this.http.post(this.apiUrl + "login1", query, options);
// return this.http.post(this.UAT_apiUrl + "login1", query, options);
//return this.http.post("lhttps://developer.icicibank.com/rest/login1", query, options);

  }
  //#JWT Login Api
  LoginJWT(data) {
    var key;
    var query = '';
    for (key in data) {
      query +=
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
    }
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'loginJWT', query, options);
   //return this.http.post(this.UAT_apiUrl + 'loginJWT', query, options);
  }

  LoginPortal(json) {
    let options = {
      withCredentials: true
    };
    const formData = new FormData();
    formData.append("dev-auth", "true");
    formData.append("username", json["username"]);
    formData.append("password", json["password"]);
    formData.append("reset-username", "");
    return this.HttpClient.post<any>(
      "https://sandbox.icicibank.com/login",
      formData,
      options
    );
  }

  LogoutPortal() {
    let options = {
      withCredentials: true
    };
    return this.HttpClient.get<any>(
      "https://sandbox.icicibank.com/logout",
      options
    );
  }

  check_log() {
    return localStorage.getItem("id") ? true : false;
  }
  //  #End region

  //#region Signup Api
  sign_up(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "sign_up", query, options);
  }
  //  #End region

  sign_upjira(data) {
    var key;
    var query = "";
    // for (key in data) { query += encodeURIComponent(key)+"="+encodeURIComponent(data[key])+"&"; }
   // let headers = new Headers({ "Content-Type": "application/json" });
   let headers = new Headers({
    "Content-Type": "application/json",
    "Token" : localStorage.getItem("jwt"),
    "username":localStorage.getItem('username')
  });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/save-portal-details ",
      data,
      options
    );
  }

  //#region Signup Api
  SendOTP(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    //return this.http.post(this.apiUrl + "send_otp", query, options); 
    return this.http.post(this.apiUrl + "send_otpUAT", query, options);
  }
  //  #End region

  //#region Signup Api
  SendEmailOTP(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "email_otp", query, options);
  }
  //  #End region

  //#region Signup Api
  verify_otp(data: any = {}, otp_txt_id) {
    var key;
    var query = "";
    data["txn_no"] = otp_txt_id;
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "verify_otp", query, options);
  }
  verify_otpCopy(data: any = {}, otp_txt_id) {
    var key;
    var query = "";
    data["txn_no"] = otp_txt_id;
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }

    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "verify_otp", query, options);
  }
  //  #End region
  //#region Forget Api
  forgetPassw(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "forget_password", query, options);
  }
  //  #End region

  // User profile getdata
  Usergetdata(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    //console.log(query);
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "profile_get", query, options);
  }
  // End region
  // Save User profile
  SaveUserdata(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    //console.log(query);
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "profile_set", query, options);
  }
  // End region

  // User Change Password
  ChangePassw(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
     
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "password", query, options);
  }
  // End region

  // User Check Password
  CheckPassw(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "chk_pass", query, options);
  }
  // End region

  // User get token mail verification
  verify_mail(json) {
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
    return this.http.post(this.apiUrl + "email_verify", query, options);
  }
  // End region

  //  Get application List
  applicationList(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "my_applications", query, options);
  }
  // End region

  //  Add New application
  add_newApplication(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt"),
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "get_application", query, options);
  }
  // End region

  saveAddAppl(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "save_application", query, options);
  }

  deleteApp(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "del_application", query, options);
  }

  Exists_Email(json) {
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
    return this.http.post(this.apiUrl + "check_email", query, options);
  }

  Exists_Username(json) {
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
    return this.http.post(this.apiUrl + "check_username", query, options);
  }

  // Get api-details of documentation page

  

  // Get error code of documentation page
  mis1(json){
    var query = '';
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + '=' + encodeURIComponent(json[key]) + '&';
    }
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      // "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://developer.icicibank.com/rest/createCSV' ,query, options);
  }
  // error_code() {
  error_code(json) {
    console.log(json);
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "load-error-codes", query, options);
    // "https://thingproxy.freeboard.io/fetch/"+
    // let headers = new Headers({
    //   "Content-Type": "application/x-www-form-urlencoded"
    // });
    // let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.apiUrl + "load-error-codes", {}, options);
  }

  // Get sample packet data

  Sample_packet(data) {
    // let options = {
    //   headers: new HttpHeaders().set(
    //     "Content-Type",
    //     "application/x-www-form-urlencoded"
    //   )
    // };
    // let body = new URLSearchParams();
    // body.set("id", data["id"]);
    // console.log(body.toString());
    var query = "";
    var key;
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
     return this.http.post(
    //  return this.HttpClient.post(
      this.apiUrl + "load-api-packet",
      //  body.toString(),
       query,
      options
    );
    // "https://thingproxy.freeboard.io/fetch/"+
  }

  //merchant-onboarding Strat
  Merchant_onboarding(formdata) {
    var key;
    let headers = new Headers({ "Content-Type": false });
    return this.http.post(
      "https://developerapi.icicibank.com:8443/api/v1/jira",
      formdata
    );
  }
  //Merchant-onboarding End
  getUATFromData(data) {
    var query = data;
    let headers = new Headers({
      "Content-Type": "application/json",
      "Token" : localStorage.getItem("jwt"),
      "username":localStorage.getItem('username')
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      //"https://developer.icicibank.com/ROOT_UAT/rest/getAdditionalParameters",
       "https://developer.icicibank.com/rest/getAdditionalParameters",
      query,
      options
    );
  }
  // Get All API Start
  // Get_All_API() {
  Get_All_API(json) {
    // var json = {};
    var key;
    var query = "";
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "get-api-data-resp", query, options);
    // return this.http.post(this.apiUrl + "get-api-data-resp", {}, options);
  }
  // Get All API Start

  domain_and_apis() {
    var json = {};
    var key;
    var query = "";
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "domain-and-apis", {}, options);
  }

  feedback(json) {
    var key;
    var query = "";
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/feedback",
      query,
      options
    );
  }
  feedbackClone(json) {
    var key;
    var query = "";
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/feedbackClone",
      query,
      options
    );
  }
  feedbackNew(json) {
    var key;
    var query = "";
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/feedbackNew",
      query,
      options
    );
  }

  // User Check Password
  resetPassw(json) {
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
    return this.http.post(this.apiUrl + "reset_password", query, options);
  }

  Onboardrequestsuser() {
    var query = "username=" + localStorage.getItem("username");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "fetch-jiraid-v2", query, options);
 // return this.http.post(this.UAT_apiUrl + "fetch-jiraid-v2", query, options);
  }


  JiraForAdmin() {
    var query = "username=" + localStorage.getItem("username");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "fetch-jiraId-for-admin", query, options);
 // return this.http.post(this.UAT_apiUrl + "fetch-jiraid-v2", query, options);
  }

  Onboardrequests() {
    var query = "username=" + localStorage.getItem("username");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "fetch-pending-jiraid", query, options);
  }

  approvals() {
    var query = "username=" + localStorage.getItem("username");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "fetch-jiraid-v2", query, options);
  }

  GetPendingReg() {
    var query = "username=" + localStorage.getItem("username");
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.apiUrl + "fetch-pending-userReg",
      query,
      options
    );
  }

  ApproveReg(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.apiUrl + "approve-pending-userReg",
      query,
      options
    );
  }

  Admin_access(username) {
    var query = "username=" + username;
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "has-admin-access", query, options);
  }
  Admin_accessNew(username) {
    var query = "username=" + username;
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "hasAdminAccess", query, options);
  }
  downloadCertificate(filePath) {
    var query = filePath;
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/" + "download",
      query,
       { responseType: ResponseContentType.Blob }
    );
  }
  
  customDownload(json) {
    var query = json;
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.apiUrl + "customDownload",
      query,
       { responseType: ResponseContentType.Blob }
    );
  }
  // downloadPdf(filePath) {
  //   var query = filePath;
  //   let headers = new Headers({
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   });

  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(
  //     "https://developer.icicibank.com/" + "rest/downloadFile",
  //     query
  //   );
  // }

  downloadPdf(filePath) {
    var query = filePath;
    let headers = new Headers({
      "Content-Type": "application/octet-stream",
      "Token" : localStorage.getItem("jwt")
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/" + "rest/downloadFile",
      query,
      { responseType: ResponseContentType.Blob }
    );
  }

  getCompanyName(companyName) {
    return this.http.get(
      "https://developer.icicibank.com/rest/GetCompanyDetails?Name=" +
        companyName
    );
  }

  //#region Signup Api
  appathon_sign_up(data) {
    var key;
    var query = "";
    for (key in data) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "sign_up_appathon", query, options);
  }
  //  #End region
  api_description(id) {
    return this.http.get(
      "https://developer.icicibank.com/rest/getMenuDescription?ID=" + id
    );
  }
  faq(){
    return this.http.get(
      'https://developer.icicibank.com/rest/getPortalFAQ'
    )
  }

  // Get getDocDetails of download page
 
getDocDetails(json) {
  //let json = {"docId":"6"}
  //UAT_apiUrl
  /*let query = "";
  if(json && json.docId){
    query = "docId="+json.docId;
  }
  
  return this.http.get(this.apiUrl +"getDocDetails?"+query);*/
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Token" : localStorage.getItem("jwt"),
    "username" :localStorage.getItem("username"),
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "getDocDetails", query, options);
}
 
// Get MIS   download 
 

getMisFile(json) {
  
 let query = "";
 if(json && json.userName && json.fileDate){
  query = "fileDate="+ json.fileDate;
  } 
 
 let headers = new Headers({
   "Content-Type": "application/x-www-form-urlencoded",
   
   "Token" : localStorage.getItem("jwt"),
   "username" :json.userName,
 });
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.apiUrl + "getMisFile", query, options);

}
downloadFromURL(url: string){
  return this.http.get(url, { responseType: ResponseContentType.Blob})
}
test_api(requestParam,apiName) {

  let requestPkt ={
    "apikey":"f219f506-1079-4c76-8ea6-439774f96265",
    "requestPacket":requestParam,
    "gatewayURL":apiName
  }
  console.log(JSON.stringify(requestPkt));
  let headers = new Headers({
    "Content-Type": 'application/json'
  });
  let options = new RequestOptions({ headers: headers });
  /*const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "apikey":"f219f506-1079-4c76-8ea6-439774f96265"
    })
  };  */
  
  //return this.HttpClient.post<any>(apiName , query, httpOptions);
  return this.http.post(apiName , requestParam, options);
}
test_apiXML(requestParam,apiName) {
  
  let headers = new Headers({
    "Content-Type": "text/xml"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(apiName , requestParam, options);
}


getTestCases(json) {
  
  let query = "";
  if(json && json.apiId){
   query = "apiId="+ json.apiId;
   } 
  
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Token" : localStorage.getItem("jwt"),
    "username" :localStorage.getItem("username"),
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "getTestCase", query, options);
  
 }

 getTransactionHistory() {
  let query = "";
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Token" : localStorage.getItem("jwt"),
    "username" :localStorage.getItem("username"),
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "getTxHistory", query, options);
  
 }

 createTransactionHistory(requestParam) {
  let query = "";
  let key;
  for (key in requestParam) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(requestParam[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Token" : localStorage.getItem("jwt"),
    "userName" :localStorage.getItem("username"),
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "createTxHistory", query, options);
}

sendToken(token){

/*   recaptcha: agweweewwwhw4hw4
  return this.http.post(this.apiUrl + "tokenValidate", {'g-recaptcha-reponse': token}) */
let json = {
  "recaptcha":token
};
  var key;
  var query = "";
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl +"tokenValidate", query, options);
}

readTable(tableName) {
  let apiName = "https://apigwuat.icicibank.com:8443/api/v0/merchantUser";
  let requestParam = {};
  if(tableName !== ""){
    requestParam = {
      "Table_Name":tableName
      };
  }else{
    requestParam = {
      "Table_Name":"MERCHANT_USER"
      };
  }
  
  console.log(JSON.stringify(tableName));
  let headers = new Headers({
    "Content-Type": 'application/json'
  });
  let options = new RequestOptions({ headers: headers });
 
  return this.http.post(apiName , requestParam, options);
}
dbAccess(requestParam) {
  let apiName = "https://developer.icicibank.com/ROOT_UAT/rest/tableOperation";
  
    requestParam = {
      "tableName":requestParam.tableName,
      "Operation":requestParam.Operation,
      "data":requestParam.data
      };
  
  
  console.log(JSON.stringify(requestParam));
  let headers = new Headers({
    "Content-Type": 'application/json'
  });
  let options = new RequestOptions({ headers: headers });
 
  return this.http.post(apiName , requestParam, options);
}
getRMId(requestParam) {
  

  let query = "";
  let key;
  for (key in requestParam) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(requestParam[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "getRmDetails", query, options);
}
getProductIssuesList() {
  

  let query = "";
  
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
   // "Token" : localStorage.getItem("jwt"),
    //"userName" :localStorage.getItem("username"),
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.UAT_apiUrl + "getProductIssues", query, options);
}
raiseSRRequest(json) {
  // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })   
  // let options = new RequestOptions({ headers: headers });
  // const issuePacket = new FormData();
  // var formData = 'issuePacket=' + JSON.stringify(json);
  // return this.http.post("https://developer.icicibank.com/rest/issueCreate", formData, options);

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

  // return this.http.post("https://developer.icicibank.com/ROOT_UAT/rest/issueCreate", formData, options);
  
  // return this.http.post("http://10.78.25.173:8080/rest/issueCreate", query, options);
   return this.http.post("https://developer.icicibank.com/rest/issueCreate", query, options);

 
}
 
issueCreateGateway(data,issueType) {
  var key;
  var query = "";
  query=encodeURIComponent("username") + "=" + encodeURIComponent(localStorage.getItem("username")) + "&" + 
  encodeURIComponent("issueType") + "=" + encodeURIComponent(issueType) + "&"  ;
    
  for (key in data) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
      
  }
  console.log(query)
     //data.append("username", localStorage.getItem("username"));
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
  let options = new RequestOptions({ headers: headers });
  //return this.http.post("http://10.78.25.173:8080/rest/issueCreateGateway", query, options);

  return this.http.post("https://developer.icicibank.com/rest/issueCreateGateway", query, options);

}
getProductIssueItem(header) { 
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    //  "userName" :localStorage.getItem('username'),
    //   "Token" : localStorage.getItem("jwt")
  });
  
  var query = "";
  
  let options = new RequestOptions({ headers: headers });
  //  console.log(options)
  
  // return this.http.post("https://developer.icicibank.com/ROOT_UAT/rest/getProductIssues",query,options);
  return this.http.post("https://developer.icicibank.com/rest/getProductIssues",query,options);
 
}

changePassw(json,salt) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Token" : localStorage.getItem("jwt"),
    "ChallengeId":salt
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(
    " https://developer.icicibank.com/rest/changePassword",
    query,
    options
  );  
}

  createJira(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/create-jira-new",
      json,
      options
    );  }

    api_details(json) {
      var query = "";
      var key;
      for (key in json) {
        query +=
          encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
      }
      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "Token" : localStorage.getItem("jwt")
      });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.apiUrl + "load-api-data", query, options);
      //return this.http.get(this.apiUrl+'load-api-data'+json);
      // "https://thingproxy.freeboard.io/fetch/"+
    }
   
    createTranscationHistory(body,header) {
      let headers = new Headers({
         "Content-Type": "application/x-www-form-urlencoded",
        "userName" :localStorage.getItem('username'),
         "Token" : localStorage.getItem("jwt")
      });
     
      // var body = new FormData();
      // var body = "apiId=" +  json.apiId;
      // body
      let options = new RequestOptions({ headers: headers });
      console.log(options)
      console.log(body)
    
      return this.http.post(this.UAT_apiUrl+"createTxHistory",body,options);
    }
   
    
  test_apiJSON(requestParam,apiName) {
    var query = "";
    var key;
    for (key in requestParam) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(requestParam[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiName , query, options);
  }
  getSalt() {
    var query = "";
    
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({ headers: headers,});
    return this.http.post(this.apiUrl+"svalue",query,options);
   // return this.http.post("https://developer.icicibank.com/ROOT_UAT/rest/svalue",query,options);
  }
  adminUpload(json) {
    var query = "";
    var key;
    for (key in json) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
    }
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Token" : localStorage.getItem("jwt")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "adminFileUpload", json, options);
    //return this.http.get(this.apiUrl+'load-api-data'+json);
    // "https://thingproxy.freeboard.io/fetch/"+ 'https://developer.icicibank.com/rest/adminFileUpload',
  }
  //8April2021 written by shikha
  getSrList() { 
    // let query = "";
    // let formData: FormData = new FormData(); 
    // console.log(localStorage.getItem("username"))
    // formData.append("username", localStorage.getItem("username"));
    var body = "username=" + localStorage.getItem("username");
  
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post("https://developer.icicibank.com/rest/getSrList", body,options);
 
}
getAnalytics(json) {
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
  return this.http.post(this.apiUrl + "getAnalytics", query, options);
}
getLatency(json) {
  var query = {};
  query["issuePacket"] = json;
  var inputParam = '';
  for (let key in query) {
    inputParam =
      encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(query[key])) + "&";
  } 
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
   //"Content-Type": "application/json"
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "latency ", inputParam, options);
}
getAnalyticsApp(json) {
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
  return this.http.post(this.apiUrl + "getAnalyticsApp", query, options);
}
// 11may2021 autodialer
autodialer(json) {
  var key;
  var query = "";
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl +"createAutodialer", query, options);
}
test_impsData(requestParam,apikey) {
  let json = {
    apiKey:apikey,
    issuePacket:JSON.stringify(requestParam)
  };
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
  return this.http.post(this.apiUrl + "compStatus", query, options);
}
logout(){
 
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
    return this.http.post(this.apiUrl + "logout", query, options);
  
}
/**
 * userInfo
 * username : MounikaValivarthi
Token : jyfjyfhjfjfjfjyfjyf

 */

getUserRoleData(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  //  "Token" : localStorage.getItem("jwt")
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "userInfo", query, options);
}
/**
 * 
 * @returns 
 */
getUserList() {
  var query = "";
 
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
   // "Token" : localStorage.getItem("jwt")
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "users", query, options);
 }
 /**
  * 
  * @param json username : MounikaValivarthi
role : admin
Token : jyfjyfhjfjfjfjyfjyf


  * @returns 
  */
updateUserRole(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  //  "Token" : localStorage.getItem("jwt")
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "updateRole", query, options);
 }
 EOTP(json) {
  var query = "";
  var key;
  for (key in json) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(json[key]) + "&";
  }
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  //  "Token" : localStorage.getItem("jwt")
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.apiUrl + "send_otpEmailEnc", query, options);
 }
 getProductProxyOld(productName) {
  const headerDict = {
    'Content-Type': 'application/json',
    'Authorization':'Basic YXBpYmFua2luZ0BpY2ljaWJhbmsuY29tOlF3ZXJ0eSMxMjM0'
  }
  
  const requestOptions = {                                                                                                                                                                                 
    headers: new Headers(headerDict), 
  };
  return this.http.get(
    "https://api.enterprise.apigee.com/v1/organizations/icici-prod/apiproducts/" +
    productName, requestOptions
  );
}
getProductProxy(json){
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

  return this.http.post(this.apiUrl + "getApiProducts", query, options);

}

approveDiyMerchantOnboardingReq(json){
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
  return this.http.post(this.apiUrl + "approveDiyJiraByReqId", query, options);
  //return this.http.post("https://developer.icicibank.com/ROOTDIY/rest/approveDiyJiraByReqId", query, options);
   
}

getDiyMerchantOnboardingReq(json){
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
  return this.http.post(this.apiUrl + "getDIYMerchantHeadRequests", query, options);
  //return this.http.post("https://developer.icicibank.com/ROOTDIY/rest/getDIYMerchantHeadRequests", query, options);
}
OnboardrequestsuserDiy() {
  var query = "username=" + localStorage.getItem("username");
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  //  "Token" : localStorage.getItem("jwt")
  });
  let options = new RequestOptions({ headers: headers });
//return this.http.post("https://developer.icicibank.com/ROOTDIY/rest/fetch-jiraid-v3", query, options);
 return this.http.post(this.apiUrl + "fetch-jiraid-v3", query, options);
}
isDIYRequestApprover(json) {
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
  //return this.http.post(this.apiUrl + "hasHeadAccess", query, options);
  return this.http.post("https://developer.icicibank.com/ROOTDIY/rest/hasHeadAccess", query, options);

}
getDrupalProduct() {
 
  let headers = new Headers({
    'Content-Type': 'application/json',
  //  'Authorization':'Basic c2FpbUBzaWRncy5jb206YWRtaW4=' //'Basic YXBpYmFua2luZ0BpY2ljaWJhbmsuY29tOlF3ZXJ0eSMxMjM0'
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.get(
    "http://34.93.3.223/icici-drupal/web/json/published-api-products" 
  );
}
}
