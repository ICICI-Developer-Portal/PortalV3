

import { Component, OnInit, TemplateRef, Renderer2, Pipe,ViewChild, HostListener, ElementRef, ɵConsole } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DashboardService, LoginService } from 'src/app/services';
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
  selector: 'app-new-api-details',
  templateUrl: './new-api-details.component.html',
  styleUrls: ['./new-api-details.component.css'],
  host: {
    "(window:click)": "onClick()"
  }

})
@Pipe({ name: 'safe' })
export class NewApiDetailsComponent implements OnInit {
  testApiresponse;
  reqParamjson;
  dataArray=[];
  selectedType : string;
  ApiDomain: any;
  ApiSubDomain : any
  ApiIdNumber: any;
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
  contentType;
  serviceForXMLjson;
  testApiReqData=[];
  testApiResData=[];
  testApiResID=[];
  testApiResName=[];
  idForClickedTab;
  testApiresponseFor601;
  populateRes;
  clickedTestCaseID;
  testCaseDescription;
  isMenuOpen = true
  tesAPiSuccesufulResponse;
   keyVal;
   val;
   keyPriority;
   priority_value;
   storeValue;store_priority_value;
   key1= false;
   key2= false;
   storeRequestValue;
   onchnageKeyValue;
   onchangePriorityValue;
   env ;
   invalidApiKey = false;
   isInternalUser:any;
   fileURL:any ;
   fileName:any;
  @ViewChild('Prodconfirm') Prodconfirm;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,private adm:LoginService,private ngxXml2jsonService: NgxXml2jsonService,private modalService: BsModalService,private sanitizer:DomSanitizer,
    private router: Router,
    private dashboardService: DashboardService,
    ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.env = "";
      this.isInternalUser = localStorage.getItem("isInternalUser");
        if(this.id==1464){
          this.ApiIdNumber = 1464;
          this.dataArray.push(
            {
              key :"API key",
              value:"",
              keyPriority : "Priority",
              priority_value : "000010",
              store_priority_value : "000010"
            }              
          )
        }
        else{
          this.dataArray.push(
            {
              key :"API key",
              storeValue :"f219f506-1079-4c76-8ea6-439774f96265",
              value:"f219f506-1079-4c76-8ea6-439774f96265",
              keyPriority : "Priority",
              priority_value : "000010",
              store_priority_value : "000010"
            }
            
            
          )
        }
      this.NewApplication();
      this.spinnerService.show();
      this.Sample_packet();
      this.isactive_class1 = true;
      this.isactive_class2 = false;
      this.isactive_class3 = false;
      let _reqJson = {apiId : this.idForClickedTab };

