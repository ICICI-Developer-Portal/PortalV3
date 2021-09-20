import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bu-request',
  templateUrl: './bu-request.component.html',
  styleUrls: ['./bu-request.component.css']
})

export class BuRequestComponent implements OnInit {
  buData= [
    {
        "reqId": "BE-10004",
        "appId": "102",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:36:51 PM",
        "merchantName": "sss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "104",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:02 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "105",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:08 PM",
        "merchantName": "s",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "110",
        "appName": "EasyPayfdfd",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Sep 17, 2021 8:21:43 PM",
        "merchantName": "gsvcvv",
        "productName": "sgcvvc",
        "bucketValuesJson": "sg",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "107",
        "appName": "EasyPay",
        "status": "approved",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:42 PM",
        "merchantName": "s",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "108",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 10, 2021 4:01:01 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "109",
        "appName": "EasyPay",
        "status": "pending",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 10, 2021 4:21:07 PM",
        "merchantName": "gsvcvv",
        "productName": "sgcvvc",
        "bucketValuesJson": "sg",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    },
    {
        "reqId": "BE-10004",
        "appId": "106",
        "appName": "EasyPay",
        "status": "approved",
        "developerId": "sample@sample.com",
        "captureDt": "Aug 6, 2021 1:37:25 PM",
        "merchantName": "ss",
        "productName": "ss",
        "bucketValuesJson": "{}",
        "buId": "BAN255141",
        "buhId": "BAN255139",
        "buhRemarks": "no"
    }
]
  constructor() { }

  ngOnInit() {
  }

}
