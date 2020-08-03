import { Injectable } from "@angular/core";
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  RequestMethod
} from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Config } from "../config/config";
import { Alert } from "selenium-webdriver";

import { Observable, fromEvent, merge, of, Subject, Subscription } from "rxjs";
import { timeout, catchError, map, mapTo } from "rxjs/operators";

@Injectable()
export class DashboardService {
  apiUrl: string;
  private user_id = new Subject<any>();
  private user_name = new Subject<any>();

  constructor(
    private http: Http,
    private config: Config,
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.apiUrl = config.apiUrl;
  }

  // getTreeData() {
  //   let headers = new Headers({
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get(
  //     "https://apigwuat.icicibank.com:8443/api/v0/GetTree?ID=0",
  //     options
  //   );
  // }
  getMenuTreeData() {
    return this.http.get(
      "https://developer.icicibank.com/rest/getMenuTree?ID=0"
    );
  }
  getTransactionhistory() {
    return this.http.get(
      "https://developer.icicibank.com/rest/"
    );
  }
}
