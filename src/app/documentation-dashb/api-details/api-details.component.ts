import { Component, OnInit, TemplateRef, Pipe, ɵConsole } from '@angular/core';
import { LoginService } from 'src/app/services';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
declare var $:any;

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
})
@Pipe({ name: 'safe' })


export class ApiDetailsComponent implements OnInit {
  testApireponse;
  reqParamjson;
  dataArray=[];
  selectedType : string;
  ApiDomain: any;
  frmUATFirst: FormGroup;
  typeSelected :string;
  type: "JSON";
  ApiName: any;
  ApiDesc: any;
  reqDetails: any;
  resDetails: any;
  errorDetails: any;
  samplePacket: any;
  sampleobj: {};
  sampleobj1: any;
  sampleobj2: any;
  modalRef: BsModalRef;
  SandboxUrl: any;
  prettyPkt:any='';
  Url: any;
  id : any;
  isactive_class1 :boolean = true;
  isactive_class2 :boolean = false;
  isactive_class3 :boolean = false;
  sandBoxForm;
  Request :object;
  contentType:any = "JSON";
  env ;
  isInternalUser:any;
//
  constructor(private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,private adm:LoginService,private ngxXml2jsonService: NgxXml2jsonService,private modalService: BsModalService,private sanitizer:DomSanitizer,
    private router: Router,
    ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.env = "";
      this.NewApplication();
      this.spinnerService.show();
      this.Sample_packet();
      this.isactive_class1 = true;
      this.isactive_class2 = false;
      this.isactive_class3 = false;
     // this.GetTestCases();
    /*testing */  
   /*   this.adm.getTransactionHistory()
        .subscribe(
          (data:any) => {
            let response= data._body;
            if(response && response !== null){ 
              let obj=JSON.parse(response);
              console.log("TransactionHistory data ="+ obj);
            }else{ 
              alert("No transaction history found.");
            }
          },
          err => {
            console.log('err', err);
          },
        );*/
    /* End here */  

    this.isInternalUser = localStorage.getItem("isInternalUser");

    });
    

   
    this.error_code();
    this.Sample_packet();
    
   }
   transform(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  is_acitve_fun(id){
    if(id == 1){
      this.isactive_class1 = true;
      this.isactive_class2 = false;
      this.isactive_class3 = false;
    }else if(id == 2){
      this.isactive_class1 = false;
      this.isactive_class2 = true;
      this.isactive_class3 = false;
    }else {
      this.isactive_class1 = false;
      this.isactive_class2 = false;
      this.isactive_class3 = true;
    }
  }
  

  ngOnInit() { 
    console.log();
    this.spinnerService.hide();
    this.dataArray.push(
      {
        key :"",
        value:""
      }
    )
    this.sandBoxForm = {
     
      type: 'JSON',
      Request :this.reqParam
    };
console.log(this.sandBoxForm ,)



    $('ul.toggleTabs li').removeClass('active');
    $('ul.toggleTabs li a').removeClass('active');
    $('ul.toggleTabs li a').removeClass('show');
    $('ul.toggleTabs li:first').addClass('active');
    $('ul.toggleTabs li:first a').addClass('active show');


    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane').removeClass('show');
    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane:first').addClass('show');
    
 }
 ngOnDestroy() {
  console.log('api detail');
//  this.modalRef.hide();
}
 addheader() {
  if(this.dataArray.length<=4){ 
  this.dataArray.push(
    {
      id:this.dataArray.length+1,
      key :"",
      value:""
    }
  )
  console.log(this.dataArray.length)
}}
removeheader(i: number) {
  this.dataArray.splice(i, 1);
}
  error_code(){
    var json ={
      "username":localStorage.getItem('username')
    }
    this.adm.error_code(json)
    // this.adm.error_code()
    .subscribe(
      (data:any) => {
        var response= data._body;
        var obj=JSON.parse(response);
        this.errorDetails=obj;
        
      }
    );
  }
  
  NewApplication(){ 
   var Json={
     "id":this.id,
     "username":localStorage.getItem('username')
    }
  this.adm.api_details(Json)
  .subscribe(
    (data:any) => {
        var response= data._body;
        if(response) {
          var obj=JSON.parse(response);
          this.ApiDomain =obj.ApiData.ApiDomain;
          this.ApiName =obj.ApiData.ApiName;
          this.ApiDesc =obj.ApiData.ApiDesc;
          this.SandboxUrl ="https://developerapi.icicibank.com:8443/"+obj.ApiData.SandboxUrl;
          this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.SandboxUrl);
          this.reqDetails =obj.ReqParam;
          this.resDetails =obj.ResParam;
          this.env = obj.ApiData.ErrorCode;
          this.spinnerService.hide();
        }
        
       

      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
      },
  );
}

