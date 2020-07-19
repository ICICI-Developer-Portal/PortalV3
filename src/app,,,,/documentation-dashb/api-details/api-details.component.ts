import { Component, OnInit, TemplateRef, Pipe, ɵConsole } from '@angular/core';
import { LoginService } from 'src/app/services';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
})
@Pipe({ name: 'safe' })


export class ApiDetailsComponent implements OnInit {
  ApiDomain: any;
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
  constructor(private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,private adm:LoginService,private ngxXml2jsonService: NgxXml2jsonService,private modalService: BsModalService,private sanitizer:DomSanitizer,
    private router: Router,
    ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.NewApplication();
      this.spinnerService.show();
      this.Sample_packet();
      this.isactive_class1 = true;
      this.isactive_class2 = false;
      this.isactive_class3 = false;
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
     $('ul.toggleTabs li').removeClass('active');
    $('ul.toggleTabs li a').removeClass('active');
    $('ul.toggleTabs li a').removeClass('show');
    $('ul.toggleTabs li:first').addClass('active');
    $('ul.toggleTabs li:first a').addClass('active show');


    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane').removeClass('show');
    $('#pills-List-Customer-Accounts-tab').next().find('.tab-pane:first').addClass('show');

    
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
        var obj=JSON.parse(response);
        this.ApiDomain =obj.ApiData.ApiDomain;
        this.ApiName =obj.ApiData.ApiName;
        this.ApiDesc =obj.ApiData.ApiDesc;
        this.SandboxUrl ="https://sandbox.icicibank.com/documentation/"+obj.ApiData.SandboxUrl;
        this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.SandboxUrl);
        this.reqDetails =obj.ReqParam;
        this.resDetails =obj.ResParam;
        this.spinnerService.hide();

      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
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
      this.router.navigate(['error']);
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
  
  


}