      this.GetTestCases(_reqJson,Headers);
      this.error_code();
      this.Sample_packet();
    
    });
     
   
    
   }
   toggleMenu($event) {    
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  
  }

  onClick() {
    this.isMenuOpen = false;
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
    this.contentType="JSON";
  
    // if(this.dataArray.length==1){ this.keyVal="1234";this.val='123'}else{ this.keyVal="";this.val=''} 
    // console.log( this.idForClickedTab,"====================")
    
    // this.dataArray.push(
    //   {
    //     key :"API key",
    //     storeValue :"f219f506-1079-4c76-8ea6-439774f96265",
    //     value:"f219f506-1079-4c76-8ea6-439774f96265",
    //     keyPriority : "Priority",
    //     priority_value : "000010",
    //     store_priority_value : "000010"
    //   }      
    // )
    this.NewApplication();
    
    
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
 addheader() {
 
   console.log(this.dataArray.length)
  if(this.dataArray.length<=4){ 
  this.dataArray.push(
    {
      id:this.dataArray.length+1,
      key :this.keyVal,
      value:this.val,
      keyPriority : this.keyPriority,
      priority_value : this.priority_value,
      storeValue :this.storeValue,
      store_priority_value : this.store_priority_value
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
    this.idForClickedTab=this.id;
  this.adm.api_details(Json)
  .subscribe(
    (data:any) => {
        var response= data._body;
        if(response) {
          var obj=JSON.parse(response);
          console.log(obj)
          this.ApiDomain =obj.ApiData.ApiDomain;
          this.ApiSubDomain = obj.ApiData.ApiSubDomain;

          console.log( this.ApiSubDomain)

          this.ApiName =obj.ApiData.ApiName;
          this.ApiDesc =obj.ApiData.ApiDesc;

          if(obj.ApiData.FILE_URL && obj.ApiData.FILE_URL !== ""){
            this.fileURL =  (obj.ApiData.FILE_URL).trim();
            this.fileName =   this.fileURL.substring( this.fileURL.lastIndexOf('/') + 1);
          }
          //this.ApiIdNumber=1464;
          //parseInt(obj.ApiData.ApiId);
          this.SandboxUrl ="https://developerapi.icicibank.com:8443/"+obj.ApiData.SandboxUrl;
          this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.SandboxUrl);
          this.reqDetails =obj.ReqParam;
          this.resDetails =obj.ResParam;
          this.env = obj.ApiData.ErrorCode;
          this.spinnerService.hide();
         
        }
        
       

      },
      err => {

       /* let obj = {"ApiData":{"ApiId":"1117","ApiDomain":"Trade Services","ApiName":"Transaction Order","ApiDesc":"This service is used to initiate a transaction request","ApiSubDomain":"Remittance","SandboxUrl":"api/v0/RemittanceTransactionOrder","ApiLevel":"1","ErrorCode":"PROD"},"ReqParam":[{"ReqId":"1859","ReqName":"MessageType","ReqType":"string","ReqDesc":"Service type in message tag","ReqMand":"Y"},{"ReqId":"1860","ReqName":"CorrespondentId","ReqType":"string","ReqDesc":"Unique ID Provided by NRISR","ReqMand":"Y"},{"ReqId":"1861","ReqName":"SettlementDate","ReqType":"string","ReqDesc":"On which date transaction to be initiated ","ReqMand":"Y"},{"ReqId":"1862","ReqName":"EHReferenceNumber","ReqType":"string","ReqDesc":"Unique number for transaction order ","ReqMand":"Y"},{"ReqId":"1863","ReqName":"SendCountry","ReqType":"string","ReqDesc":"From which country transaction initiated ","ReqMand":"Y"},{"ReqId":"1864","ReqName":"DisbursalMode","ReqType":"string","ReqDesc":"Payment type","ReqMand":"Y"},{"ReqId":"1865","ReqName":"SenderMobileNumber","ReqType":"string","ReqDesc":"Mobile number of sender","ReqMand":"Y"},{"ReqId":"1866","ReqName":"AccountType","ReqType":"string","ReqDesc":"Customer account type ","ReqMand":"Y"},{"ReqId":"1867","ReqName":"micrcode","ReqType":"string","ReqDesc":"IFSC","ReqMand":"Y"},{"ReqId":"1868","ReqName":"receiveAccountNumber","ReqType":"string","ReqDesc":"Beneficiary account number","ReqMand":"Y"},{"ReqId":"1869","ReqName":"sendAmount","ReqType":"string","ReqDesc":"Amount","ReqMand":"Y"},{"ReqId":"1870","ReqName":"cardRate","ReqType":"string","ReqDesc":"Number of times Send Amount to be sent","ReqMand":"Y"},{"ReqId":"1871","ReqName":"receiveAmount","ReqType":"string","ReqDesc":"Total amount received","ReqMand":"Y"},{"ReqId":"1876","ReqName":"Purpose","ReqType":"string","ReqDesc":"Purpose of money transaction","ReqMand":"Y"},{"ReqId":"1877","ReqName":"PayoutLocation","ReqType":"string","ReqDesc":"DD location","ReqMand":"Y"},{"ReqId":"1878","ReqName":"SenderFirstName","ReqType":"string","ReqDesc":"Sender First Name","ReqMand":"Y"},{"ReqId":"1879","ReqName":"SenderMiddleName","ReqType":"string","ReqDesc":"Sender Middle Name","ReqMand":"Y"},{"ReqId":"1880","ReqName":"SenderLastName","ReqType":"string","ReqDesc":"Sender Last Name","ReqMand":"Y"},{"ReqId":"1881","ReqName":"SenderAddress","ReqType":"string","ReqDesc":"Sender Address","ReqMand":"Y"},{"ReqId":"1882","ReqName":"SenderCity","ReqType":"string","ReqDesc":"Sender City","ReqMand":"Y"},{"ReqId":"1883","ReqName":"SenderCountry","ReqType":"string","ReqDesc":"Sender Country","ReqMand":"Y"},{"ReqId":"1884","ReqName":"SenderAccountNumber","ReqType":"string","ReqDesc":"Sender Account Number","ReqMand":"Y"},{"ReqId":"1885","ReqName":"SenderIDNumber","ReqType":"string","ReqDesc":"ID provided by NRISR","ReqMand":"Y"},{"ReqId":"1886","ReqName":"ReceiverFirstName","ReqType":"string","ReqDesc":"Receiver First Name","ReqMand":"Y"},{"ReqId":"1887","ReqName":"ReceiverMiddleName","ReqType":"string","ReqDesc":"Receiver Middle Name","ReqMand":"Y"},{"ReqId":"1888","ReqName":"ReceiverLastName","ReqType":"string","ReqDesc":"Receiver Last Name","ReqMand":"Y"},{"ReqId":"1892","ReqName":"ReceiverCity","ReqType":"string","ReqDesc":"Receiver City","ReqMand":"Y"},{"ReqId":"1896","ReqName":"ReceiverPhoneNumber","ReqType":"string","ReqDesc":"Receiver Phone Number","ReqMand":"Y"},{"ReqId":"1897","ReqName":"SignatureValue","ReqType":"string","ReqDesc":"Signature to be generated by merchant","ReqMand":"Y"},{"ReqId":"1893","ReqName":"ReceiverStateProvince","ReqType":"string","ReqDesc":"Receiver State Province","ReqMand":"N"},{"ReqId":"1894","ReqName":"ReceiverCountry","ReqType":"string","ReqDesc":"Receiver Country","ReqMand":"N"},{"ReqId":"1895","ReqName":"ReceiverZipPostalCode","ReqType":"string","ReqDesc":"Receiver Zip Postal Code","ReqMand":"N"},{"ReqId":"1872","ReqName":"payableBranchCode","ReqType":"string","ReqDesc":"Branch code","ReqMand":"C"},{"ReqId":"1873","ReqName":"DDIssuedTo","ReqType":"string","ReqDesc":"Demand draft","ReqMand":"C"},{"ReqId":"1874","ReqName":"BeneBranchName","ReqType":"string","ReqDesc":"Beneficiary branch name","ReqMand":"C"},{"ReqId":"1875","ReqName":"BeneBankAddress","ReqType":"string","ReqDesc":"Beneficiary bank address ","ReqMand":"C"},{"ReqId":"1889","ReqName":"ReceiverAddress1","ReqType":"string","ReqDesc":"ReceiverAddress1","ReqMand":"C"},{"ReqId":"1890","ReqName":"ReceiverAddress2","ReqType":"string","ReqDesc":"ReceiverAddress2","ReqMand":"C"},{"ReqId":"1891","ReqName":"ReceiverAddress3","ReqType":"string","ReqDesc":"ReceiverAddress3","ReqMand":"C"}],"ResParam":[{"ResId":"1818","ResName":"EHReferenceNo","ResDesc":"Unique number for trnorder ","ResType":"string"},{"ResId":"1819","ResName":"AckStatus","ResDesc":"Status of trnorder","ResType":"string"},{"ResId":"1820","ResName":"ProcessDateTime","ResDesc":"Process Date-Time","ResType":"string"},{"ResId":"1821","ResName":"Correspondentid","ResDesc":"Unique ID Provided by NRISR","ResType":"string"}]};
    let obj2 = {"ApiData":{"ApiId":"1527","ApiDomain":"Building Blocks","ApiName":"ShuftiPro","ApiDesc":"For Customer online KYC verification we have called Shufti Pro API.","ApiSubDomain":"Customer Authentication","SandboxUrl":"v1/shuftipro","FILE_URL":" https://developer.icicibank.com/assets/documents/Shufti Pro KYC API DOC v1.0.pdf","ApiLevel":"1","ErrorCode":"UAT"},"ReqParam":[],"ResParam":[]};
        this.ApiDomain =obj.ApiData.ApiDomain;
        this.ApiSubDomain = obj.ApiData.ApiSubDomain;

        console.log( this.ApiSubDomain)

        this.ApiName =obj.ApiData.ApiName;
        this.ApiDesc =obj.ApiData.ApiDesc;
      
       
        //this.ApiIdNumber=1464;
        //parseInt(obj.ApiData.ApiId);
        this.SandboxUrl ="https://developerapi.icicibank.com:8443/"+obj.ApiData.SandboxUrl;
        this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.SandboxUrl);
        this.reqDetails =obj.ReqParam;
        this.resDetails =obj.ResParam;
        this.env = obj.ApiData.ErrorCode;   */
        console.log('err', err);
        this.spinnerService.hide();
      },
  );
}

Sample_packet(){
  var json = {
    "id":this.id,
    "username":localStorage.getItem('username')
  }
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
      // let data={
      //   "transRefNo": "134255",
      //   "passCode": "3f4dbbdad1a241bca994339c0d3f3efd",
      //   "bcID": "IBCFli00044",
      //   "recon360": "N",
      //   "date": " 02/16/2021"
      // }
      // this.prettyPkt=JSON.stringify(data);
    //this.router.navigate(['error']);
    },
  );
}
  openModal(Authentication: TemplateRef<any>) {
    var json = {"username":localStorage.getItem('username'),"password":localStorage.getItem('password')};
    this.adm.Login(json)
    this.modalRef = this.modalService.show(Authentication, { backdrop:'static',class: 'modal-lg' }); 
    this.testApiresponse="";
    this.testApiResID=[];
    $("input:text").val("");
    $("textarea.texareaRes").val("");
    this.testApiResName=[];
    this.testCaseDescription="";
    this.clickedTestCaseID="";
    this.invalidApiKey = false;
  }

  openModalcallbackURL(Prodconfirm: TemplateRef<any>) {
    // var json = {"username":localStorage.getItem('username'),"password":localStorage.getItem('password')};
    // this.adm.Login(json)
    this.modalRef = this.modalService.show(this.Prodconfirm, { backdrop:'static',class: 'modal-lg' }); 
  }

  closeTestApiPopup(){
    this.modalRef.hide();
    console.log(this.modalRef)

    this.testApiresponse="";
   }
   Close_ConfirmProd() {
     console.log(this.modalRef)
   // this.Prodconfirm.nativeElement.click();
     this.modalRef.hide();
    // console.log( $(this)
    // this.modalRef = this.modalService.show(Authentication, { backdrop:'static',class: 'modal-lg' }); 
    // $('#modalCapturedData').hide();
    // console.log( $(this).attr("class"))

   // $("#Prodconfirm").modal("hide");
    //  this.modalRef = this.modalService.hide(this.Prodconfirm); 


    // this.router.navigate(["/index"]);

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
    //xmlArr = xmlString.split('\r\n').join(""); 
  
  
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

    testCasesData=[
      {
        "testCaseId": "601-1",
        "testCaseName": "Sample TC 1",
        "apiId": "601",
        "requestPacket": "{\n   \"tranRefNo\": \"629359730EC5474\",\n   \"amount\": \"1.00\",\n   \"senderAcctNo\": \"000451000301\",\n   \"beneAccNo\": \"000405002777\",\n   \"beneName\": \"Yogesh\",\n   \"beneIFSC\": \"ICIC0000011\",\n   \"narration1\": \"Test\",\n   \"crpId\": \"PRACHICIB1\",\n   \"crpUsr\": \"USER3\",\n   \"aggrId\": \"CUST0116\",\n   \"urn\": \"9F25878CF1BD4E4\",\n   \"aggrName\": \"UDAAN\",\n   \"txnType\": \"TPA\"\n}",
        "responsePacket": "{\n\"RESPONSE\":\"Failure\",\n\"MESSAGE\":\"Connection to RIB failed.\"\n}"
      },
      {
        "testCaseId": "601-2",
        "testCaseName": "Sample TC 2",
        "apiId": "601",
        "requestPacket": "{\n   \"tranRefNo\": \"629359730EC5474\",\n   \"amount\": \"1.00\",\n   \"senderAcctNo\": \"000451000301\",\n   \"beneAccNo\": \"000405002777\",\n   \"beneName\": \"Yogesh\",\n   \"beneIFSC\": \"ICIC0000011\",\n   \"narration1\": \"Test\",\n   \"crpId\": \"PRACHICIB1\",\n   \"crpUsr\": \"USER3\",\n   \"aggrId\": \"CUST0116\",\n   \"urn\": \"9F25878CF1BD4E4\",\n   \"aggrName\": \"UDAAN\",\n   \"txnType\": \"TPA\"\n}",
        "responsePacket": "{\n\"RESPONSE\":\"Failure\",\n\"MESSAGE\":\"Counterparty Account is a closed account\"\n}"
      },
      {
        "testCaseId": "601-3",
        "testCaseName": "Sample TC 3",
        "apiId": "601",
        "requestPacket": "{\n   \"tranRefNo\": \"629359730EC5474\",\n   \"amount\": \"1.00\",\n   \"senderAcctNo\": \"000451000301\",\n   \"beneAccNo\": \"000405002777\",\n   \"beneName\": \"Yogesh\",\n   \"beneIFSC\": \"ICIC0000011\",\n   \"narration1\": \"Test\",\n   \"crpId\": \"PRACHICIB1\",\n   \"crpUsr\": \"USER3\",\n   \"aggrId\": \"CUST0116\",\n   \"urn\": \"9F25878CF1BD4E4\",\n   \"aggrName\": \"UDAAN\",\n   \"txnType\": \"TPA\"\n}",
        "responsePacket": "{\n\"RESPONSE\":\"Failure\",\n\"MESSAGE\":\"Host Not Available\"\n}"
      },
      {
        "testCaseId": "601-4",
        "testCaseName": "Sample TC 4",
        "apiId": "601",
        "requestPacket": "{\n   \"tranRefNo\": \"629359730EC5474\",\n   \"amount\": \"1.00\",\n   \"senderAcctNo\": \"000451000301\",\n   \"beneAccNo\": \"000405002777\",\n   \"beneName\": \"Yogesh\",\n   \"beneIFSC\": \"ICIC0000011\",\n   \"narration1\": \"Test\",\n   \"crpId\": \"PRACHICIB1\",\n   \"crpUsr\": \"USER3\",\n   \"aggrId\": \"CUST0116\",\n  \"urn\": \"9F25878CF1BD4E4\",\n   \"aggrName\": \"UDAAN\",\n   \"txnType\": \"TPA\"\n}",
        "responsePacket": "{\n\"RESPONSE\":\"Failure\",\n\"MESSAGE\":\"The transaction cannot be processed with the available networks. Contact the bank administrator.\"\n}"
      },
      {
        "testCaseId": "601-5",
        "testCaseName": "Sample TC 5",
        "apiId": "601",
        "requestPacket": "{\n   \"tranRefNo\": \"629359730EC5474\",\n   \"amount\": \"1.00\",\n   \"senderAcctNo\": \"000451000301\",\n   \"beneAccNo\": \"000405002777\",\n   \"beneName\": \"Yogesh\",\n   \"beneIFSC\": \"ICIC0000011\",\n   \"narration1\": \"Test\",\n   \"crpId\": \"PRACHICIB1\",\n   \"crpUsr\": \"USER3\",\n   \"aggrId\": \"CUST0116\",\n   \"urn\": \"9F25878CF1BD4E4\",\n   \"aggrName\": \"UDAAN\",\n   \"txnType\": \"TPA\"\n}",
        "responsePacket": "{\n\"RESPONSE\":\"Failure\",\n\"MESSAGE\":\"The transaction with reference id 195100512 has been submitted successfully and its status is unknown. Please check the status later.\"\n}"
      }
    ]
  
  
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
  console.log(v);
  try {
    this.reqParam = JSON.parse(v);
  } catch (e) {
    console.log("error occored while you were typing the JSON");
    this.storeRequestValue=false;
  }
}
  /*  testApiCall(required){
    let json =required;

         if(this.contentType=="JSON"){ this.reqParam = required;
        this.serviceForXMLjson=this.adm.test_apiJSON(this.reqParam,this.SandboxUrl)}
         else if(this.contentType=="XML"){ this.reqParam = required;
          this.serviceForXMLjson=this.adm.test_apiXML(this.reqParam,this.SandboxUrl)}
    // this.reqParam = JSON.parse(this.prettyPkt);
    console.log("reqParam=="+this.reqParam);
    console.log("SandboxUrl=="+this.SandboxUrl);
    // ===================================
     if(this.ApiIdNumber==1464){
    // body.append('email', 'emailId');
   
   
    this.adm.test_impsData(json,$('input[id=value]').val()).subscribe(
      (data:any) => {
         
        if(data && data._body){
            // if(this.contentType=="JSON"){ 
             
                // if(this.contentType=="JSON"){ }
                // else if(this.contentType=="XML"){  this.testApiresponse=data._body;}
                this.testApiresponse=JSON.parse(data._body);
                console.log(this.testApiresponse)

            if (this.testApiresponse.message == null){
              this.invalidApiKey = true;
            }else{
              this.invalidApiKey = false;
            }
            // }

            // else if(this.contentType=="XML"){  this.testApiresponse=data._body;}
           
            console.log(this.testApiresponse)
           this.tesAPiSuccesufulResponse=this.testApiresponse.Success
           this.createTransactionHistory;
          }
           this.spinnerService.hide();
        },
        err => {
          console.log('err', err);
          this.testApiresponse= err;
         // this.router.navigate(['error']);
        },);
      }
  //=================================== 
    else{
    this.serviceForXMLjson.subscribe(
      (data:any) => {
         
          if(data && data._body){
            if(this.contentType=="JSON"){ this.testApiresponse=JSON.parse(data._body);}
            else if(this.contentType=="XML"){  this.testApiresponse=data._body;}
           
            console.log(this.testApiresponse)
           this.tesAPiSuccesufulResponse=this.testApiresponse.Success
           this.createTransactionHistory;
          }
           this.spinnerService.hide();
        },
        err => {
          console.log('err', err);
          this.testApiresponse= err;
         // this.router.navigate(['error']);
        },
    );
  
   }}
   */

   testApiCall(required){
    let json =required;
 
         if(this.contentType=="JSON"){ this.reqParam = required;
        this.serviceForXMLjson=this.adm.test_apiJSON(this.reqParam,this.SandboxUrl)}
         else if(this.contentType=="XML"){ this.reqParam = required;
          this.serviceForXMLjson=this.adm.test_apiXML(this.reqParam,this.SandboxUrl)}
    // this.reqParam = JSON.parse(this.prettyPkt);
    console.log("reqParam=="+this.reqParam);
    console.log("SandboxUrl=="+this.SandboxUrl);
    // ===================================
     if(this.ApiIdNumber==1464){
    // body.append('email', 'emailId');
   
    //let json1 =JSON.parse(this.prettyPkt);
    //console.log(JSON.parse(this.prettyPkt))
     json =JSON.parse(required);
     console.log(json)
    this.adm.test_impsData(json,$('input[id=value]').val()).subscribe(
      (data:any) => {
         
        if(data && data._body){
            // if(this.contentType=="JSON"){ 
             
                // if(this.contentType=="JSON"){ }
                // else if(this.contentType=="XML"){  this.testApiresponse=data._body;}
                this.testApiresponse=JSON.parse(data._body);
                console.log(this.testApiresponse)
 
            if (this.testApiresponse.message == null){
              this.invalidApiKey = true;
            }else{
              this.invalidApiKey = false;
            }
            // }
 
            // else if(this.contentType=="XML"){  this.testApiresponse=data._body;}
           
            console.log(this.testApiresponse)
           this.tesAPiSuccesufulResponse=this.testApiresponse.Success
           this.createTransactionHistory;
          }
           this.spinnerService.hide();
        },
        err => {
          console.log('err', err);
          this.testApiresponse= err;
         // this.router.navigate(['error']);
        },);
      }
  //=================================== 
    else{
    this.serviceForXMLjson.subscribe(
      (data:any) => {
         
          if(data && data._body){
            if(this.contentType=="JSON"){ this.testApiresponse=JSON.parse(data._body);}
            else if(this.contentType=="XML"){ 
               this.testApiresponse=data._body;
            //   let temp =this.formatXML(data._body.replace(/['"]+/g, '')," ");
              // this.testApiresponse = temp.replace(/["']+/g, '')
              }
           
            console.log(this.testApiresponse)
           this.tesAPiSuccesufulResponse=this.testApiresponse.Success
           this.createTransactionHistory;
          }
           this.spinnerService.hide();
        },
        err => {
          console.log('err', err);
          this.testApiresponse= err;
         // this.router.navigate(['error']);
        },
    );
  
   }}

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
  
  
  @HostListener('document:click', ['$event']) clickout(event) {
    // Click outside of the menu was detected
  }
  
  handleTableClick(event: Event) {
    alert("h")
    event.stopPropagation(); // Stop the propagation to prevent reaching document
  }
  
  getReqRes(e,i){
    console.log(e,e.target)
    this.testApiReqData=[];
    this.testApiResData=[];
    this.testApiResID=[];
    this.testApiResName =[];
    this.testApiresponse="";
    this.clickedTestCaseID=e.target.parentNode.getAttribute("id");
    this.testCaseDescription=e.target.parentNode.getAttribute("testCaseDescription");

    console.log(e.target.parentNode.getAttribute("id"))
   
    console.log(e.target.parentNode.getAttribute("requestpacket"))
    console.log(e.target.parentNode.getAttribute("responsePacket"))

    console.log("================================")
    this.testApiReqData.push(e.target.parentNode.getAttribute("requestpacket"));
    //this.testApiResData.push(e.target.parentNode.getAttribute("responsePacket"));
    this.testApiResID.push(e.target.parentNode.getAttribute("id"))
    this.populateRes =e.target.parentNode.getAttribute("responsePacket")
    this.testApiResName.push(e.target.parentNode.getAttribute("name"))

    console.log( this.testApiReqData,e.target.parentNode.getAttribute("id"))
    console.log( this.testApiResData,e.target.parentNode.getAttribute("name"))

    this.populateRes=e.target.parentNode.getAttribute("responsePacket");

  }
  onSubmit(form:NgForm){
    // this.getVal() ;

    // this.getVal() ;


    if(form.controls.storeValue.value!=form.controls.value.value){
      this.key1=false;
      console.log(form.controls.storeValue.value!=form.controls.value.value,this.key1,+"yes rched")
    }
    else{
      this.key1=true;
      console.log("rchd inside true")
    }
    if(form.controls.store_priority_value.value!=form.controls.priority_value.value){
      this.key2=false;
      console.log(form.controls.store_priority_value.value,form.controls.priority_value.value,this.key2,+"yes rched")
    }else{
      this.key2=true;
      console.log("rchd inside  key true")
    
    
    }
    
        console.log(form.value.store_priority_value)
        console.log(form.controls.priority_value.value)
        console.log(form.controls.storeValue.value)
    this.store_priority_value=form.value.store_priority_value;
    this.priority_value=form.controls.priority_value.value;
    this.storeValue=form.controls.storeValue.value;
        console.log(form.controls.value.value)
    
        
        console.log(form.value)
  }    
  GetTestCases(_reqJson,headers){
 headers = new Headers({
  "Content-Type": "application/x-www-form-urlencoded",
  "token" : localStorage.getItem("jwt"),
  "username" :localStorage.getItem("username"),
});
console.log(headers)
   // this.adm.getTestCases(_reqJson,headers).subscribe(
    this.adm.getTestCases(_reqJson).subscribe(

      (data:any) => {
          console.log(JSON.parse(JSON.stringify(data)));
          if(data && data._body){
             this.testApiresponseFor601=JSON.parse(data._body);//response based on selection of testcases
            console.log(this.testApiresponseFor601)
          }
        },

        err => {
          console.log('err', err);

          // let testcasesStatic =[
          //   {
          //     "testCaseId": "1464-1",
          //     "testCaseName": "Invalid BC",
          //     "apiId": "1464",
          //     "requestPacket": "{\n\"transRefNo\": \"134255\",\n\"passCode\": \"3f4dbbdad1a241bca994339c0d3f3efd\",\n\"bcID\": \"IBCFli00044\",\n\"recon360\":\"N\",\n \"date\":\"02/16/2021\"\n}\n",
          //     "responsePacket": "{\n    \"ImpsResponse\": {\n        \"ActCode\": 901,\n        \"Response\": \"Invalid BC\",\n        \"BankRRN\": {},\n        \"BeneName\": {},\n        \"PaymentRef\": {},\n        \"TranDateTime\": {},\n        \"Amount\": {},\n        \"BeneMMID\": {},\n        \"BeneMobile\": {},\n        \"BeneAccNo\": {},\n        \"BeneIFSC\": {},\n        \"RemMobile\": {},\n        \"RemName\": {},\n        \"RetailerCode\": {}\n    }\n}",
          //     "testCaseDescription": "Client will enter Invalid BC ID or passcode"
          //   },
          //   {
          //     "testCaseId": "1464-2",
          //     "testCaseName": "Transaction not found",
          //     "apiId": "1464",
          //     "requestPacket": "{\n\"transRefNo\": \"134255\",\n\"passCode\": \"447c4524c9074b8c97e3a3c40ca7458d\",\n\"bcID\": \"IBCKer00055\",\n\"recon360\":\"N\",\n \"date\":\"02/16/2021\"\n}\n",
          //     "responsePacket": "{\n    \"ImpsResponse\": {\n        \"ActCode\": 17,\n        \"Response\": \"Transaction not found\",\n        \"BankRRN\": {},\n        \"BeneName\": {},\n        \"PaymentRef\": {},\n        \"TranDateTime\": {},\n        \"Amount\": {},\n        \"BeneMMID\": {},\n        \"BeneMobile\": {},\n        \"BeneAccNo\": {},\n        \"BeneIFSC\": {},\n        \"RemMobile\": {},\n        \"RemName\": {},\n        \"RetailerCode\": {}\n    }\n}",
          //     "testCaseDescription": "Client will enter invalid tranrefno"
          //   },
          //   {
          //     "testCaseId": "1464-3",
          //     "testCaseName": "Success",
          //     "apiId": "1464",
          //     "requestPacket": "{\n    \"date\" : \"02/22/2021\",\n    \"recon360\" : \"N\",\n     \"rrn\":\"003813455317\",\n     \"transRefNo\":\"qwerdtyu1ssfd\",\n     \"passCode\":\"3f4dbbdad1a241bca994339c0d3f3efd\",\n     \"bcID\":\"IBCFli00044\"\n}",
          //     "responsePacket": "{ \n    \"ImpsResponse\": { \n        \"ActCode\": 0, \n        \"Response\": \"Transaction Successful\", \n        \"BankRRN\": 105411965700, \n        \"BeneName\": \"BENE CUSTOMER NAME\", \n        \"PaymentRef\": \"FTTransferP2A\", \n        \"TranDateTime\": \"23-02-2021 11:10:33\", \n        \"Amount\": 1, \n        \"BeneMMID\": 9002001, \n        \"BeneMobile\": {}, \n        \"BeneAccNo\": \"00170000004\", \n        \"BeneIFSC\": \"SBIN0003060\", \n        \"RemMobile\": 9999999999, \n        \"RemName\": \"3J3TVTKAHL73LGAW9LRWFQM17PAEA42366A\", \n        \"RetailerCode\": \"rcode\" \n    } \n} ",
          //     "testCaseDescription": "client enters valid tranrefno used while making payment"
          //   }
          // ];
          //  this.testApiresponseFor601=testcasesStatic;//response based on selection of testcases
           console.log(this.testApiresponseFor601)
        },

    );

   }
   createTrnxnHistory(body,header){
        // this.createTranscationHistory(body)
        this.adm.createTranscationHistory(body,header).subscribe(
          (data:any) => {
              console.log(JSON.parse(JSON.stringify(data)));
              // this.modalRef = this.modalService.show(this.Prodconfirm, {
              //   backdrop: "static"
              // });
              let callbackResponse="Your callback response is captured sucessfully"
              // this.confirmMsgProd = res.jiraId;
  //  this.modalRef ;
    // this.openModalcallbackURL(this.Prodconfirm) 

            },
            err => {
              let callbackResponse="Failed"

              console.log('err', err);
             // this.router.navigate(['error']);
            },
    
        );

   }
  // onValueChange(value:string):void{
  //   console.log(value);
  //   if($('input[id=value]').val()!= $('input[id=storeValue]').val()){
  //     console.log("1 has changes the prefilled value")
  //     this.onchnageKeyValue=true;
     
  //  //   $("#headerError1").removeAttr("hidden");
  //   }
  //    else{
  //      this.onchnageKeyValue=false;
  //      console.log("value hasnot been changed")
  //     $("#headerError1").attr("hidden",true);
  //   //  $("#headerError2").attr("hidden",true);
       
  //    }
  // }
  // onPriorityValueChange(value:string):void{
  //   console.log(value);
  //   if($('input[id=priority_value]').length  && $('input[id=priority_value]').val()!= $('input[id=store_priority_value]').val()){
  //     console.log("2 has changes the prefilled value")
  //   //  $("#headerError2").removeAttr("hidden");
  //     this.onchangePriorityValue=true;
  //   }
  //    else{
  //      console.log("value hasnot been changed")
  //   //  $("#headerError1").attr("hidden",true);
  //     //$("#headerError2").attr("hidden",true);
  //     this.onchangePriorityValue=true
  //   }
     
  // }
  
  onSubmitBody(form:NgForm){

  
    console.log(this.testApiReqData, this.testApiReqData.length)
    console.log(form.controls.Request.value)
    this.storeRequestValue=form.controls.Request.value;

    this.contentType=form.value.type;
    this.testApiResData=[];
    if(this.testApiReqData.length>0){
      this.testApiResData.push(this.populateRes);
    }
    console.log(this.testApiResID, this.testApiResData.length)
   
    console.log(form.value)
  
    console.log(form.controls)
 
    //  this.testApiCall();
    // console.log(form.value);
    // new line of code 25/Sep/2020
    console.log($('input[id=value]').val(),$('textarea[id=req1]').val(),$('input[id=req1Compare]').val(),$('textarea[id=req2]').val())
     if($('input[id=value]').val()!= $('input[id=storeValue]').val()){
      console.log("1 has changes the prefilled value")
      $("#headerError1").removeAttr("hidden");
      

     }else{
      $("#headerError1").attr("hidden",true);

     }
      if($('input[id=priority_value]').length  && $('input[id=priority_value]').val()!= $('input[id=store_priority_value]').val()){
      console.log("2 has changes the prefilled value")
      $("#headerError2").removeAttr("hidden");
     }
    
     else{
       console.log("value hasnot been changed")
      $("#headerError2").attr("hidden",true);


       this.testApiCall(form.controls.Request.value);
     }
     if($('input[id=value]').length ==""){
      $("#headerError4").removeAttr("hidden");
    }else{
      $("#headerError4").attr("hidden",true);

     }
    //  else if($('textarea[id=req1]').length  && $('textarea[id=req1]').val()!= $('input[id=req1Compare]').val()){
    //   console.log("3 has changes the prefilled value")
    //  }
    //  else if($('textarea[id=req2]').length  && $('textarea[id=req2]').val()!= $('input[id=req2Compare]').val()){
    //   console.log("4 has changes the prefilled value")
    //  }
  }
 
  createTransactionHistory(form:NgForm){
    this.contentType=form.value.type;
    console.log(form.value.Response)
    console.log(form.controls.priority_value.value)

    let _reqJson = {apiId : this.idForClickedTab };
   // this.GetTestCases(_reqJson,Headers)
   console.log(_reqJson)
    let header = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "token" : localStorage.getItem("jwt"),
      "username" :localStorage.getItem("username"),
    });
    // headers1,cType,reqBody,resBody,apiId,
    if(this.testApiResID.length>0){
      form.controls.Response.setValue(this.testApiResData)
   console.log("form.controls.Request.valueform.controls.Request.valueform.controls.Request.value",form.controls.Request.value)


      console.log(this.testApiResData,form.value.Request,form.value.Response)
      let inputType={
        
      }
     
       let formData = new URLSearchParams();
      formData.set("headers","application/json");
      formData.set("cType","json")
      formData.set("reqBody",form.value.Request)
      formData.set("resBody",form.controls.Response.value)
      formData.set("apiId",this.idForClickedTab)
      formData.set("testCaseId","601")
      formData.set("testCaseStatus","5")
      formData.set("Token",localStorage.getItem("jwt"))
      formData.set("userName",localStorage.getItem("username"))
      formData.set("apiName","QR Code")
// console.log("yes created")
      this.createTrnxnHistory(formData.toString(),header);

    }else{}
   
  //  console.log( this.GetTestCases(_reqJson,Headers));
   
  }
 /*  downloadAPIdocument(path){

    this.adm.downloadFromURL(path).subscribe((data: any) => {
      console.log(data);
    },
    err => {
      console.log('err', err);
     
    });
  } */
  downloadAPIdocument(path) {
    
    let dwldLink = document.createElement("a");
    
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1;
    if (isSafariBrowser) {
      dwldLink.setAttribute("target", "_blank");
    }

   
    dwldLink.setAttribute("href", path);
    //dwldLink.setAttribute("download", fileName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  } 
  
}
