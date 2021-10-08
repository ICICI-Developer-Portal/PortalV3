
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

declare var $: any;
@Component({
  selector: 'app-analytic-page',
  templateUrl: './analytic-page.component.html',
  styleUrls: ['./analytic-page.component.css'],
  providers: [DatePipe],
})
export class AnalyticPageComponent implements OnInit {

  tableData:any = [];
  responseData:any = [];
  dbApp:any =[];
  appName:any =[];
  productName:any=[];
  proxyProductName:any='';
  serviceName:any=[];
  responseCode:any =[];
  service_responseCode:any = [];
  AnalyticForm: FormGroup;
  sDate:any;
  eDate:any;
  analyticsTab:boolean = true;
  latencyTab:boolean = false;
  resetTab:boolean = false;
  latencyData:any;
  filterData:any;
  minDate:any;
  maxDate:any;
  respJson;
  selectServiceText:any;

  e_count_prcnt:any;
  s_count_prcnt:any;
  t_count:any;
  selected_service:any;
  s_count:any;
  e_count:any;

  constructor(
    private adm: LoginService,
    private formbuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService) {
     
      this.eDate= datepipe.transform(Date.now(),'MM/dd/yyyy%20HH:mm');
     var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  this.sDate= datepipe.transform(yesterday,'MM/dd/yyyy%20hh:mm');

   this.minDate= datepipe.transform(new Date("2020-01-01"),'yyyy-MM-ddTHH:mm');
   this.maxDate= datepipe.transform(new Date(),'yyyy-MM-ddTHH:mm');

    }
   
