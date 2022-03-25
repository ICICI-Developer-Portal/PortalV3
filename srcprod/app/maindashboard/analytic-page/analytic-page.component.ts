
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-analytic-page',
  templateUrl: './analytic-page.component.html',
  styleUrls: ['./analytic-page.component.css'],
  providers: [DatePipe],
})
export class AnalyticPageComponent implements OnInit {

  tableData:any = [];
  responseData:any = [];
  appName:any =[];
  productName:any=[];
  serviceName:any=[];
  AnalyticForm: FormGroup;
  sDate:any;
  eDate:any;
  analyticsTab:boolean = true;
  latencyTab:boolean = false;
  latencyData:any;
  constructor(
    private adm: LoginService,
    private formbuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router) {
     
      this.eDate= datepipe.transform(Date.now(),'MM/dd/yyyy%20hh:mm');
     var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  this.sDate= datepipe.transform(yesterday,'MM/dd/yyyy%20hh:mm');

      console.log(this.eDate);
     console.log(this.sDate);

    }
  
  ngOnInit() {
let respJson = 
{
  "environments": [
    {
      "dimensions": [
        {
          "metrics": [
            {
              "name": "sum(message_count)",
              "values": [
                "105382.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.219699"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "69554.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1481.8763"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1481.8762881706552"
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
                "860.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.009953704"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3890.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "684.3105"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "684.310465116279"
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
                "776.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008981481"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "29749.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2784.8518"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2784.851804123711"
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
                "720.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008333334"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3768.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "773.9986"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "773.9986111111111"
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
                "344.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0039814813"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3831.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "569.31976"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "569.3197674418604"
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
                "75.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.6805556E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "828.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "319.21335"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "319.2133333333333"
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
                "1055.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0122106485"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "30375.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3198.509"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3198.5090047393364"
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
                "86.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.953703E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "806.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "192.2093"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "192.2093023255814"
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
                "16.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.8518518E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3575.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "792.625"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "792.625"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20573.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "20573.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "20573.0"
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
                "3.0"
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
                "236.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "198.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "198.0"
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
                "1981.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.022928242"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "10823.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "373.74356"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "373.74356385663805"
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
                "7467113.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "86.42492"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "102398.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2935.3352"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2935.3353080367206"
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
                "4635.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.053645834"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "40322.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25296.607"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25296.60798274002"
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
                "454.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0052546295"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45203.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "348.42072"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "348.42070484581495"
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
                "11456.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.13259259"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45234.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "212.99371"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "212.9937150837989"
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
                "1922.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.02224537"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32708.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "7076.958"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "7076.957856399584"
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
                "42.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.8611112E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "893.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "291.33334"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "291.3333333333333"
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
                "249.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0028819444"
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
                "73535.96"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "249.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "73535.95983935743"
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
                "11.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.2731481E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2355.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "837.2727"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "837.2727272727273"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "618.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "618.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "618.0"
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
                "5175.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.059895832"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45100.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "285.72522"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "285.72521739130434"
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
                "73627.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.8521643"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "78084.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1609.1434"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1609.1434120635092"
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
                "38.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.3981482E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2239.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "670.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "670.5"
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
                "3621.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04190972"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5498.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "187.53355"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "187.53355426677714"
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
                "262.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0030324075"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "13950.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "732.6145"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "732.6145038167939"
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
                "319.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0036921296"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "12035.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "536.2132"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "536.2131661442006"
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
                "219.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0025347222"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6895.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1277.3927"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1277.392694063927"
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
                "684.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007916667"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "89623.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "63097.86"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "63097.86111111111"
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
                "45.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "5.2083336E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5015.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1531.8667"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1531.8666666666666"
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
                "660.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007638889"
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
                "72659.56"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "660.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72659.56515151515"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "569.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "569.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "569.0"
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
                "2.0"
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
                "1080.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "773.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "773.0"
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
                "252059.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.9173496"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "46253.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "197.04652"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "197.04652878889468"
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
                "1722.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.019930556"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31777.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "362.58594"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "362.58594657375147"
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
                "1987.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.022997685"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45180.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "238.75993"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "238.75993960744842"
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
                "20.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.3148148E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4701.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2300.05"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2300.05"
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
                "122.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0014120371"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2256.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "564.11475"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "564.1147540983607"
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
                "2.0"
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
                "177.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "171.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "171.0"
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
                "19.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.1990741E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1740.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "527.4211"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "527.421052631579"
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
                "40.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296295E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16124.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "15474.325"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "15474.325"
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
                "188.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.002175926"
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
                "71873.74"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "188.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71873.74468085106"
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
                "52.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.0185185E-4"
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
                "71548.734"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "52.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71548.73076923077"
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
                "658.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007615741"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "18338.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2485.2932"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2485.293313069909"
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
                "190719.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.2073958"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45822.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "218.18893"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "218.1889271650963"
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
                "6.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.9444446E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "944.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "490.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "490.5"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1725.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1024.875"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1024.875"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
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
                "1502.25"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1502.25"
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
                "14.0"
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
                "120086.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "89131.43"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "14.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "89131.42857142857"
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
                "43.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.9768516E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120073.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "63258.883"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "43.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "63258.88372093023"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2961.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2961.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2961.0"
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
                "1227.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.014201389"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23738.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4192.9546"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4192.954360228199"
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
                "1595.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.018460648"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23812.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "879.43384"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "879.4338557993731"
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
                "4013.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04644676"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3857.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "312.54623"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "312.54622476949913"
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
                "11306.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.13085648"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "26919.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1245.6058"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1245.605872987794"
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
                "75.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.6805556E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3517.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "276.14667"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "276.14666666666665"
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
                "7.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.1018516E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45159.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45113.145"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45113.142857142855"
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
                "556.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.006435185"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4463.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "207.55396"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "207.55395683453239"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6764.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4251.375"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4251.375"
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
                "48.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "5.5555557E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "15830.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "15425.4795"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "15425.479166666666"
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
                "2012.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.023287037"
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
                "71547.74"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "2012.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71547.74105367794"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
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
                "105069.25"
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
                "105069.25"
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
                "12340.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.14282407"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32253.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1221.1559"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1221.1559157212318"
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
                "178515.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.066146"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "89306.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "361.40677"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "361.40676133658235"
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
                "106840.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.236574"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31659.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "684.1035"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "684.1035192811681"
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
                "483.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0055902777"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "22835.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1921.8344"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1921.8343685300208"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "603.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "247.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "247.5"
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
                "17.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.9675925E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "503.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "166.58824"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "166.58823529411765"
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
                "29.0"
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
                "1499.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "527.931"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "527.9310344827586"
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
                "11.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.2731481E-4"
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
                "62263.637"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "62263.63636363636"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "406.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "226.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "226.5"
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
                "63.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.2916667E-4"
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
                "54790.383"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "63.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "54790.380952380954"
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
                "1011567.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "11.707952"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45195.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "304.85504"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "304.85503184663"
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
                "5650613.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "65.40061"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "49144.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "901.9253"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "901.925305449161"
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
                "9517.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.110150464"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "60396.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "5499.7017"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "5499.701796784701"
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
                "4131.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0478125"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32165.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4106.907"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4106.9070442992015"
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
                "146.0"
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
                "464.00684"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "464.0068493150685"
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
                "4278.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.049513888"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "30735.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "11378.044"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "11378.04347826087"
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
                "2.0"
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
                "312.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "256.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "256.5"
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
                "7.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.1018516E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1969.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1735.8572"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1735.857142857143"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120050.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "120050.0"
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
                "120050.0"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "118.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "118.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "118.0"
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
                "60790.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.70358795"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31978.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1313.2623"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1313.26236223063"
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
                "696.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008055556"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6001.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1068.7946"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1068.7945402298851"
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
                "1379.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.015960649"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "8303.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "589.0841"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "589.0841189267585"
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
                "3722.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.043078702"
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
                "682.2698"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "682.2697474476088"
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
                "26.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.0092592E-4"
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
                "9315.654"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "9315.653846153846"
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
                "62.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.175926E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45293.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45133.484"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45133.48387096774"
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
                "159.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0018402778"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1542.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "575.5472"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "575.5471698113207"
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
                "3.0"
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
                "465.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "317.33334"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "317.3333333333333"
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
                "21.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.4305556E-4"
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
                "15447.857"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "15447.857142857143"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16018.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "16018.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "16018.0"
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
                "19.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.1990741E-4"
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
                "72367.9"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "19.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72367.8947368421"
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
                "8767.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.101469904"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25115.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1382.3986"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1382.3985399794685"
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
                "47854.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.55386573"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "85904.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "16524.883"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "16524.883520708823"
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
                "8237.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.09533565"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32975.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3139.607"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3139.6068957144594"
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
                "12693.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.14690973"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45205.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "242.00725"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "242.00724808949815"
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
                "5019.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.058090277"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31190.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1177.9193"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1177.9193066347877"
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
                "67.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.7546295E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "641.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "250.86568"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "250.86567164179104"
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
                "27.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.125E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "182.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "111.77778"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "111.77777777777777"
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
                "55.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.3657406E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1337.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "721.8909"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "721.8909090909091"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
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
                "6019.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.06966435"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17623.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "508.70926"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "508.70925402890845"
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
                "1772.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.02050926"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32114.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25551.49"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25551.48927765237"
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
                "4278.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.049513888"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "74610.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2466.2065"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2466.206638616176"
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
                "923.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.010682871"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "8064.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "374.18527"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "374.1852654387866"
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
                "122.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0014120371"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1250.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "519.2459"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "519.2459016393443"
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
                "135.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0015625"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "10011.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1935.3185"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1935.3185185185184"
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
                "321.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0037152779"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16374.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "10623.779"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "10623.778816199378"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45158.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45107.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45107.5"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "87482.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "67530.0"
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
                "67530.0"
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
                "2485.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.028761575"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20591.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "385.65753"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "385.6575452716298"
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
                "165338.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.9136343"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31984.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "855.50726"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "855.5072578596572"
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
                "347337.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.020104"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32036.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "973.7914"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "973.7913755229072"
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
                "3536.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.040925927"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "22078.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1201.0917"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1201.091628959276"
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
                "122.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0014120371"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23140.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "8212.213"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "8212.213114754099"
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
                "761.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008807871"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2206.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "576.23914"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "576.2391590013141"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "799.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "417.75"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "417.75"
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
                "191.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.002210648"
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
                "4883.084"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4883.0837696335075"
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
                "54.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.25E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "9290.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3237.7036"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3237.703703703704"
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
                "2.0"
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
                "21451.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "21138.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "21138.5"
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
                "81.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.375E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3646.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "377.65433"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "377.65432098765433"
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
                "5431.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0628588"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "15888.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "818.8575"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "818.8574848094273"
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
                "94754.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.0966898"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "91286.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1068.4922"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1068.4922325178884"
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
                "236675.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.739294"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45791.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "217.02428"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "217.02426956797296"
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
                "1532.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.017731482"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "33060.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2639.0894"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2639.0894255874673"
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
                "52.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.0185185E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2102.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "723.5577"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "723.5576923076923"
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
                "9.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.0416667E-4"
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
                "57383.223"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "9.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "57383.22222222222"
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
                "6.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.9444446E-5"
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
                "9911.833"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "9911.833333333334"
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
                "157.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0018171297"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1273.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "232.12102"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "232.12101910828025"
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
                "12.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.3888889E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "852.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "318.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "318.0"
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
                "54.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.25E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "104734.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "71942.39"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "54.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71942.38888888889"
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
                "2.0"
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
                "120055.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "63879.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "2.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "63879.5"
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
                "134.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0015509259"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16426.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "9803.694"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "9803.694029850747"
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
                "182.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0021064815"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1514.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "329.6154"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "329.61538461538464"
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
                "1029.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.011909722"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "28647.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3143.653"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3143.6530612244896"
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
                "803.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.009293982"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "28837.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2570.6775"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2570.677459526775"
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
                "7.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.1018516E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "765.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "473.85715"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "473.85714285714283"
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
                "1193.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.01380787"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "36024.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "13067.845"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "13067.844928751048"
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
                "5.0"
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
                "386.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "181.2"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "181.2"
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
                "339.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0039236112"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120101.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "72443.016"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "339.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72443.01769911505"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "244.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "244.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "244.0"
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
                "1466.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.016967593"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "83317.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4843.9756"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4843.975443383356"
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
                "2336.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.027037038"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3933.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "487.13657"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "487.1365582191781"
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
                "141.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0016319444"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3877.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "923.39716"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "923.3971631205674"
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
                "754.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008726852"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "22738.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "917.48676"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "917.4867374005305"
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
                "17234.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.1994676"
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
                "73292.195"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "17234.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "73292.1953696182"
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
                "693.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008020833"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1738.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "236.41414"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "236.41414141414143"
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
                "41539.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.48077548"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "88000.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1709.1571"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1709.1571535183803"
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
                "5687.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.06582176"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45172.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "192.79233"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "192.79233339194656"
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
                "1567.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.018136574"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "21189.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "845.9451"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "845.9451180599872"
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
                "866.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.010023148"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25260.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3588.357"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3588.3568129330256"
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
                "27.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.125E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "316.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "165.2963"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "165.2962962962963"
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
                "100.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0011574074"
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
                "83130.73"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "100.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "83130.73"
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
                "1813.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.020983797"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "22064.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "16243.623"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "16243.623276337563"
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
                "61789.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.7151505"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31996.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "289.8906"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "289.8905954134231"
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
                "17929.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.20751157"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25053.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1049.2843"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1049.2843438005466"
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
                "9483.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.10975695"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "30022.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3466.843"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3466.8430876304965"
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
                "2976.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.034444444"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "13008.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1516.2513"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1516.2513440860216"
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
                "4118.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04766204"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24878.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "5828.006"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "5828.0058280718795"
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
                "186.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0021527777"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "15960.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2098.3708"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2098.3709677419356"
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
                "196.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0022685186"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20918.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4494.7144"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4494.714285714285"
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
                "10.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45153.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45107.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45107.0"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "234.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "234.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "234.0"
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
                "6.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.9444446E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1382.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "846.1667"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "846.1666666666666"
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
                "2.0"
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
                "932.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "928.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "928.0"
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
                "286.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0033101852"
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
                "72586.625"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "286.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72586.62237762238"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "201.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "163.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "163.5"
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
                "1893.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.021909723"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23540.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1997.8611"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1997.8610670892763"
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
                "1857.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.021493055"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17064.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "673.0921"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "673.0920840064621"
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
                "43814.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.5071065"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45212.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "213.98706"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "213.98705893093532"
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
                "2121.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.02454861"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45110.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "222.46298"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "222.46298915605846"
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
                "41588.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.48134258"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5982.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "344.0342"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "344.03421660094256"
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
                "136.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.001574074"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6673.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "285.36765"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "285.36764705882354"
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
                "24.0"
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
                "2652.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "922.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "922.5"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120060.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "90954.375"
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
                "90954.375"
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
                "5.0"
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
                "992.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "553.4"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "553.4"
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
                "47347.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.5479977"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45225.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "210.19403"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "210.19403552495407"
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
                "18818.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.21780093"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32179.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "921.2161"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "921.2161228610904"
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
                "661.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007650463"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45168.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "315.32828"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "315.3282904689864"
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
                "42243.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.4889236"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "83043.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "7296.0977"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "7296.097696659802"
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
                "913.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.01056713"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23178.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3219.8193"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3219.8192771084337"
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
                "31.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.587963E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "711.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "316.12903"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "316.1290322580645"
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
                "1346.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.015578704"
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
                "71948.56"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "1346.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71948.56315007429"
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
                "6.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.9444446E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "791.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "495.66666"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "495.6666666666667"
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
                "345202.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.9953935"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45342.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "255.33624"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "255.3362408097288"
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
                "176907.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.0475347"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "32319.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "589.9874"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "589.9874001594058"
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
                "3480.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04027778"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7802.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "343.4549"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "343.45488505747124"
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
                "2563.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.029664353"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45105.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "234.62349"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "234.62348809988296"
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
                "2.0"
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
                "402.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "294.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "294.5"
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
                "1765.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.02042824"
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
                "1218.5575"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1218.557507082153"
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
                "5.0"
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
                "667.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "318.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "318.0"
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
                "17.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.9675925E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7685.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2711.7646"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2711.764705882353"
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
                "52560.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.60833335"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "47358.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "197.45091"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "197.45091324200914"
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
                "4033.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04667824"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45199.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "213.08926"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "213.08926357550212"
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
                "1141281.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "13.2092705"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "46368.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "481.16183"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "481.16184620614905"
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
                "1828.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.021157408"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17671.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1129.2719"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1129.2718818380745"
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
                "12969.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.15010417"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6084.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "311.07425"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "311.07425399028455"
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
                "443.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.005127315"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1808.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "435.96838"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "435.96839729119637"
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
                "40.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296295E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3393.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "506.875"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "506.875"
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
                "69.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.986111E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1287.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "447.69565"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "447.69565217391306"
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
                "234.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0027083333"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4425.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "598.9829"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "598.982905982906"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
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
                "58.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.712963E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120112.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "67398.14"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "58.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "67398.13793103448"
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
                "11545.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.13362269"
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
                "72233.3"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "11545.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72233.30038977912"
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
                "12.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.3888889E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "400.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "221.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "221.5"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
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
                "14519.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "14519.0"
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
                "13.0"
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
                "22307.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "21411.846"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "21411.846153846152"
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
                "8789.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.101724535"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "44028.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "282.26932"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "282.2693139151212"
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
                "617616.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.1483335"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "46264.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "215.65262"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "215.65261100748685"
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
                "224.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0025925925"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23280.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4681.0537"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4681.053571428572"
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
                "357.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0041319444"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7333.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "668.6611"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "668.6610644257703"
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
                "611.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007071759"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4857.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "368.8036"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "368.8036006546645"
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
                "3.0"
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
                "6136.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2180.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2180.0"
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
                "43188.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.49986112"
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
                "15210.063"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "15210.063003612115"
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
                "49.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "5.6712964E-4"
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
                "553.9796"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "553.9795918367347"
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
                "12.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.3888889E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "342.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "182.33333"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "182.33333333333334"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "427.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "427.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "427.0"
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
                "161.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.001863426"
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
                "71980.59"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "161.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71980.5900621118"
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
                "3.0"
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
                "2.0"
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
                "1546.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1353.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1353.5"
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
                "8.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "9.259259E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1282.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "470.125"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "470.125"
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
                "47087.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.54498845"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31699.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "742.61707"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "742.6170705290208"
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
                "1020.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.011805556"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24973.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "5048.3"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "5048.3"
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
                "154377.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.7867708"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31915.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "763.92206"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "763.9220350181698"
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
                "412.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0047685187"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1148.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "185.92961"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "185.92961165048544"
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
                "2948.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.03412037"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20480.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "984.1645"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "984.1645183175034"
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
                "989.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.011446759"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24784.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3384.5198"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3384.519716885743"
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
                "10.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-4"
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
                "1134.9"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1134.9"
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
                "205.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0023726851"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4068.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "270.97073"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "270.9707317073171"
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
                "5163.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.059756946"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "28254.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "7963.2666"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "7963.266705403835"
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
                "5.0"
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
                "1252.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "452.2"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "452.2"
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
                "62.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.175926E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5355.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2718.6292"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2718.6290322580644"
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
                "283.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.003275463"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24223.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "6654.657"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "6654.657243816255"
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
                "67.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.7546295E-4"
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
                "23238.598"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "23238.597014925374"
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
                "3.0"
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
                "1497.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "901.3333"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "901.3333333333334"
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
                "5578.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.06456018"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "42909.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "16509.66"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "16509.66081032628"
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
                "4378.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.050671298"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "40446.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25269.719"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25269.71790772042"
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
                "132057.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.5284375"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31247.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "595.3642"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "595.3642139379208"
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
                "618.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0071527776"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23391.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "985.2994"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "985.299352750809"
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
                "107.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.001238426"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2032.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "246.1028"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "246.10280373831776"
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
                "516.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0059722224"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "120329.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "64077.445"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "516.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "64077.44573643411"
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
                "138.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0015972222"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4645.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1306.6086"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1306.608695652174"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "131.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "131.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "131.0"
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
                "1723.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.019942129"
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
                "71036.09"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "1723.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71036.0922809054"
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
                "713.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008252315"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20658.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1056.77"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1056.7699859747545"
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
                "327437.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.7897801"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "47455.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1494.9757"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1494.9757510605093"
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
                "10686.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.123680554"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "46264.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "208.77448"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "208.77447127082164"
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
                "161662.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.8710879"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "87045.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "30517.713"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "30517.712777276047"
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
                "224.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0025925925"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "3090.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "325.1875"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "325.1875"
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
                "3379.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.039108798"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45165.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "229.14531"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "229.14530926309558"
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
                "685.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007928241"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "22015.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1862.9723"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1862.9722627737226"
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
                "2.0"
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
                "823.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "709.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "709.0"
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
                "1642.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.01900463"
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
                "4803.023"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4803.023142509135"
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
                "185.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0021412037"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "591.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "181.40541"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "181.40540540540542"
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
                "95.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.001099537"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20121.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3544.158"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3544.157894736842"
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
                "314.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0036342593"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17149.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "13537.548"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "13537.547770700638"
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
                "5.0"
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
                "1745.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "804.6"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "804.6"
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
                "7.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.1018516E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "393.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "209.42857"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "209.42857142857142"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "406.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "406.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "406.0"
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
                "2124.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.024583334"
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
                "72231.234"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "2124.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72231.23305084746"
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
                "2976.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.034444444"
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
                "72467.57"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "2976.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "72467.57224462366"
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
                "2.0"
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
                "45085.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45079.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45079.0"
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
                "1919.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.022210648"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20330.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "846.7593"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "846.7592496091714"
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
                "5218.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.06039352"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45396.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "251.3302"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "251.33020314296667"
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
                "15.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.7361112E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "913.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "552.13336"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "552.1333333333333"
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
                "120.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0013888889"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "9649.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1381.9"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1381.9"
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
                "153.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0017708334"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7881.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "305.93463"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "305.93464052287584"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45082.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45082.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45082.0"
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
                "435.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0050347224"
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
                "71514.87"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "435.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "71514.86666666667"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1915.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1439.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1439.5"
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
                "29.0"
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
                "708.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "190.75862"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "190.75862068965517"
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
                "2129.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.024641205"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20731.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "928.8793"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "928.8792860497887"
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
                "240581.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.7845023"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "86910.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2098.8936"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2098.8935950885566"
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
                "154742.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.7909954"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "56748.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25294.709"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25294.709703894223"
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
                "4271.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.04943287"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24778.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4605.3257"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4605.325684851323"
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
                "286.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0033101852"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "12263.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "611.0315"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "611.0314685314685"
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
                "5.0"
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
                "1049.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "655.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "655.0"
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
                "270.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.003125"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23750.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1220.7222"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1220.7222222222222"
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
                "18.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.0833334E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1464.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "852.8333"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "852.8333333333334"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1380.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1380.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1380.0"
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
                "1.2025246E7"
              ]
            },
            {
              "name": "tps",
              "values": [
                "139.18109"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "55083.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "683.8825"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "922.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "683.8825091811011"
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
                "589.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0068171294"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "21660.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1200.5144"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1200.5144312393888"
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
                "10497.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.12149306"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45174.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "242.72868"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "242.72868438601506"
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
                "16623.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.19239584"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24975.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1246.2954"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1246.2954340371773"
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
                "1013.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.011724537"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16612.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "404.93878"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "404.93879565646597"
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
                "1504.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.017407408"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2180.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "425.24002"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "425.24002659574467"
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
                "945.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0109375"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31485.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "220.14497"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "220.14497354497354"
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
                "56.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "6.481481E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "521.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "185.48215"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "185.48214285714286"
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
                "256.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.002962963"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "29996.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "5979.699"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "5979.69921875"
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
                "159.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0018402778"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "16417.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4706.83"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4706.830188679245"
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
                "18.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.0833334E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2489.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1368.6111"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1368.611111111111"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "506.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "337.75"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "337.75"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
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
                "90738.25"
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
                "90738.25"
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
                "3.0"
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
                "438.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "359.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "359.0"
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
                "7267.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0841088"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "11420.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "577.5694"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "577.569423420944"
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
                "42016.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.4862963"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "79583.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1090.5764"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1090.5763994668698"
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
                "35933.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.4158912"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45197.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "211.1318"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "211.1318008515849"
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
                "4566.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.05284722"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31806.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "9081.01"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "9081.009417433203"
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
                "186412.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.1575463"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45232.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "223.38254"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "223.38253975065982"
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
                "5249.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.060752314"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "77605.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1523.8365"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1523.8365402933891"
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
                "5044.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.05837963"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "75041.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3335.356"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3335.3558683584456"
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
                "1360.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.015740741"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25549.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1374.4801"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1374.4801470588236"
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
                "1417.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.016400464"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "21929.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2319.7354"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2319.7353563867327"
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
                "2389.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.027650462"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23735.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3397.9373"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3397.9372122226873"
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
                "1523.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.017627316"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "10237.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "859.7945"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "859.7944845699278"
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
                "2252.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.026064815"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31909.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "8664.6455"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "8664.645204262877"
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
                "1646.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.019050926"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "6862.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "341.89127"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "341.89125151883354"
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
                "19287.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.22322917"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45256.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "223.35002"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "223.3500285166174"
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
                "9512.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.110092595"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25901.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "7584.2705"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "7584.270605550883"
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
                "3853.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.044594906"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45162.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "200.02544"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "200.0254347261874"
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
                "161278.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.8666435"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "88638.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2159.1143"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2159.1141693225363"
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
                "11.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.2731481E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "610.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "266.63635"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "266.6363636363636"
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
                "2147.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.024849538"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "23010.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3608.1406"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3608.140661387983"
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
                "14.0"
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
                "4049.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1897.7858"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1897.7857142857142"
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
                "176.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.002037037"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25878.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25256.443"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25256.44318181818"
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
                "186.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0021527777"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7005.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "824.0806"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "824.0806451612904"
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
                "68.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "7.87037E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31087.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1353.7059"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1353.7058823529412"
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
                "7.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "8.1018516E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45220.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "45116.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "45116.0"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "765.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "634.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "634.5"
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
                "11093.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.1283912"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25491.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "550.5787"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "550.5786532047237"
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
                "232167.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "2.687118"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31801.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "631.44696"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "631.4469756683767"
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
                "1417.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.016400464"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "31916.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "668.08325"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "668.0832745236415"
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
                "94406.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.0926621"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "54422.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "6572.9966"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "6572.996673940215"
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
                "4436.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.05134259"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45170.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "231.39314"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "231.3931469792606"
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
                "708.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.008194445"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "20803.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "329.3856"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "329.385593220339"
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
                "805.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.00931713"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17585.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1192.2448"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1192.2447204968944"
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
                "812.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.009398148"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "8636.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "322.56158"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "322.5615763546798"
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
                "490.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0056712963"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "9790.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "805.73267"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "805.7326530612245"
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
                "1160.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.013425926"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "7352.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "613.91205"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "613.9120689655173"
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
                "125.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0014467592"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1206.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "476.896"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "476.896"
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
                "1.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "791.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "791.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "791.0"
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
                "35812.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.41449073"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "39280.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "950.435"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "950.4350217804088"
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
                "6637.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.07681713"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "42382.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "16003.243"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "16003.243634172066"
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
                "3451.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.03994213"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24107.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "718.55"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "718.5499855114459"
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
                "980.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.011342593"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "19133.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "583.57043"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "583.5704081632653"
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
                "675.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0078125"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25608.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4479.083"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4479.082962962963"
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
                "37.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.2824075E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5725.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "3172.1082"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "3172.108108108108"
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
                "3409.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.039456017"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "24891.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1164.5118"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1164.5118803168084"
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
                "192.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0022222223"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5679.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "283.21353"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "283.2135416666667"
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
                "15114.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.17493056"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "35288.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "4139.7646"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "4139.764456795025"
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
                "684.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.007916667"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "1955.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "572.288"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "572.2880116959064"
              ]
            }
          ],
          "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,AJ - FAILURE"
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
                "7.638889E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "2295.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "798.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "798.0"
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
                "13.0"
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
                "643.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "249.15384"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "249.15384615384616"
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
                "5.0"
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
                "84269.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "73508.0"
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
                "73508.0"
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
                "1.1574074E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "612.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "612.0"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "612.0"
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
                "11132.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.12884259"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "29588.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1473.0103"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1473.0102407473948"
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
                "14249.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.16491897"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "30664.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "25012.004"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "25012.003719559267"
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
                "313.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.003622685"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "17600.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "552.89777"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "552.8977635782747"
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
                "206.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0023842594"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "11595.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "394.10193"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "394.1019417475728"
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
                "223.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0025810185"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "25376.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1365.9148"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1365.914798206278"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "4251.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "1383.5"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "1383.5"
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
                "321.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "0.0037152779"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "45202.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "315.50156"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "315.5015576323988"
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
                "30.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "3.4722223E-4"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "5968.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "2290.1667"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "2290.1666666666665"
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
                "4.0"
              ]
            },
            {
              "name": "tps",
              "values": [
                "4.6296296E-5"
              ]
            },
            {
              "name": "max(total_response_time)",
              "values": [
                "398.0"
              ]
            },
            {
              "name": "avg(total_response_time)",
              "values": [
                "226.25"
              ]
            },
            {
              "name": "sum(is_error)",
              "values": [
                "0.0"
              ]
            },
            {
              "name": "global-avg-total_response_time",
              "values": [
                "226.25"
              ]
            }
          ],
          "name": "gpay,UPI 2.0 v1,/api/v1/upi2,/ListAccounts,U01 - The request is duplicate"
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
        })
      });

     // this.AnalyticForm.controls.get.setValue("All");
   //  this.AnalyticForm.controls.product.setValue("All");
    //  this.AnalyticForm.controls.service.setValue("All");

