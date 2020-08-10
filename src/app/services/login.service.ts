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
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "login", query, options);
   // return this.http.post(this.UAT_apiUrl + "login", query, options);
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
   // return this.http.post(this.UAT_apiUrl + 'loginJWT', query, options);
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
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      "https://developer.icicibank.com/rest/doc/save-portal-details ",
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
    return this.http.post(this.apiUrl + "send_otp", query, options);
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
  //let json = {"userName":"Naresh","fileDate":"20-jan-2020"}
  //UAT_apiUrl
  /*let query = "";
  let headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  let options = new RequestOptions({ headers: headers });
  if(json && json.userName && json.fileDate){
    query = "userName="+json.userName +"&fileDate="+ json.fileDate;
  }
  return this.http.get(this.apiUrl +"getMisFile?"+query,{ responseType: ResponseContentType.Blob });
  */ 
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
 console.log("mis query is =="+ JSON.stringify(query));
 console.log("mis header is =="+ JSON.stringify(options));
 return this.http.post(this.apiUrl + "getMisFile", query, options);
 
}
downloadFromURL(url: string){
  return this.http.get(url, { responseType: ResponseContentType.Blob})
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
 
test_apiXML(requestParam,apiName) {

  
  var query = "";
  var key;
  for (key in requestParam) {
    query +=
      encodeURIComponent(key) + "=" + encodeURIComponent(requestParam[key]) + "&";
  }
  let headers = new Headers({

    "Content-Type": "application/xml"

  });

  let options = new RequestOptions({ headers: headers });

  return this.http.post(apiName , requestParam, options);

}

}