  ngOnInit() {
this.respJson = {
 
    "environments": [
      {
        "dimensions": [
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "666.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.423611E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3264.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "494.8138"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "494.8138138138138"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,MR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "125.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.2056327E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24351.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7296.48"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7296.48"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1638.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0015798612"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89693.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "24402.855"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "24402.8547008547"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1033 - PENDING Initiate status check."
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "730.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.040895E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "4190.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "427.71234"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "427.71232876712327"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,BR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1752.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0016898148"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45161.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "207.87956"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "207.87956621004565"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,query did not return a unique result: 2 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "150.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "150.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "150.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2745.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1908.5714"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1908.5714285714287"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,X6 - INVALID MERCHANT (ACQURIER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "476.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "281.8"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "281.8"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,U14 - Encryption error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.716049E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "209.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "101.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "8.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "101.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.787037E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1699.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "605.6667"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "605.6666666666666"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2691.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0025954861"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "74258.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "479.26904"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "479.2690449646971"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,B07 - Payee.Code invalid"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "32.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.0864197E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2835.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "987.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "987.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,B7 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "41.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.9544753E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2939.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "295.41464"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "295.4146341463415"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "31.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9899691E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "5812.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "649.64514"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "649.6451612903226"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "106.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.0223765E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90189.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "79700.234"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "106.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "79700.2358490566"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "153.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "153.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "153.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "132620.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.1279128"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "19776.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "14428.893"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "14428.892437038154"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U94 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5831.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0056240354"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "55830.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "244.00652"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "244.00651689247127"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "64339.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "48982.2"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "48982.2"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1948.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1848.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1848.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XG - FORMAT ERROR (INVALID FORMAT) (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2084.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.002010031"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10272.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "305.9549"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "305.9548944337812"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1109.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0010696374"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89814.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "47281.676"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "47281.67448151488"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3967.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.003826196"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "11847.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "453.78195"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "453.7819510965465"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "432.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.1666668E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "113784.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "24935.875"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "24935.875"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8125.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.007836613"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "117386.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "75522.086"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "8125.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "75522.08344615385"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "288.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.7777778E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "11990.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "524.809"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "524.8090277777778"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "57.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.4976852E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "9891.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3051.3684"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3051.3684210526317"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XM - EXPIRED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2152.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2025.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2025.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XL - EXPIRED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "64.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.1728395E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1598.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "281.46875"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "281.46875"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,F05 - RegDetails.Detail carddigits should be valid."
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "539.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.198688E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "17728.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1063.2263"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1063.226345083488"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XJ - REQUESTED FUNCTION NOT SUPPORTED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.8580247E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "635.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "314.25"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "314.25"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,U17 - Payee PSP not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "308.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "304.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "304.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "267.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.5752315E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "9531.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "790.18353"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "790.183520599251"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "44.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.243827E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86414.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "41961.887"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "41961.88636363636"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "78.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.523148E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2688.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "921.37177"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "921.3717948717949"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,XC - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2735.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1739.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1739.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XT - CUT-OFF IS IN PROCESS (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.8580247E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2436.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2395.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2395.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XC - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.787037E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "497.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "288.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "288.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "24979.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0240924"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89983.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "10329.94"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "10329.94014972577"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U86 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "674.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.500772E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89683.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "58632.867"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "58632.86646884273"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5844.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0056365742"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "20509.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "8981.883"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "8981.88295687885"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,Y1 - BENEFICIARY CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2357.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.002273341"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "200006.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25081.172"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "2357.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25081.171404327535"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "169.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.6300155E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2472.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "470.46155"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "470.46153846153845"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,MR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4204.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.004054784"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "15951.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "650.2445"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "650.244529019981"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1708.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "820.6"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "820.6"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "626.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.0378085E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "62597.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2989.9617"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2989.961661341853"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XS - RESTRICTED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "23.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.2183642E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "354.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "228.13043"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "228.1304347826087"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,G27 - Signature mismatch"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3538.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0034124227"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "34000.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "13806.848"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "13806.847654041832"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "81.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.8125E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85239.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "50613.816"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "50613.81481481482"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "317.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.0574846E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1269.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "231.52051"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "231.5205047318612"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U55 - Message integrity failed due to orgid mismatch"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "60.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.787037E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2553.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "697.5333"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "697.5333333333333"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U17 - PSP is not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "66.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.3657404E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1664.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "837.75757"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "837.7575757575758"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XW - TRANSACTION CANNOT BE COMPLETED. COMPLIANCE VIOLATION (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "66.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.3657404E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3021.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "605.4697"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "605.469696969697"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,ZD - VALIDATION ERROR"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1119.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0010792824"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24483.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4643.884"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4643.8838248436105"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,HS - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "438.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "274.85715"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "274.85714285714283"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "51.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.9189814E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120056.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "17613.98"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "51.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "17613.980392156864"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "350.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.3757716E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "5354.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "750.87714"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "750.8771428571429"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,ZH - INVALID VIRTUAL ADDRESS"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "375.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.616898E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120127.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "20900.045"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "375.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "20900.04533333333"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "995.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.596836E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90055.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "22802.695"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "22802.69447236181"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1571.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0015152392"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89092.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "20518.98"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "20518.98090388288"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.716049E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3150.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1385.75"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1385.75"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,ZX - INACTIVE OR DORMANT ACCOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2672.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0025771605"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "106628.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "29522.438"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "29522.437874251496"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "146.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "146.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "146.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "59923.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.057796102"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89909.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1171.1499"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1171.1498923618644"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8260.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.007966821"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87058.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1843.1649"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1843.1648910411623"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XT - CUT-OFF IS IN PROCESS (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "61507.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "40474.6"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "40474.6"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "9.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "8.680556E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1503.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "467.66666"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "467.6666666666667"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U10 - U10"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "950.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.1628084E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "72286.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "8566.957"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "8566.956842105263"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZD - VALIDATION ERROR"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "135.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.3020834E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1495.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "550.14075"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "550.1407407407407"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,XJ - REQUESTED FUNCTION NOT SUPPORTED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "265.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.5559415E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90063.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "36117.61"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "36117.60754716981"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "156.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5046296E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "6307.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "741.9872"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "741.9871794871794"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "486.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.6875E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "65914.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3473.0906"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3473.090534979424"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XE - INVALID AMOUNT (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "43.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.1473766E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85334.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "46077.79"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "46077.79069767442"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "111.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.0706019E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88973.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "55784.17"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "55784.17117117117"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "61.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.8834878E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120085.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "12575.36"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "61.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "12575.360655737704"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "214.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "214.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "214.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U55 - Message integrity failed due to orgid mismatch"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19065.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.01838831"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "76715.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "6496.07"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "6496.069813794912"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,HS - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "36.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.4722223E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3297.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "568.55554"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "568.5555555555555"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,Z6 - NUMBER OF PIN TRIES EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "314870.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.30369407"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120012.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "86872.6"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "314870.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "86872.6041477435"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "398.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.8387347E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3194.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "473.16833"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "473.1683417085427"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "60.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.787037E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "835.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "428.53333"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "428.53333333333336"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,UT - REMITTER/ISSUER UNAVAILABLE (TIMEOUT)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "172.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.6589506E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "16029.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2968.407"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2968.406976744186"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,IR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "117.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1284722E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89378.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "40338.727"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "40338.72649572649"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1646.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0015875772"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "21445.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "699.7351"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "699.7351154313487"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "98.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.45216E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86003.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "50748.152"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "50748.15306122449"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "282574.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.27254435"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89205.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "312.29297"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "312.29295688916886"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "752.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.2530867E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119676.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "72639.4"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "752.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "72639.40159574468"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "79.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.619599E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3514.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "437.07596"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "437.0759493670886"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,A09 - Payer.Ac.Detail.Value incorrect format for ACNUM"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "116.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1188271E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24037.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3569.4568"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3569.456896551724"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XK - REQUESTED FUNCTION NOT SUPPORTED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "939.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.056713E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "103570.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "33507.67"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "33507.671991480296"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4683.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0045167822"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "23640.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "191.54495"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "191.54494981849243"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "40.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.858025E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "7904.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1095.1"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1095.1"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "32.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.0864197E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24321.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1690.9062"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1690.90625"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,B1 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5971.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0057590664"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "78529.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "8159.602"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "8159.601909227935"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Y1 - BENEFICIARY CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "40.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.858025E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "20614.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2495.925"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2495.925"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.253858E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "8947.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3621.923"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3621.923076923077"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XO - NO CARD RECORD (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2106.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.00203125"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "78547.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4792.3896"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4792.389838556505"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "230.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.2183642E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81246.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "47619.645"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "47619.64347826087"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "521.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.025077E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120093.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "22356.32"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "521.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "22356.320537428022"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.0609568E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "39133.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "34125.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "34125.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "12309.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4262.9"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4262.9"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,96 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "9497.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.009159915"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "29579.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2553.1917"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2553.191534168685"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XU - CUT-OFF IS IN PROCESS (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3570.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.003443287"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "51794.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "549.2734"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "549.2733893557423"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,AM - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "37.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.5686728E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "971.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "562.0541"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "562.0540540540541"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XL - EXPIRED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "16.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5432099E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3835.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1150.75"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1150.75"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,BR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "91.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "8.777006E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120118.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "58190.77"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "91.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "58190.769230769234"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "194.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.871142E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "5160.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1812.33"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1812.3298969072166"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XC - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "53.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.1118826E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "16221.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7921.17"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7921.169811320755"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1199.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0011564429"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "40936.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25327.586"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25327.586321934945"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "310.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9899692E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120341.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "16575.367"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "310.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "16575.367741935483"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "650.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.26929E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45181.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "242.71077"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "242.71076923076924"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73082.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "38843.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "38843.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "762.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "314.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "314.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,30 - VA Account already mapped to some User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "75169.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.07250097"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119764.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "61604.227"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "75169.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "61604.226449733265"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "14.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.3503087E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "540.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "281.07144"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "281.07142857142856"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2710.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0026138118"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "43456.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1023.59485"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1023.5948339483394"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,B3 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "24.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.3148148E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1869.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "773.9583"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "773.9583333333334"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "29.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.7970678E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1500.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "798.5517"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "798.551724137931"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XL - EXPIRED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.253858E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1319.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "529.9231"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "529.9230769230769"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/Approve/Rejectpendingmandates,ZA - collect auth rejected"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3906.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0037673612"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "74882.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "872.91016"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "872.9101382488479"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,B2 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "67.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.462191E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120082.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "15771.537"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "67.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "15771.537313432837"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "23525.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.022690007"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "23873.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "20411.46"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "20411.460318809775"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "9.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "8.680556E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2249.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "811.2222"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "811.2222222222222"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,T04 - Txn.RefId alphanumeric; minlength 1 , maxlength 35"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2410.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0023244598"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "37892.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "405.03818"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "405.03817427385894"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U14 - Encryption error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "348.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.3564816E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24243.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2808.954"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2808.9540229885056"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZI - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "76.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.330247E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3179.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "217.73685"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "217.73684210526315"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "185.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.7843365E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87288.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "31803.443"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "31803.443243243244"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "219.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "149.2"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "149.2"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "963.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.2881947E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "68702.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7600.789"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7600.789200415368"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,UT - REMITTER/ISSUER UNAVAILABLE (TIMEOUT)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11973.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011548032"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "105141.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "61279.695"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "11973.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "61279.69414515994"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19134.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.01845486"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "72505.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "381.12177"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "381.121772760531"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U76 - NPCI REJECT"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82020.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "82020.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "82020.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "62344.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.060131174"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89959.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1332.7957"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1332.7957141023996"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1005 - Device binding already done"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "41878.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.04039159"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "58913.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "213.58336"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "213.583361192034"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,11 - invalid data"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "245574.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.23685764"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "46929.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "13182.209"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "13182.209146733774"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "25.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.4112655E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "5915.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "681.4"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "681.4"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.1219135E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "7672.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "843.86365"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "843.8636363636364"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,T02 - Txn.Id must be present, maxlength 35"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "184141.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.17760514"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82785.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "10131.4375"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "10131.43745282148"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "38998.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.037613813"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85049.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7563.4785"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7563.478665572594"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U89 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "16.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5432099E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3640.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "845.8125"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "845.8125"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1904.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0018364198"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "68492.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2178.7405"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2178.7405462184875"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XJ - REQUESTED FUNCTION NOT SUPPORTED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "32409.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.03125868"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "77773.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "971.66675"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "971.6667592335463"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,AJ - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "75712.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.07302469"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "80159.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "10098.181"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "10098.180499788672"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2316.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0022337963"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120122.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "15468.692"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "2316.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "15468.692573402417"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1791.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0017274305"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "22514.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "913.02234"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "913.0223338916807"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "443.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.2727625E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "28143.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1354.0452"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1354.0451467268624"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U53 - PSP Request Pay Debit Acknowledgement not received"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "132988.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.12826775"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119796.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "63463.645"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "132988.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "63463.64258429332"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8799.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.00848669"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89291.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2313.913"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2313.9130583020797"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1313.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0012663966"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89221.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "55739.04"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "55739.03731911653"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "65877.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.063538775"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "43671.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7441.858"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7441.857947386797"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8601.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008295718"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "39258.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "746.0874"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "746.0874316939891"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XP - TRANSACTION NOT PERMITTED TO CARDHOLDER (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "41256.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.039791666"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89382.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2854.6199"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2854.6199583090943"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U85 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1877.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.001810378"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45106.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "210.05647"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "210.05647309536494"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "55873.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "40016.668"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "40016.666666666664"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1980.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0019097222"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "70387.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "648.2899"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "648.289898989899"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,IR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120082.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "49252.4"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "49252.4"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1716.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0016550926"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "72879.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "410.99884"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "410.9988344988345"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1032 - Merchant do not accept payment from OD account"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "18040.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.017399691"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119515.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "63594.484"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "18040.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "63594.48442350332"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.0609568E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10694.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4623.1816"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4623.181818181818"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1008.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.7222225E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90010.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "53872.145"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "53872.142857142855"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "55.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.304784E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "84241.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "33001.727"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "33001.72727272727"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "21343.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5417.7144"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5417.714285714285"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,Y1 - BENEFICIARY CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "473.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "226.1"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "226.1"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.8325618E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10306.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "10148.315"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "10148.315789473685"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3313.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.003195409"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "67807.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "693.46906"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "693.46906127377"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,16 - record not found in va-acct mapping"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2143877.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.0677826"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89875.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "267.0508"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "267.0508004890206"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8702.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008393133"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "77460.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "286.57675"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "286.5767639623075"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,UB7 - Other Bank/PSP is not supported the Version"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "27375.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.026403356"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89328.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5053.6665"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5053.666557077626"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U88 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "617.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.951003E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89659.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "53974.375"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "53974.37439222042"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "753.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.2627317E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "68895.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "716.92035"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "716.9203187250996"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "139.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "139.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "139.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3080385.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9710503"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89464.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "216.43427"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "216.43426909298677"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,11 - invalid data"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "20.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290124E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45347.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5356.4"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5356.4"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,B3 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.1219135E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10210.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1473.2727"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1473.2727272727273"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,36 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "85.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "85.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8.5624012E7"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "82.584885"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "176473.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2840.1365"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2840.136437054596"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "320.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "226.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "226.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,A09 - Payee.Global address incorrect format for Account number and IFSC"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "303.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9224536E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "11481.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1580.6172"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1580.6171617161717"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,RM - Invalid MPIN ( Violation of policies while setting/changing MPIN )"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "172.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.6589506E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "7181.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "429.7907"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "429.7906976744186"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1830 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "428581.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.41336903"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90084.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1188.1725"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1188.1725414799068"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U29 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1855.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0017891589"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45243.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "305.3062"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "305.30619946091645"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,11 - invalid data"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1011.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.7511575E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "54070.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "420.76855"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "420.7685459940653"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U17 - PSP is not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "31.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9899691E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1892.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "678.871"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "678.8709677419355"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U14 - Encryption error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "618591.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.59663486"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89049.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "231.83472"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "231.83471631498034"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "595.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.7388115E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73177.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "529.2689"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "529.2689075630252"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U02 - Amount CAP is exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "126680.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.12218364"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88436.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "304.16812"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "304.1681165140512"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "86.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "8.294753E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "23105.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "11159.093"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "11159.093023255815"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "74.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.1373455E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10159.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "417.6081"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "417.6081081081081"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "21.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.0254629E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "541.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "350.38095"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "350.3809523809524"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,B1 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "28973.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.027944637"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "57170.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "237.20374"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "237.20374141442034"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "156.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5046296E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "13134.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2280.9424"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2280.9423076923076"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XT - CUT-OFF IS IN PROCESS (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "27.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.6041667E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "15869.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "15468.852"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "15468.851851851852"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "37586.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.03625193"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "77869.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "709.4809"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "709.4808971425531"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "171277.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.16519773"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119837.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "61776.215"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "171277.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "61776.21455887247"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2976.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0028703704"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "44608.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "511.29874"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "511.29872311827955"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "494.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "494.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "494.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XP - TRANSACTION NOT PERMITTED TO CARDHOLDER (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "25115.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.024223572"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86411.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "512.1992"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "512.199243479992"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,MR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6091.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.005874807"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81596.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "695.2428"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "695.242817271384"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U17 - Payer PSP not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "175.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.6878858E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "21413.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2624.3542"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2624.3542857142857"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U26 - PSP request credit pay acknowledgement is not received"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "26.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.507716E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1315.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "715.1539"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "715.1538461538462"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,ZG - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2807.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2807.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2807.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,ZY - INACTIVE OR DORMANT ACCOUNT (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "49123.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.047379438"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88754.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3154.1943"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3154.194409950532"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZY - INACTIVE OR DORMANT ACCOUNT (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "199647.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.19256076"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89802.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1073.6897"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1073.689687298081"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XN - NO CARD RECORD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1797.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0017332176"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "84668.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1541.335"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1541.3350027824151"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XD - INVALID AMOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1401.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0013512732"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "37871.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1600.4133"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1600.4132762312634"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XR - RESTRICTED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "144568.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.13943672"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89052.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4801.9233"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4801.9233717005145"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7957.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.007674576"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "71493.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5609.6772"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5609.677013949981"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "66368.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.06401235"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90400.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "16873.889"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "16873.889645612344"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "579.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.584491E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "12807.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "221.0829"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "221.08290155440415"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13804.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.013314043"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "19733.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5702.724"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5702.7242828165745"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10125.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.009765625"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "83829.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "532.79755"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "532.7975308641975"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U17 - Payee PSP not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "68151.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.06573206"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89463.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "6450.022"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "6450.021848542207"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "61.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.8834878E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1021.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "264.2131"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "264.21311475409834"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,A09 - Payee.Global address incorrect format for Account number"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "54.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.2083335E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "32608.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1291.6482"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1291.648148148148"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "30.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "30060.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2814.1333"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2814.133333333333"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XN - NO CARD RECORD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "55530.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.053559028"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86919.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "245.35161"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "245.35161174140106"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "101032.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.09744599"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82606.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1304.6941"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1304.6941464090585"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,SP - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.1219135E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1157.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "448.9091"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "448.90909090909093"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,B1 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "388.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.742284E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "28151.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "21337.357"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "21337.35824742268"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "166.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "145.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "145.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "31935.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.030801505"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88976.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25372.66"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25372.66103021763"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "185.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.7843365E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "6072.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1238.0757"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1238.0756756756757"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XF - FORMAT ERROR (INVALID FORMAT) (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11066.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.010673225"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82974.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25906.494"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25906.493312850173"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "86.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "8.294753E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88630.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "16188.128"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "16188.127906976744"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "873156.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.84216434"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120315.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1446.6503"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1446.6503144913395"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2661406.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.5669425"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89573.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "543.9158"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "543.9157832363795"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "157.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "157.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "157.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,Z7 - daily collect initiation count crossed"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "498739.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.48103684"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90108.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1814.439"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1814.4389971508144"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U30 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "12334.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011896219"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "116778.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "31038.28"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "31038.279957840117"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "982.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "803.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "803.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,ZG - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "400646.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.38642555"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89624.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1014.2697"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1014.269736874947"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,BR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8581.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008276427"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82160.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1072.3846"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1072.3846870994057"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U96 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "12493.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.012049575"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "65226.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "431.2735"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "431.2735131673737"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1003 - Channel mismatched"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.0609568E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3546.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "776.8182"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "776.8181818181819"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U61 - Payee Info differs from original request"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10421.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.010051119"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "70015.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "537.5095"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "537.5095480280204"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "34228.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.033013117"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86517.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "491.30704"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "491.30702933271004"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U96 - Payer and Payee IFSC/ACNUM can't be same"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "136.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.3117284E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "15335.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "956.69855"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "956.6985294117648"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,XI - ACCOUNT DOES NOT EXIST (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "289.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.7874229E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "118647.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "76585.06"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "289.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "76585.06228373702"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "14519.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "14024.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "14024.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,X7 - MERCHANT not reachable (ACQURIER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3329.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.003210841"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "41007.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "608.80176"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "608.8017422649444"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1231399.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1876919"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90531.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1468.2347"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1468.234744384233"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Z6 - NUMBER OF PIN TRIES EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "45.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.340278E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10506.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1265.0889"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1265.088888888889"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,RN - Registration is temporary blocked due to maximum no of attempts exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1523.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0014689428"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "116624.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "69323.06"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1523.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "69323.06565988182"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7220.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0069637345"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82347.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "566.8147"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "566.8146814404432"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,36 - Virtual address not present"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "325.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.134645E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "67136.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "430.02155"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "430.02153846153846"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "552.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.3240743E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "56780.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "15305.765"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "15305.764492753624"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,39 - duplicate seq no from channel"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "251874.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.24293403"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "83340.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5832.412"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5832.412015531575"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "798.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.6967594E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120121.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "17994.764"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "798.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "17994.763157894737"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.8580247E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "159.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "147.25"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "4.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "147.25"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "109952.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.10604938"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "84985.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "284.4715"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "284.47150574796274"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,1012 - Account data not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "20886.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "14753.857"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "14753.857142857143"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,IR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.35598099E8"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "130.7852"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "55316.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "682.5812"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "17970.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "682.5812033249817"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/callback2/google,,(not set)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7527.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.007259838"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81588.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2284.6208"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2284.6209645277004"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZM - INVALID MPIN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5972.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.005760031"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85165.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1448.7954"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1448.7953784326858"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,T13 - SUBTYPE MUST BE PRESENT."
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13399.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.012923419"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89000.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "773.8921"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "773.8920814986193"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U21 - Request authorisation is not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "12532.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.012087191"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119807.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "23186.648"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "23186.64770188318"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "42.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.0509258E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2164.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1303.738"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1303.7380952380952"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,XN - NO CARD RECORD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3062.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2905.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2905.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZG - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "21324.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.02056713"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "66812.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1830.5779"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1830.5779403489028"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,RM - Invalid MPIN ( Violation of policies while setting/changing MPIN )"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "142.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.3695988E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1667.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "214.44366"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "214.44366197183098"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "25.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.4112655E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "209.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "128.52"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "25.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "128.52"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,8010 - BACKEND_CONNECTION_TIMEOUT - Cannot connect to service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "507171.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.48916957"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89895.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "804.98285"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "804.9828637678416"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,B3 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1921379.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.853182"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90088.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "663.99457"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "663.9945903437062"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,Z6 - NUMBER OF PIN TRIES EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "49558.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.047799"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89227.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1127.8252"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1127.8251543645829"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1027 - Device binding record expired"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11802.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011383102"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88574.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3221.2878"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3221.2878325707507"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Z5 - INVALID BENEFICIARY CREDENTIALS"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "40503.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.039065395"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119950.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "63229.11"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "40503.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "63229.10749821001"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "24.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.3148148E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1686.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "609.4167"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "609.4166666666666"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,J02 - Payee.Addr must be valid VPA, maxlength 255"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "37474.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.036143903"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89329.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1265.5421"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1265.5421358808774"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZH - INVALID VIRTUAL ADDRESS"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "38147.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.036793016"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119865.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "62900.09"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "38147.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "62900.08994154193"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "51186.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.049369212"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "83097.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "340.44568"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "340.44568827413747"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U17 - PSP is not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3782.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0036477624"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "116652.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "29410.148"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "29410.147540983606"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1799850.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.7359664"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "100192.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25402.738"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25402.738397088648"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "679869.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.6557379"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88361.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1288.92"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1288.920103725865"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3930490.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.7909818"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89529.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "314.04034"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "314.0403428071309"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1030.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.934413E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3776.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "450.82816"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "450.82815533980585"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,5 - virtual address already exist"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "168.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.6203703E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90161.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "62961.97"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "168.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "62961.97023809524"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "81546.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.07865162"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81904.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "563.6452"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "563.645181860545"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,B1 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "18744.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.018078703"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89095.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "607.74744"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "607.7474391805378"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,9 - Transaction rejected"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4155.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.004007523"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90092.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "48984.895"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "48984.89482551143"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19303.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.018617863"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82829.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "991.3192"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "991.319224990934"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "40676.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.039232254"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "80689.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "226.60751"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "226.60750811289213"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,6 - Upi user already present"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1966.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0018962191"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "117638.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "65178.887"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1966.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "65178.887589013226"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "31.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.9899691E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120104.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "16396.678"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "31.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "16396.677419354837"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "45243.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.043637153"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86675.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25340.23"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25340.230488694382"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "306.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.951389E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "17706.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "179.53922"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "179.5392156862745"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,23 - Input Format Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "4226.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1856.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1856.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,B3 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "226778.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.21872878"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88560.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "862.058"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "862.0579906340121"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZR - INVALID / INCORRECT OTP"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3538.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3087.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3087.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XV - TRANSACTION CANNOT BE COMPLETED. COMPLIANCE VIOLATION (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "951.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.1724534E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "49119.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "393.88644"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "393.8864353312303"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZE -  payment from uod not allowed"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "12402.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011961806"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "80589.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3048.9084"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3048.908482502822"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XW - TRANSACTION CANNOT BE COMPLETED. COMPLIANCE VIOLATION (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "184.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.7746913E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "13640.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "316.82065"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "316.82065217391306"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "448.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.3209878E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "79722.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "23178.49"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "23178.491071428572"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7335.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0070746527"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "69739.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "865.56006"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "865.5600545330607"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1255.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0012104552"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87969.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1757.9697"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1757.9697211155378"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,YC - DO NOT HONOUR (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2658154.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.563806"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "93455.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1811.359"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1811.3590292360789"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZM - INVALID MPIN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "154.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.4853395E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1000.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "186.27272"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "186.27272727272728"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90100.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "90100.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "90100.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/Approve/Rejectpendingmandates,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "526367.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.50768423"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88663.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "287.1042"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "287.10418206308526"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1169.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0011275078"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "76435.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "308.7596"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "308.759623609923"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "118.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1381173E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "9050.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "362.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "362.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,U17 - Payer PSP not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3978174.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.8369734"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90055.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1001.7353"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1001.73527326859"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "14633.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.014113619"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82618.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "757.44415"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "757.4441331237614"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,Z6 - NUMBER OF PIN TRIES EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.7515434E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "10248.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2303.1428"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2303.1428571428573"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,ZE - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "101.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.7415126E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85841.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "30305.455"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "30305.455445544554"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22792.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.021983026"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90044.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "904.90967"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "904.9096612846613"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,1010 - VPA already mapped to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3178.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0030652005"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "38674.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "887.4371"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "887.4370673379484"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,B1 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "17809.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.01717689"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "45988.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "10308.348"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "10308.348082430231"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.253858E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "411.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "154.61539"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "154.6153846153846"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,32 - Seq No should be 35 digit len"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.3535157E7"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "13.054743"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90086.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "487.7399"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "487.73990866895747"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7212280.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.956289"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "121248.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "290.19916"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "290.1991467330719"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1004 - No record found for device binding"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5200.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.005015432"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90080.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "51435.12"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "51435.11923076923"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,99 - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1370.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0013213735"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "25547.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "8620.819"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "8620.819708029197"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "23569.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.022732446"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "55291.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4409.3345"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4409.334549620264"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "419709.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.40481192"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90086.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "296.3219"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "296.3218992206505"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1001 - Mobile No mismatched"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.1374904E7"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "10.971165"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90096.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "455.69476"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "455.694749072168"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8825.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008511767"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89642.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "482.20816"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "482.20815864022666"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,B03 - Payee.Addr must be valid VPA, maxlength 255"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2879.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0027768132"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "27546.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1160.3751"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1160.3751302535602"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U03 - Net debit CAP is exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "123418.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.11903742"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89693.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1323.9126"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1323.91263835097"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "56167.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.054173417"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89012.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "476.62692"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "476.62691616073494"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2161.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0020842978"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "14141.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "810.0125"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "810.0124942156409"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,14 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5154.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0049710646"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "28114.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4741.981"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4741.98098564222"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1173253.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1316098"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "103519.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1068.901"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1068.9009804364446"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U16 - Risk threshold exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "24602.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.02372878"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88089.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1021.53815"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1021.5381269815463"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZS - OTP EXPIRED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "70363.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.06786555"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "78632.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "221.11679"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "221.1167943379333"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "20.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290124E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "813.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "208.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "208.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,22 - Expiry date failed"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3257.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3257.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3257.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZD - VALIDATION ERROR"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "27784.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.02679784"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90023.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "7912.3145"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "7912.314461560611"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "701244.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.67635417"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90068.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1041.0842"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1041.0841818254416"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GetToken,40 - Key token not received"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1626714.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5689757"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89859.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "493.15723"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "493.1572169416382"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,36 - Virtual address not present"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "4518.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.004357639"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "68393.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "345.4566"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "345.4566179725542"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "121852.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.11752701"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88108.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "258.04324"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "258.04323277418507"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,11 - invalid data"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "685.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.6068675E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "27888.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "541.6029"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "541.6029197080292"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,12 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11395.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.010990548"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85226.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "677.9439"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "677.9439227731461"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZE - TRANSACTION NOT PERMITTED TO VPA by the PSP"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "359.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.4625773E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2833.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "643.6323"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "643.6323119777159"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XN - NO CARD RECORD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "9774.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.009427084"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "83626.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "754.42554"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "754.4255166768979"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XP - TRANSACTION NOT PERMITTED TO CARDHOLDER (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2493.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.002404514"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "78089.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5088.204"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5088.204171680706"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "35918.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.034643132"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89988.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1646.1368"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1646.1368116264825"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XV - TRANSACTION CANNOT BE COMPLETED. COMPLIANCE VIOLATION (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "193.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.8614969E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "3509.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "644.50775"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "644.5077720207254"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,YC - DO NOT HONOUR (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2837.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.002736304"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "67299.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1039.882"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1039.8819175185054"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZX - INACTIVE OR DORMANT ACCOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "45851.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.044223573"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87260.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "265.24915"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "265.24913306143816"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.8935185E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2175.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1756.6666"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1756.6666666666667"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,YB - LOST OR STOLEN CARD (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "15.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.4467592E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "22307.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "21328.133"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "21328.133333333335"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,X7 - MERCHANT not reachable (ACQURIER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "29944.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.028881174"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89164.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "598.0983"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "598.0983502538071"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,ZA - collect auth rejected"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "135813.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.13099247"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89092.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "272.95526"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "272.95524728855116"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "29.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.7970678E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1877.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "737.86206"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "737.8620689655172"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,UX - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "221990.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.21411073"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87244.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "234.06235"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "234.06234064597504"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1879388.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.8126813"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90071.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "827.6405"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "827.6405101022248"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "38539.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.037171103"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90043.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2492.4734"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2492.4733127481254"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,ZX - INACTIVE OR DORMANT ACCOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "60336.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.058194444"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89078.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3500.1177"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3500.1177903739062"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XQ - TRANSACTION NOT PERMITTED TO CARDHOLDER (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1133.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0010927855"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "21567.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4992.88"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4992.8799646954985"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "428.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "324.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "324.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U77 - Blocked Merchant"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "75799.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.073108606"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87541.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "534.82776"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "534.8277813691474"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,ZT - OTP TRANSACTION LIMIT EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "42374.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.040869985"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82949.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1030.8525"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1030.8525038938972"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,RN - Registration is temporary blocked due to maximum no of attempts exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "15.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.4467592E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "900.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "519.73334"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "519.7333333333333"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,BR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "355.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.423997E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "19030.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "12234.735"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "12234.735211267605"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.9290123E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "154.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "147.5"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "147.5"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,23 - Input Format Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "32.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.0864197E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86333.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "57931.78"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "57931.78125"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1945905.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.8768374"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "116136.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2244.2456"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2244.245496054535"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Z9 - INSUFFICIENT FUNDS IN CUSTOMER (REMITTER) ACCOUNT"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "21224.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.020470679"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "57978.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1180.5781"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1180.578166226913"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XL - EXPIRED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22204.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.021415895"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89753.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "577.1299"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "577.1298865069357"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectRequest,92 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "22775.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.021966629"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73733.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3266.7222"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3266.7222392974754"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XB - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.7560254E7"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "55.51722"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120831.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "901.60205"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "901.6020645774079"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "73.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.040895E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120086.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "18195.027"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "73.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "18195.027397260274"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "39.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.761574E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120070.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "37274.51"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "39.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "37274.51282051282"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13207.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.012738233"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "80247.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "997.0975"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "997.0974483228591"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,ZM - INVALID MPIN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "196198.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.18923418"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88836.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "25069.223"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "25069.222168421697"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "18382.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.017729552"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88900.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2445.3616"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2445.361603742792"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,YD - DO NOT HONOUR (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3825.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.003689236"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "112513.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "26885.38"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "26885.38065359477"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,101 - Transaction Processing Timeout"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "13994.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0134972995"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73955.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "611.9109"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "611.9108903815921"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XN - NO CARD RECORD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19313.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.018627508"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73338.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "830.0966"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "830.0966188577642"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,ZT - OTP TRANSACTION LIMIT EXCEEDED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "33328.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.03214506"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89928.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "951.52045"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "951.5204332693231"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U78 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "134432.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.12966049"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88816.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "279.7079"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "279.7078820518924"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ReclaimVPA,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2030579.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.958506"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "92754.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "537.042"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "537.0420195422093"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,92 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "107424.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.10361111"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89930.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3907.593"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3907.593126303247"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XP - TRANSACTION NOT PERMITTED TO CARDHOLDER (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1540.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0014853395"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "7794.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "528.8565"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "528.8564935064935"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,XJ - REQUESTED FUNCTION NOT SUPPORTED"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "184030.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.17749807"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90045.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1341.2554"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1341.255431179699"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U66 - Device Fingerprint mismatch"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2739933.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.6426823"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89854.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "242.04445"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "242.04445145191505"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeviceBinding,1002 - SMS Verification data mismatched"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11689.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011274112"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89241.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2218.7659"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2218.765762682864"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,B3 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "30741.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.029649884"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81540.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2875.5896"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2875.5896034611756"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,IR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "14334.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.013825231"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "85238.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5119.885"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5119.884610018139"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XC - INVALID TRANSACTION OR IF MEMBER IS NOT ABLE TO FIND ANY APPROPRIATE RESPONSE CODE (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1569.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0015133102"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "80647.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "519.3926"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "519.3926067558955"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "774297.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.74681425"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90073.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1515.6522"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1515.652256175602"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Z8 - PER TRANSACTION LIMIT EXCEEDED AS SET BY REMITTING MEMBER"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "26403.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.025465857"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "47274.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "229.20517"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "229.20516607961216"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,38 - Mobile number and profile Id doesn't belong to same User"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "415.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.0027007E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88169.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "769.08673"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "769.0867469879518"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/Approve/Rejectpendingmandates,92 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7997.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.007713156"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "86013.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "819.2321"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "819.2320870326372"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,RM - Invalid MPIN ( Violation of policies while setting/changing MPIN )"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5529.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0053327545"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "68916.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "780.4093"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "780.4092964369687"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,RN - Registration is temporary blocked due to maximum no of attempts exceeded"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "35.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.3757715E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "120065.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "27077.314"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "35.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "27077.314285714285"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,8009 - Internal Server Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7242.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.006984954"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "119376.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "61585.215"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "7242.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "61585.21402927368"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/DeregisterProfile,8013 - BACKEND_READ_TIMEOUT - Cannot read from service"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "730.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.040895E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "116414.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "22098.254"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "22098.254794520548"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListKeys,5 - UPI Server Internal Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "19.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.8325618E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "381.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "161.78947"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "161.78947368421052"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,36 - Virtual address not present"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1173438.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.1317883"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "98149.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "30084.56"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "30084.561487696836"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,91 - Transaction initiated"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "62382.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.060167823"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89843.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1726.5095"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1726.509473886698"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,YE - REMITTING ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "3203152.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.08946"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90093.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "894.06946"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "894.0694562730711"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,ZM - INVALID MPIN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1342.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0012943672"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "51617.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1532.5872"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1532.5871833084948"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,IR - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6591.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0063570603"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24116.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4129.8433"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4129.843271127294"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "260.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "2.507716E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "1122.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "306.8231"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "306.82307692307694"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,U28 - PSP not available"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "36.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.4722223E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2481.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1408.1389"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1408.138888888889"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,YA - LOST OR STOLEN CARD (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "15997.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.015429205"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "38689.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1211.4052"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1211.4052009751829"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,XR - RESTRICTED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "21551.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.020786073"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82631.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "646.4122"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "646.4121850494176"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U17 - PSP is not registered"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "2065.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0019917053"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "24503.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2229.739"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2229.7389830508473"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,HS - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-7"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "142.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "142.0"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "142.0"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,U01 - The request is duplicate"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1958.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0018885031"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87415.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "513.10315"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "513.1031664964249"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,36 - Virtual address not present"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "14077.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.013577353"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89628.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2327.1316"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2327.1316331604744"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,YF - BENEFICIARY ACCOUNT BLOCKED/FROZEN"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "338.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.260031E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "19641.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "4357.8257"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "4357.825443786982"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,XY - REMITTER CBS OFFLINE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11601.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011189236"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89013.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1002.7543"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1002.754245323679"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/StoreAccountDetails,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "779.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "7.513503E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "18685.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2204.8447"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2204.844672657253"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,9999 - Technical error, Please contact admin"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "193335.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.1864728"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90077.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1623.806"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1623.8060464995992"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,Z7 - TRANSACTION FREQUENCY LIMIT EXCEEDED AS SET BY REMITTING MEMBER"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "592.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.7098764E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "6337.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "259.94595"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "259.94594594594594"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CollectAuth,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "16.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.5432099E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "6142.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "514.625"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "514.625"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "5.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "4.822531E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "694.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "372.4"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "372.4"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,U55 - Message integrity failed due to orgid mismatch"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7963.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0076803626"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "81074.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "465.8189"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "465.81891247017455"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1030 - OD transaction not permitted to VPA"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "7104.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.006851852"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "39250.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1762.3274"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1762.3274211711712"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,ZX - INACTIVE OR DORMANT ACCOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "10.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "9.645062E-6"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "176.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "119.9"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "119.9"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,23 - Input Format Error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "14370.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.013859954"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "72749.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "9026.057"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "9026.056784968685"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/GenerateOTP,91 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1854.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0017881944"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "73185.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1661.4342"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1661.4341963322545"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U54 - Transaction Id or Amount in credential block does not match with that in ReqPay"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "71.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "6.847994E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87610.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "41179.016"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "41179.01408450704"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "476442.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.45953125"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88823.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "252.71065"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "252.71064053966694"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,1006 - Active device binding record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "385361.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.37168306"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "99257.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "17615.793"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "17615.792355739162"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U90 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "8894.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008578318"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "36325.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "402.06476"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "402.06476276141217"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U93 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "18196.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.017550154"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89920.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "871.05396"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "871.053967905034"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,0 - Transaction Successful"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "108507.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.10465567"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "95954.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3268.5957"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3268.595666639019"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,XI - ACCOUNT DOES NOT EXIST (BENEFICIARY)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "116251.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.11212481"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "87186.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "713.6824"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "713.6823683237134"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,AM - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "77480.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.07472994"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90652.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3160.381"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3160.3811693340217"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U31 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "9206.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.008879243"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "83882.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "751.63684"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "751.6368672604823"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XR - RESTRICTED CARD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "38.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "3.6651236E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "4192.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "720.5526"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "720.5526315789474"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,K1 - SUSPECTED FRAUD"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "11716.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.011300154"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89860.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "2608.2817"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "2608.281666097644"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "162784.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.15700617"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90022.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "9315.237"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "9315.237191615885"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U18 - Request authorisation acknowledgement is not received"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6717.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.006478588"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "20766.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "3707.5176"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "3707.517641804377"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,U80 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "15.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.4467592E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "31291.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5123.8"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5123.8"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ChangeMPIN,HS - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "97576.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.09411266"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89110.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "482.39368"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "482.39367262441584"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,1008 - Invalid device Id"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "592201.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.57118154"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "88003.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "6101.4766"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "6101.476758735632"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,U13 - External error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "578.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.5748457E-4"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "7033.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "325.6436"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "325.64359861591697"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/RegisterMobileNumber,U14 - Encryption error"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "475427.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.45855227"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "89690.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "5534.0513"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "5534.051227633265"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/BalanceEnquiry,96 - FAILURE"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "53.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "5.1118826E-5"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "2446.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "224.60378"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "224.60377358490567"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/Approve/Rejectpendingmandates,pending.mandate.not.found - Cannot process now"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "62657.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.060433064"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "82867.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "873.7511"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "873.7511052236781"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ValidateAddress,ZH - INVALID VIRTUAL ADDRESS"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "738128.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.711929"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90083.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "720.2783"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "720.2782972600958"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/TransactionStatus,15 - original record not found"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "112295.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.108309224"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90132.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "18399.018"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "18399.018121911038"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/CommonPayRequest,U09 - ReqAuth Time out for PAY"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "1799614.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "1.7357388"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "90120.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "821.3342"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "821.3341988893173"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,XH - ACCOUNT DOES NOT EXIST (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6382.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0061554783"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "63559.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "1065.1503"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "1065.1502663741774"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,ZX - INACTIVE OR DORMANT ACCOUNT (REMITTER)"
          },
          {
            "metrics": [
              {
                "name": "sum(message_count)",
                "values": [
                  "6118.0"
                ]
              },
              {
                "name": "tps",
                "values": [
                  "0.0059008487"
                ]
              },
              {
                "name": "max(total_response_time)",
                "values": [
                  "62258.0"
                ]
              },
              {
                "name": "avg(total_response_time)",
                "values": [
                  "608.9204"
                ]
              },
              {
                "name": "sum(is_error)",
                "values": [
                  "0.0"
                ]
              },
              {
                "name": "global-avg-total_response_time",
                "values": [
                  "608.9203988231449"
                ]
              }
            ],
            "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,AJ - FAILURE"
          }
        ],
        "name": "prod"
      }
    ],
    "metaData": {
      "errors": [],
      "notices": [
        "Source:Big Query",
        "Metric with Avg of total_response_time was requested. For this a global avg was also computed with name global-avg-total_response_time",
        "query served by:960aa7a9-89a9-44a4-ae86-717b69899265",
        "Table used: uap-asia-northeast1-1.edge.edge_api_raxgroup119_fact"
      ]
    }

}
      this.AnalyticForm = new FormGroup({
        'basicDetailsSection': new FormGroup({
          "startDate":new FormControl(),
          "endDate":new FormControl(),
          "AppName":new FormControl(),
          "product":new FormControl(),
          "service":new FormControl(),
          "responseCode":new FormControl()
        })
      });

     // this.AnalyticForm.controls.get.setValue("All");
   //  this.AnalyticForm.controls.product.setValue("All");
    //  this.AnalyticForm.controls.service.setValue("All");

//service call
//let analyticArray = this.respJson.environments[0].dimensions;
//this.getFilterData(analyticArray);
//this.getTableData(analyticArray);
this.getAnalyticsApp();
  
 
//end
  }
  
  
  /* getFilterData */

  getFilterData(resp){
    this.spinnerService.show();
    let filterData = {};
    for(let i in resp){
      let tempArr = [];
      tempArr = resp[i].name.split(',');
      let app = tempArr[0]; 
      let prod = tempArr[1]; 
      let serviceUrl = tempArr[2];
      let serviceName = tempArr[3];
      let servicePath = serviceUrl+serviceName;
      
      if(serviceName == ''){
        serviceName = serviceUrl;
      }
     

      if(app in filterData){
        if(prod in filterData[app]){
          filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
        }else{
          filterData[app][prod] =[];
          filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
        }

      }else{
        filterData[app] = {};
        filterData[app][prod] =[];
        filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
      }
      
    } 
    this.spinnerService.hide();
    this.filterData = filterData;
    //update app name dropdown
   //  this.appName = [];
    for(let app in filterData ){
      this.appName.push(app);
    }
    
    console.log(filterData);

  }

  getAnalyticsData($event){
    this.latencyTab= false;
    this.analyticsTab= true;

    this.t_count = 0;
    this.e_count_prcnt = 0;
    this.s_count_prcnt = 0 ;
    this.selected_service = "";
    
    let startDate =  this.AnalyticForm.value.basicDetailsSection.startDate;
    let endDate =  this.AnalyticForm.value.basicDetailsSection.endDate;
    let app = this.AnalyticForm.value.basicDetailsSection.AppName;
    let srvc =  this.AnalyticForm.value.basicDetailsSection.service;
    let prod =  this.AnalyticForm.value.basicDetailsSection.product;
    if(startDate == null || startDate == undefined || startDate  ==''){
      alert("Please select start date");
      return false;
   }else if(endDate == null || endDate == undefined || endDate  ==''){
    alert("Please select end date");
    return false;
   }
   else if(app == null || app == undefined || app  =='' ||
   srvc == null || srvc == undefined || srvc  =='' ||
   prod == null || prod == undefined || prod  =='' ){
    alert("Please select all mandatory field");
    return false;
   }
   app=app.replace(" ","%20");
   // this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
    let json = {
      select :"sum(message_count),tps,sum(is_error),avg(total_response_time),max(total_response_time)",
      startTimeRange :this.datepipe.transform(new Date(startDate),'MM/dd/yyyy%20HH:mm'),
      endTimeRange :this.datepipe.transform(new Date(endDate),'MM/dd/yyyy%20HH:mm'),
     // filter :"(developer_email%20eq%20%22"+localStorage.getItem("email")+"%22)",
      filter:"(developer_app%20eq%20%22"+app+"%22)",
      tzo :"330"
    };
    //empty the table array
    this.tableData = [];
    this.responseData = [];
    //service call
//let analyticArray = this.respJson.environments[0].dimensions;
//this.getTableData(analyticArray);
this.spinnerService.show();
    this.adm.getAnalytics(json).subscribe((data: any) => {
      this.spinnerService.hide();
      console.log(data);
      var response = JSON.parse(data._body);
       
        if(response.success == true || response.success == 'true'  ){
        let resp =response.message.environments[0].dimensions;
        if(resp && resp.length>0){
        this.getTableData(resp);
        }else{
          alert("No Data available.");
        }
        
      }
    
     
    },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
      });

  }
  getLatencyData($event){
    //set tab activation 
    this.analyticsTab= false;
    this.latencyTab= true;

    let startDate =  this.AnalyticForm.value.basicDetailsSection.startDate;
    let endDate =  this.AnalyticForm.value.basicDetailsSection.endDate;
    let app = this.AnalyticForm.value.basicDetailsSection.AppName;
    let prod =  this.proxyProductName;
    let srvc =  this.selectServiceText;
   // this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
   if(startDate == null || startDate == undefined || startDate  ==''){
      alert("Please select start date");
      return false;
   }else if(endDate == null || endDate == undefined || endDate  ==''){
    alert("Please select end date");
    return false;
   }else if(app == null || app == undefined || app  =='' || app == "All"){
    alert("Please select app name");
    return false;
  }else if(srvc == null || srvc == undefined || srvc  =='' || srvc == "All"){
    alert("Please select service name");
    return false;
  }
   
    let json = {
      "developerApp":app ,
      "proxy": "",
      "startTime": this.datepipe.transform(new Date(startDate),'dd/MM/yyyy HH:mm:ss'),
      "endTime": this.datepipe.transform(new Date(endDate),'dd/MM/yyyy HH:mm:ss'),
      "requestUrl":srvc,
      "environment": "prod"
    };
    let resGb=     {
      "p99": 865,
      "p95": 865,
      "p90": 731,
      "p50": 673
  }; 
 // this.latencyData = resGb;
 this.spinnerService.show();
    this.adm.getLatency(json).subscribe((data: any) => {
      console.log(data);
      var response = JSON.parse(data._body);
      this.spinnerService.hide();
        if(response.success == true || response.success == 'true'  ){
        let resp =response.message;
        if(resp){
          //this.getTableData(resp);
     
    
          this.latencyData = resp;

        }else{
          alert("No Data available.");
        }
        
      }
    
     
    },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
      });
  }
  getTableData(resp){
    //let analyticArray = respJson.environments[0].dimensions;
    let analyticArray = resp
    //let tableData = [];
   
    for(let i in analyticArray){
      console.log(analyticArray[i]);
      let tempObj = {};
      let tempArr = [];
  
      tempArr = analyticArray[i].name.split(',');
      tempObj['appName'] = tempArr[0];
      tempObj['product'] = tempArr[1];
      tempObj['serviceBaseUrl'] = tempArr[2];
      tempObj['serviceName'] = tempArr[3];
      if(tempArr[3] == ''){
        tempObj['serviceName'] = tempArr[2];
      }
      tempObj['responseCode'] = tempArr[4];
      
    
      
      for(let j in analyticArray[i].metrics){
        if(analyticArray[i].metrics[j].name== "avg(total_response_time)"){
          tempObj["avg_total_response_time"]=parseFloat(analyticArray[i].metrics[j].values[0]).toFixed(2);
        }else if(analyticArray[i].metrics[j].name == "max(total_response_time)"){
          tempObj["max_total_response_time"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "sum(is_error)"){
          tempObj["sum_is_error"]=Math.trunc(analyticArray[i].metrics[j].values[0]);
        }else if(analyticArray[i].metrics[j].name == "sum(message_count)"){
          tempObj["sum_message_count"]=Math.trunc(analyticArray[i].metrics[j].values[0]);
        }else if(analyticArray[i].metrics[j].name == "tps"){
          tempObj["tps"]=parseFloat(analyticArray[i].metrics[j].values[0]).toFixed(2);
        }else {
        tempObj[analyticArray[i].metrics[j].name] = analyticArray[i].metrics[j].values[0];
       }
    }

      this.responseData.push(tempObj);
     
    }
      //Apply selected filter here
      /* Service wise total count   */

        
      let sApp = this.AnalyticForm.value.basicDetailsSection.AppName;
      let sProduct = this.AnalyticForm.value.basicDetailsSection.product;
      let sService = this.AnalyticForm.value.basicDetailsSection.service;
      let sResponseCode = this.AnalyticForm.value.basicDetailsSection.responseCode;
      if(sApp !== null && sApp !== '' && sApp !== 'All'){
        this.tableData = this.responseData.filter(
          item => item.appName === sApp); 
      }
      if(sProduct !== null && sProduct !== '' && sProduct !== 'All'){
        
      let id= sProduct.split("&");
        this.tableData = this.tableData.filter(
          item => item.product === id[1]); 
      }
      if(sService !== null && sService !== '' && sService !== 'All'){
        this.tableData = this.tableData.filter(
          item => item.serviceName === sService);
          let tempArr = this.tableData;
          this.tableData=tempArr.sort(function (a, b) {
            return a.responseCode.localeCompare(b.responseCode);
        });

        /* Average count block */
        let t_count =0, e_count = 0,s_count = 0,e_count_prcnt,s_count_prcnt;
        for(let i in this.tableData){
          t_count = t_count + this.tableData[i].sum_message_count;
          e_count = e_count + this.tableData[i].sum_is_error;
          s_count = s_count + (this.tableData[i].sum_message_count - this.tableData[i].sum_is_error);
        }
        e_count_prcnt = ((e_count * 100)/t_count).toFixed(2);
        s_count_prcnt = ((s_count * 100)/t_count).toFixed(2);

        this.t_count = t_count;
        this.s_count = s_count;
        this.e_count = e_count;
        this.e_count_prcnt = e_count_prcnt;
        this.s_count_prcnt = s_count_prcnt ;
        this.selected_service = sService;
      //responseCode
      if(sResponseCode !== null && sResponseCode !== '' && sResponseCode !== 'All'){
        this.tableData = this.tableData.filter(
          item => item.responseCode === sResponseCode);

        }
        
      }else{
        let tempArr = this.tableData;
        this.tableData=tempArr.sort(function (a, b) {
        return a.serviceName.localeCompare(b.serviceName);
        });
      
      }
      
          
  }

  getAnalyticsApp(){
    let json = {
      email:localStorage.getItem("email")
    }
    this.spinnerService.show();
    this.adm.getAnalyticsApp(json).subscribe((data: any) => {
      this.spinnerService.hide();
      console.log(data);
      var response = JSON.parse(data._body);
      console.log(response);
      if(response && response.apps){
        this.dbApp = response.apps;
      
        /* let tempArr = [];
        tempArr = [...response.apps, ...this.appName];
        const distinct = (v,i,s) => {
          return s.indexOf(v) === i;
        }

        this.appName = tempArr.filter(distinct); */
      }
      this.getApigeeApp();
    },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
      });
  }
  getApigeeApp(){
    let json = {
      select :"sum(message_count),tps,sum(is_error),avg(total_response_time),max(total_response_time)",
    // startTimeRange :this.sDate,//
      startTimeRange :"01/01/2020%2000:30",
      endTimeRange :this.eDate,
      filter :"(developer_email%20eq%20%22"+localStorage.getItem("email")+"%22)",
      tzo :"330"
    };
      this.spinnerService.show();
      this.adm.getAnalytics(json).subscribe((data: any) => {
       // console.log(data);
      this.spinnerService.hide();
        var response = JSON.parse(data._body);
        
          if(response.success == true || response.success == 'true'  ){
          let resp =response.message.environments[0].dimensions;
          if(resp && resp.length>0){
            this.getFilterData(resp); 
          }else{
            //alert("No Data available.");
            console.log("No Data available on apigee.");
          }
          
        }
  
      
      },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
      });
  }
  getProductService(resp,app){
   
    let filterData = {};
    for(let i in resp){
      let tempArr = [];
      tempArr = resp[i].name.split(',');
      let app = tempArr[0]; 
      let prod = tempArr[1]; 
      let serviceUrl = tempArr[2];
      let serviceName = tempArr[3];
      let servicePath = serviceUrl+serviceName;
      
      if(serviceName == ''){
        serviceName = serviceUrl;
      }
     

      if(app in filterData){
        if(prod in filterData[app]){
          filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
        }else{
          filterData[app][prod] =[];
          filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
        }

      }else{
        filterData[app] = {};
        filterData[app][prod] =[];
        filterData[app][prod].push({"serviceUrl":servicePath,"service":serviceName,"responseCode":tempArr[4]});
      }
      
    } 

    this.filterData = filterData;

    for(let prdc in this.filterData[app] ){
      let temp = {
        id:app+"&"+prdc,
        product:prdc
      }
      this.productName.push(temp);
    }
    
  }
  onNameClick(e){
      let tempArr = [];
        tempArr = [...this.dbApp, ...this.appName];
        const distinct = (v,i,s) => {
          return s.indexOf(v) === i;
        }

        this.appName = tempArr.filter(distinct); 
        if(this.appName.length<=0){
          alert("No data available");
        }
  }
  onNameChange(appName){
    
    this.productName = [];
    this.serviceName =[];
    this.responseCode = [];
  
    this.AnalyticForm.get(['basicDetailsSection','product']).setValue('');
    this.AnalyticForm.get(['basicDetailsSection','service']).setValue('');
    this.AnalyticForm.get(['basicDetailsSection','responseCode']).setValue('');

    /* if(appName == "All"){
      this.tableData = this.responseData;
    }else{
      for(let prdc in this.filterData[appName] ){
        let temp = {
          id:appName+"&"+prdc,
          product:prdc
        }
        this.productName.push(temp);
      }
      /* this.tableData = this.responseData.filter(
        item => item.appName === val); *
    } */
    let startDate =  this.AnalyticForm.value.basicDetailsSection.startDate;
    let endDate =  this.AnalyticForm.value.basicDetailsSection.endDate;
    let app = this.AnalyticForm.value.basicDetailsSection.AppName;
    if(startDate == null || startDate == undefined || startDate  ==''){
      startDate = this.sDate;
   }else{
    startDate = this.datepipe.transform(new Date(startDate),'MM/dd/yyyy%20HH:mm');
   }if(endDate == null || endDate == undefined || endDate  ==''){
    endDate = this.eDate;
   }else{
    endDate = this.datepipe.transform(new Date(endDate),'MM/dd/yyyy%20HH:mm')
   }
   if(app == null || app == undefined || app  =='ALL' ){
    alert("Please select app");
    return false;
   }
   app=app.replace(" ","%20");
   // this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
    let json = {
      select :"sum(message_count)",
      startTimeRange :startDate,
      endTimeRange :endDate,
     // filter :"(developer_email%20eq%20%22"+localStorage.getItem("email")+"%22)",
      filter:"(developer_app%20eq%20%22"+app+"%22)",
      tzo :"330"
    };
    this.spinnerService.show();
    this.adm.getAnalytics(json).subscribe((data: any) => {
      this.spinnerService.hide();
      console.log(data);
      var response = JSON.parse(data._body);
       
        if(response.success == true || response.success == 'true'  ){
        let resp =response.message.environments[0].dimensions;
        if(resp && resp.length>0){
        this.getProductService(resp,app);
        }else{
          alert("No Data available.");
        }
        
      }
    
     
    },
      err => {
        this.spinnerService.hide();
        console.log('err', err);
      });
    
  }
  onProductChange(prdc){
    
    this.serviceName = [];
    this.responseCode = [];
    
    this.AnalyticForm.get(['basicDetailsSection','service']).setValue('');
    this.AnalyticForm.get(['basicDetailsSection','responseCode']).setValue('');
    if(prdc == "All"){
      /* for(let prd in this.filterData[id[0]]){
        this.serviceName.push.apply(this.serviceName,this.filterData[id[0]][prd]);
      } */
    }else{
      let id = [];
      id= prdc.split("&");
      this.proxyProductName = id[1];
      this.service_responseCode = this.filterData[id[0]][id[1]];
      this.serviceName = this.service_responseCode;
      let resArr = [];
      // filter to get distinct service name
      this.serviceName.forEach(function(item){
        let i = resArr.findIndex(x => x.serviceUrl == item.serviceUrl);
        if(i <= -1){
          resArr.push({serviceUrl: item.serviceUrl, service: item.service,responseCode:item.responseCode});
        }
      });
    
      this.serviceName=resArr.sort(function (a, b) {
        return a.serviceUrl.localeCompare(b.serviceUrl);
    });
    }
    }
    
  onServiceChange(event){
    let val = event.target.value
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    this.selectServiceText = selectedOptions[selectedIndex].text;
    
    this.responseCode = [];
    this.AnalyticForm.get(['basicDetailsSection','responseCode']).setValue('');
    
     if(val == "All"){
    //  this.responseCode  = this.service_responseCode ;
    }else{
      this.responseCode = this.service_responseCode.filter(
        item => item.service === val);
        let resArr = this.responseCode;
        this.responseCode=resArr.sort(function (a, b) {
      
          return a.responseCode.localeCompare(b.responseCode);
      });
    } 
   
  }
  onResponseCodeChange(val){
     //do something
   
  }
  resetField($event){
    this.analyticsTab = false;
    this.latencyTab = false;
    this.resetTab = true;
      
    this.AnalyticForm.reset();
    this.tableData = [];
    this.responseData = [];
    this.latencyData="";
  }
 
}