Sample_packet(){
  var json = {
    "id":this.id,
    "username":localStorage.getItem('username')
  }
  console.log(this.id)
  this.adm.Sample_packet(json)
  .subscribe(
    (data:any) => {
      this.sampleobj2  = data._body;
      this.ParseData(this.sampleobj2);
      $('ul.toggleTabs li').removeClass('active');
    $('ul.toggleTabs li a').removeClass('active');
    $('ul.toggleTabs li a').removeClass('show');
    $('ul.toggleTabs li:first').addClass('active');
    $('ul.toggleTabs li:first a').addClass('active show');


    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane').removeClass('active');
    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane:first').addClass('active');
    },
    err => {
      console.log('err', err);
      //this.router.navigate(['error']);
    },
  );
}
  openModal(Authentication: TemplateRef<any>) {
    var json = {"username":localStorage.getItem('username'),"password":localStorage.getItem('password')};
    this.adm.Login(json)
    this.modalRef = this.modalService.show(Authentication, { backdrop:'static',class: 'modal-lg' }); 
  }


  


  
  ParseData(inputPkt) {
    var reqPkt,errFound,prettyPkt;
  reqPkt = inputPkt;// document.getElementById('inputPkt').value;
  //reqPkt = '{"some":"json"}';
  //reqPkt = '<root><node/></root>';
  //reqPkt = 'This is plain text packet';
  console.log(prettyPkt)
  reqPkt = JSON.parse(reqPkt)
  console.log(typeof reqPkt)
  try {
    prettyPkt = JSON.stringify(JSON.parse(reqPkt.data),null,2);
    console.log(prettyPkt)
   
  }
  catch(err) {
    errFound = true;
  }
  
  if(errFound) {
    errFound = false;
    try {
      prettyPkt = this.formatXML(reqPkt,"\t");
      console.log(prettyPkt)
    }
    catch(err) {
      errFound = true;
    }
  }
  if(errFound) {
    errFound = false;
    prettyPkt = reqPkt;
    if(reqPkt.data){
      prettyPkt = reqPkt.data;

    }

  }
  
  
  //document.getElementById('demo').innerHTML = Date();
  //document.getElementById('demo').innerHTML = jsonString;
 // document.getElementById('outputPretty').innerHTML = prettyPkt;
  this.prettyPkt = prettyPkt;
   console.log(prettyPkt)
  return prettyPkt;
  }
  
  formatXML(input,indent)
  {
    indent = indent || '\t'; //you can set/define other ident than tabs
    var  xmlString,xmlArr;
  
    //PART 1: Add \n where necessary
    xmlString = input.replace(/^\s+|\s+$/g, '');  //trim it (just in case) {method trim() not working in IE8}
  
    xmlString = input
                     .replace( /(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[\w\s])/g, "$1\n" ) //add \n after tag if not followed by the closing tag of pair or text node
                     .replace( /(<\/[a-zA-Z]+[^>]*>)/g, "$1\n") //add \n after closing tag
                     .replace( />\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<") //add \n between sets of angled brackets and text node between them
                     .replace( />(.+?)<([a-zA-Z])/g, ">\n$1\n<$2") //add \n between angled brackets and text node between them
                     .replace(/\?></, "?>\n<") //detect a header of XML
  
    xmlArr = xmlString.split('\n');  //split it into an array (for analise each line separately)
  
  
  
    //PART 2: indent each line appropriately
  
    var tabs = '';  //store the current indentation
    var start = 0;  //starting line
  
    if (/^<[?]xml/.test(xmlArr[0]))  start++;  //if the first line is a header, ignore it
  
    for (var i = start; i < xmlArr.length; i++) //for each line
    {  
      var line = xmlArr[i].replace(/^\s+|\s+$/g, '');  //trim it (just in case)
  
      if (/^<[/]/.test(line))  //if the line is a closing tag
       {
        tabs = tabs.replace(indent, '');  //remove one indent from the store
        xmlArr[i] = tabs + line;  //add the tabs at the beginning of the line
       }
       else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line))  //if the line contains an entire node
       {
        //leave the store as is
        xmlArr[i] = tabs + line; //add the tabs at the beginning of the line
       }
       else if (/<.*>/.test(line)) //if the line starts with an opening tag and does not contain an entire node
       {
        xmlArr[i] = tabs + line;  //add the tabs at the beginning of the line
        tabs += indent;  //and add one indent to the store
       }
       else  //if the line contain a text node
       {
        xmlArr[i] = tabs + line;  // add the tabs at the beginning of the line
       }
    }
  
  
    //PART 3: return formatted string (source)
    return  xmlArr.join('\n');  //rejoin the array to a string and return it
  }
  // 

  
    
  
  
  reqParam= {
    "folderName": "9898989",
    "fileDetails": [
      {
        "file": "U3VjY2VzcyBjYXNlIDo6D.....ZSBleGNlZWRzIDMEtCLiINCn0=",
        "docName": "test.pdf",
        "docDataClass": {
          "className": "APSOD_CAM",
          "indexName": "ApplictaionFormNo",
          "indexId": "405",
          "indexValue": "KYC_doc"
        },
        "folderDataClass": {
          "className": "Case_Folder",
          "indexName": "ApplicationFormNo",
          "indexId": "118",
          "indexValue": "KYC_doc"
        }
      },
      {
        "file": "U3VjY2VzcyBjYXNlIDo6D.....ZSBleGNlZWRzIDMEtCLiINCn0=",
        "docName": "test_1.jpg",
        "docDataClass": {
          "className": "APSOD_Photograph",
          "indexName": "ApplictaionFormNo",
          "indexId": "408",
          "indexValue": "aadhar_front"
        },
        "folderDataClass": {
          "className": "Case_Folder",
          "indexName": "ScannedImage",
          "indexId": "2019",
          "indexValue": "aadhar_front"
        }
      }
    ]
  }
  