//service call
//let analyticArray = respJson.environments[0].dimensions;
//this.getTableData(analyticArray);

let json = {
  select :"sum(message_count),tps,sum(is_error),avg(total_response_time),max(total_response_time)",
  startTimeRange :this.sDate,
  endTimeRange :this.eDate,
  filter :"(developer_email%20eq%20%22"+localStorage.getItem("email")+"%22)",
  tzo :"330"
};

this.adm.getAnalytics(json).subscribe((data: any) => {
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
    console.log('err', err);
  });
//end

    

  }

  getAnalyticsData($event){
    this.latencyTab= false;
    this.analyticsTab= true;
    
    let startDate =  this.AnalyticForm.value.basicDetailsSection.startDate;
    let endDate =  this.AnalyticForm.value.basicDetailsSection.endDate;;
   // this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
    let json = {
      select :"sum(message_count),tps,sum(is_error),avg(total_response_time),max(total_response_time)",
      startTimeRange :this.datepipe.transform(new Date(startDate),'MM/dd/yyyy%20hh:mm'),
      endTimeRange :this.datepipe.transform(new Date(endDate),'MM/dd/yyyy%20hh:mm'),
      filter :"(developer_email%20eq%20%22"+localStorage.getItem("email")+"%22)",
      tzo :"330"
    };
    
    this.adm.getAnalytics(json).subscribe((data: any) => {
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
        console.log('err', err);
      });

  }
  getLatencyData($event){
    this.analyticsTab= false;
    this.latencyTab= true;

    let startDate =  this.AnalyticForm.value.basicDetailsSection.startDate;
    let endDate =  this.AnalyticForm.value.basicDetailsSection.endDate;;
   // this.reactiveForm.value.basicDetailsSection.issueFirstObserved;
    let json = {
      "developerApp": this.AnalyticForm.value.basicDetailsSection.AppName,
      "proxy": "",
      "startTime": this.datepipe.transform(new Date(startDate),'dd/MM/yyyy hh:mm:ss'),
      "endTime": this.datepipe.transform(new Date(endDate),'dd/MM/yyyy hh:mm:ss'),
      "requestUrl": this.AnalyticForm.value.basicDetailsSection.service,
      "environment": "prod"
    };
    let resGb=     {
      "p99": 865,
      "p95": 865,
      "p90": 731,
      "p50": 673
  }; 
 // this.latencyData = resGb;

    this.adm.getLatency(json).subscribe((data: any) => {
      console.log(data);
      var response = JSON.parse(data._body);
       
        if(response.success == true || response.success == 'true'  ){
        let resp =response.message;
        if(resp && resp.length>0){
          //this.getTableData(resp);
     
    
          this.latencyData = resp;

        }else{
          alert("No Data available.");
        }
        
      }
    
     
    },
      err => {
        console.log('err', err);
      });
  }
  getTableData(resp){
    //let analyticArray = respJson.environments[0].dimensions;
    let analyticArray = resp
    //let tableData = [];
    this.tableData = [];
    for(let i in analyticArray){
     
      console.log(analyticArray[i]);
      let tempObj = {};
      let tempArr = [];
      tempArr = analyticArray[i].name.split(',');
      tempObj['appName'] = tempArr[0];
      this.appName.push(tempArr[0]);

      tempObj['product'] = tempArr[1];
      this.productName.push(tempArr[1]);

      tempObj['service'] = tempArr[3];
      this.serviceName.push(tempArr[2]+tempArr[3]);

      tempObj['responseCode'] = tempArr[4];

      //distinct array
      this.appName=  this.appName.filter((n, i) =>  this.appName.indexOf(n) === i);
      this.productName=  this.productName.filter((n, i) =>  this.productName.indexOf(n) === i);
      this.serviceName=  this.serviceName.filter((n, i) =>  this.serviceName.indexOf(n) === i);
     
      for(let j in analyticArray[i].metrics){
        if(analyticArray[i].metrics[j].name== "avg(total_response_time)"){
          tempObj["avg_total_response_time"]=parseFloat(analyticArray[i].metrics[j].values[0]).toFixed(3);
        }else if(analyticArray[i].metrics[j].name == "max(total_response_time)"){
          tempObj["max_total_response_time"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "sum(is_error)"){
          tempObj["sum_is_error"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "sum(message_count)"){
          tempObj["sum_message_count"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "tps"){
          tempObj["tps"]=parseFloat(analyticArray[i].metrics[j].values[0]).toFixed(2);
        }else {
        tempObj[analyticArray[i].metrics[j].name] = analyticArray[i].metrics[j].values[0];
       }
    }
console.log(tempObj)
      this.tableData.push(tempObj);
      this.responseData = this.tableData;
    }
    console.log(this.tableData);
  }
  onNameChange(val){
    if(val == "All"){
      this.tableData = this.responseData;
    }else{
      this.tableData = this.responseData.filter(
        item => item.appName === val);
    }
    
  }
  onProductChange(val){
    if(val == "All"){
      this.tableData = this.responseData;
    }else{
      this.tableData = this.responseData.filter(
        item => item.product === val);
    }
    }
    
  onServiceChange(val){
    if(val == "All"){
      this.tableData = this.responseData;
    }else{
     
let lastIndex = val.lastIndexOf("/")
let s2 = val.substring(lastIndex + 1); //after this s2="true"

      this.tableData = this.responseData.filter(
        item => item.service === "/"+s2);
    }
   
  }
 
}
