
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  appName:any =[];
  productName:any=[];
  serviceName:any=[];
  AnalyticForm: FormGroup;
  sDate:any;
  eDate:any;
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
                    "1.0"
                  ]
                },
                {
                  "name": "tps",
                  "values": [
                    "5.511646E-7"
                  ]
                },
                {
                  "name": "max(total_response_time)",
                  "values": [
                    "343.0"
                  ]
                },
                {
                  "name": "avg(total_response_time)",
                  "values": [
                    "343.0"
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
                    "343.0"
                  ]
                }
              ],
              "name": "gpay-composite,Composite,/api/v1/composite-payment,,997 - Bad request"
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
                    "5.511646E-7"
                  ]
                },
                {
                  "name": "max(total_response_time)",
                  "values": [
                    "95.0"
                  ]
                },
                {
                  "name": "avg(total_response_time)",
                  "values": [
                    "95.0"
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
                    "95.0"
                  ]
                }
              ],
              "name": "gpay,Composite,/api/v1/composite-payment,,UNKNOWN"
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
                    "3.3069878E-6"
                  ]
                },
                {
                  "name": "max(total_response_time)",
                  "values": [
                    "112.0"
                  ]
                },
                {
                  "name": "avg(total_response_time)",
                  "values": [
                    "94.666664"
                  ]
                },
                {
                  "name": "sum(is_error)",
                  "values": [
                    "6.0"
                  ]
                },
                {
                  "name": "global-avg-total_response_time",
                  "values": [
                    "94.66666666666667"
                  ]
                }
              ],
              "name": "gpay-composite,Composite,/api/v1/composite-payment,,8016 - Decryption Fail"
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
                    "5.511646E-7"
                  ]
                },
                {
                  "name": "max(total_response_time)",
                  "values": [
                    "2369.0"
                  ]
                },
                {
                  "name": "avg(total_response_time)",
                  "values": [
                    "2369.0"
                  ]
                },
                {
                  "name": "sum(is_error)",
                  "values": [
                    "0.0"
                  ]
                },
                {
                  "name": "global-avg-total_response_time",
                  "values": [
                    "2369.0"
                  ]
                }
              ],
              "name": "gpay-composite,Composite,/api/v1/composite-payment,,9906 - Aggregator Resgistration missing"
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
                    "2.2046584E-6"
                  ]
                },
                {
                  "name": "max(total_response_time)",
                  "values": [
                    "114.0"
                  ]
                },
                {
                  "name": "avg(total_response_time)",
                  "values": [
                    "100.25"
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
                    "100.25"
                  ]
                }
              ],
              "name": "gpay-composite,Composite,/api/v1/composite-payment,,501 - System had Internal Error"
            }
          ],
          "name": "dev"
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

    this.AnalyticForm = this.formbuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
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
    this.getTableData(resp);
  }

 
},
  err => {
    console.log('err', err);
  });
//end

    

  }
  getAnalyticsData(sdate,edate){

    let startDate = sdate;
let endDate = edate;

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
        this.getTableData(resp);
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
    for(let i in analyticArray){
      console.log(analyticArray[i]);
      let tempObj = {};
      let tempArr = [];
      tempArr = analyticArray[i].name.split(',');
      tempObj['appName'] = tempArr[0];
      this.appName.push(tempArr[0]);

      tempObj['product'] = tempArr[1];
      this.productName.push(tempArr[1]);

      tempObj['service'] = tempArr[2];
      this.serviceName.push(tempArr[2]);

      tempObj['responseCode'] = tempArr[4];

      //distinct array
      this.appName=  this.appName.filter((n, i) =>  this.appName.indexOf(n) === i);
      this.productName=  this.productName.filter((n, i) =>  this.productName.indexOf(n) === i);
      this.serviceName=  this.serviceName.filter((n, i) =>  this.serviceName.indexOf(n) === i);
     
      for(let j in analyticArray[i].metrics){
        if(analyticArray[i].metrics[j].name== "avg(total_response_time)"){
          tempObj["avg_total_response_time"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "max(total_response_time)"){
          tempObj["max_total_response_time"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "sum(is_error)"){
          tempObj["sum_is_error"]=analyticArray[i].metrics[j].values[0];
        }else if(analyticArray[i].metrics[j].name == "sum(message_count)"){
          tempObj["sum_message_count"]=analyticArray[i].metrics[j].values[0];
        }else {
        tempObj[analyticArray[i].metrics[j].name] = analyticArray[i].metrics[j].values[0];
       }
    }

      this.tableData.push(tempObj);
    }
    console.log(this.tableData);
  }
}