get reqParamValue() {
  return this.prettyPkt;
}

set reqParamValue(v) {
  try {
    this.reqParam = JSON.parse(v);
  } catch (e) {
    console.log("error occored while you were typing the JSON");
  }
}
   testApiCall(){
  
    console.log("reqParam=="+this.reqParam);
    console.log("SandboxUrl=="+this.SandboxUrl);
    if(this.contentType == "JSON"){
      this.reqParam = JSON.parse(this.prettyPkt);
      this.adm.test_api(this.reqParam,this.SandboxUrl).subscribe(
        (data:any) => {
           // console.log(JSON.parse(JSON.stringify(data)));
            if(data && data._body){
              this.testApireponse=JSON.parse(data._body);
              console.log(this.testApireponse)
            }
             this.spinnerService.hide();
    
          },
          err => {
            console.log('err', err);
            this.testApireponse= err;
           // this.router.navigate(['error']);
          },
      );
    }else if(this.contentType == "XML"){
      this.reqParam = this.prettyPkt;
      this.adm.test_apiXML(this.reqParam,this.SandboxUrl).subscribe(
        (data:any) => {
         // data = JSON.parse(data);
            if(data && data._body){
             // data._body.replace(/['"]+/g, '');
              this.testApireponse=this.formatXML(data._body.replace(/['"]+/g, '')," ");
            }
             this.spinnerService.hide();
    
          },
          err => {
            console.log('err', err);
            this.testApireponse= err;
           // this.router.navigate(['error']);
          },
      );
    } //end else block
   
   }
   closeTestApiPopup(){
    this.modalRef.hide();
    this.testApireponse="";
   }
   /* 
   ** Get test cases for API dropdown
   */
   GetTestCases(){
    let _reqJson = {apiId : this.id };
    this.adm.getTestCases(_reqJson).subscribe(
      (data:any) => {
          console.log(JSON.parse(JSON.stringify(data)));
          if(data && data._body){
            let testApireponse=JSON.parse(data._body);
            console.log("GetTestCases==" +testApireponse);
            this.CreateTransactionHistory();
          }
           
  
        },
        err => {
          console.log('err', err);
         // this.router.navigate(['error']);
        },
    );
   }
   /* 
   ** * Create Transaction History 
   */
   CreateTransactionHistory(){
     let _reqBody ={"tranRefNo": "629359730EC5474","amount": "1.00","senderAcctNo": "000451000301","beneAccNo": "000405002777","beneName": "Yogesh","beneIFSC": "ICIC0000011","narration1": "Test","crpId": "PRACHICIB1","crpUsr": "USER3","aggrId": "CUST0116","urn": "9F25878CF1BD4E4","aggrName": "UDAAN","txnType": "TPA"};
     let _resBody ={"RESPONSE":"Failure","MESSAGE":"Connection to RIB failed."};
    let _reqJson = {
      headers	:"application/json",
      cType	:"json",
      apiId	:"601",
      apiName	:"QR code",
      reqBody	:_reqBody,
      resBody	:_resBody,
      testCaseId	:"601-1",
      testCaseStatus	:"Sample TC 1"
      };
    this.adm.createTransactionHistory(_reqJson).subscribe(
      (data:any) => {
          if(data && data._body){
            let testApireponse=JSON.parse(data._body);
            console.log(testApireponse)
          }
        },
        err => {
          console.log('err', err);
         // this.router.navigate(['error']);
        },
    );
   }


  // getVal() {
  //   console.log(this.type); // returns selected object
  //  }
  // selectTypeHandler(e:any){
  //   console.log(e);
  //   this.selectedType = e;  
  // }
  // get typeSelectedMethod() {
  //   return this.typeSelected;
  // }

  onSubmit(form:NgForm){
    // this.getVal() ;
    console.log(form.value)
  }
  
  onSubmitBody(form:NgForm){
    this.testApiCall()
    console.log(form.value)
  }
  

}
