import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, TabHeadingDirective } from 'ngx-bootstrap';
import { LoginService } from 'src/app/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  //styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef1:BsModalRef;
  modalRef2: BsModalRef;
  appList: any;
  applicationdata: any;
  authType: any;
  authTypeVal:any='';
  filter : any = "";
  p : any = "";
  ApiInfoForm: FormGroup;
  AuthForm:FormGroup;
  searchText;
  platform:any;
  auth_type:any
  
  shfrmSFFirst: boolean =  false;
  shfrmSFSecond: boolean = false;
  shfrmSFThird: boolean = false;

  // dropdownlist
  @ViewChild('multiSelect') multiSelect;
  public loadContent: boolean = false;
   public ApiManageForm: FormGroup;
  public name = 'Cricketers';
  public data = [];
  public settings = {};
  public selectedItems = [];
  apis = [];
  applicationdata1: any;
  authType1: any;
  data1: [];
  title: any;
  description1:any;
  call_back_url1: any;
  scope1: any;
  title1: any;
  listselected: any[];

  constructor(private toasterService: ToasterService ,private router:Router,private formbuilder: FormBuilder,private modalService: BsModalService, private adm:LoginService) {
    this.GetApplList();
    this.NewApplication();
    // var json={ 
    //   "id": localStorage.getItem('id'),
    //   "app_id":"0"
    // }
    // this.AddApplication(json);
    this.adm.check_user_log();
   }

  ngOnInit() {
   
    // FormGroup start here
    this.ApiInfoForm=this.formbuilder.group({
      platform_name:[""],
      description:["",[Validators.required]],
      app_name:["",[Validators.required]],
    })

    this.ApiManageForm=this.formbuilder.group({
      apis:["",[Validators.required]],
    })
    this.AuthForm=this.formbuilder.group({
      call_back_url:[""],
      // auth_type:["",[Validators.required]],
      scope:["",[Validators.required]],
    })

    this.settings = {
      singleSelection: false,
      idField: 'key',
      textField:'name',
      selector:'selected',
      enableCheckAll: true,
      selectAllText: 'Choose All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No data available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
  

    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;

  }

  get app_name() { return this.ApiInfoForm.get('app_name'); }
  // get platform_name() { return this.ApiInfoForm.get('platform_name'); }
  get descriptiondata() { return this.ApiInfoForm.get('description'); }

  get apis1() { return this.ApiInfoForm.get('apis'); }

  get call_back_url() { return this.AuthForm.get('call_back_url'); }
  // get auth_type() { return this.AuthForm.get('auth_type'); }
  get scope() { return this.AuthForm.get('scope'); }

  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:"",
      body: title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }
  
  // dropdownlist function
  public setForm(data) {
    this.ApiManageForm = new FormGroup({
      name: new FormControl(
        data
      )
    });
    this.loadContent = true;
  }

  public onFilterChange(item: any) {

  }
  public onDropDownClose(item: any) {
   
  }

  public onItemSelect(item: any) {
    this.apis.push(item);
   
  }
  public onDeSelect(item: any) {
    for(let j in this.apis){
      if(this.apis[j]['key'] == item['key']){
        this.apis.splice(parseInt(j),1);
        break;
      }
    }
  }

  public onSelectAll(items: any) {
    this.apis = items;
   
  }
  public onDeSelectAll(items: any) {
    this.apis = items;
   
  }
  openModal(addAnApplication: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addAnApplication, { backdrop:'static' });
    this.ApiInfoForm.reset();
    this.ApiManageForm.reset();
    this.AuthForm.reset();
  }

  GetApplList(){ 
        var json={ 
          "id":localStorage.getItem('id'),
          "username": localStorage.getItem('username')
        }
        this.adm.applicationList(json)
      .subscribe(
        (data:any) => {
          var response= data._body;
          var obj=JSON.parse(response);
         
          this.appList =obj.data;
        },
        err => {
          console.log('err', err);
        //  this.router.navigate(['error']);
          this.toastrmsg('error',"Something went wrong. Please try again in some time.");
        },
      );
  }
  App_id:any;
  openModaledit(editapplication: TemplateRef<any>,App_id:any) {
    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;
  
   this.modalRef1 = this.modalService.show(editapplication, { backdrop:'static' });
   localStorage.setItem("App_id",App_id);
   this.App_id=App_id
   var json={ 
     "id": localStorage.getItem('id'),
     "app_id":App_id,
     "username": localStorage.getItem('username')
   }
   this.AddApplication(json); 
 }
  AddApplication(json){
   
      this.adm.add_newApplication(json)
    .subscribe(
      (data:any) => {
        var response= data._body;
        var obj=JSON.parse(response);

         var selected_array = [];
         let dataz:any = [];
        for(let i=0;i< obj.data.apis.length ;i++){
          let kk = {
             key:obj.data.apis[i]['key'],
              name:obj.data.apis[i]['name'],
          };
          if(obj.data.apis[i].selected){
            let objj = {
              key:obj.data.apis[i]['key'],
              name:obj.data.apis[i]['name'],
            }
            selected_array.push(objj); 
          }
          dataz.push(kk);
        }
        
       
        this.listselected=selected_array;
       
        this.applicationdata1 =obj.data.platforms;
        this.authType1 =obj.data.auth_types;
        this.data1 = dataz;//obj.data.apis;
       
        this.setForm(selected_array);
      
        this.ApiInfoForm.controls['app_name'].setValue(obj.data.title);
        this.ApiInfoForm.controls['description'].setValue(obj.data.description);
        this.AuthForm.controls['call_back_url'].setValue(obj.data.call_back_url);

        this.AuthForm.controls['scope'].setValue(obj.data.scope);
     

  

      },
      err => {
        console.log('err', err);
       // this.router.navigate(['error']);
        this.toastrmsg('error',"Something went wrong. Please try again in some time.");
      },
    );
}

 // Add application submit data function

  //  To Create Application 
   NewApplication( ){  
    var json={
      "id": localStorage.getItem('id'), 
      "app_id":"0",
      "username": localStorage.getItem('username')
    }

    this.adm.add_newApplication(json)
  .subscribe(
    (data:any) => {
      var response= data._body;
      var obj=JSON.parse(response);
      this.applicationdata =obj.data.platforms;
      this.authType =obj.data.auth_types;
      this.data =obj.data.apis;
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },
  );
}
// End region

saveAddAppl_Edit(call_back_url:any,scope:any){
  var obj = [];
  for(let i=0;i<this.apis.length;i++){
    obj.push(this.apis[i].key);
  }

  var json={
    "id": localStorage.getItem('id'),
    "app_name":this.ApiInfoForm.value.app_name,
    "description":this.ApiInfoForm.value.description,
    "call_back_url":this.AuthForm.value.call_back_url,
    "platform":  this.platform,
    "scope": this.AuthForm.value.scope,
    "auth_type": this.auth_type,
    "apis":  obj.toString(), 
    //"app_id": this.AuthForm.value.app_id 
    "app_id":this.App_id,
    "username":localStorage.getItem('username')
  }

   this.adm.saveAddAppl(json)
   .subscribe(
     (data:any) => {
       var response= data._body; 
       var obj=JSON.parse(response);
       if(obj.status==true )
       { 
        this.toastrmsg('success', "Successfully Update Application");
        try{
          this.modalRef2.hide();
        }
        catch(e){}
        try{
          this.modalRef1.hide();
        }
        catch(e){}
        try{
          this.modalRef.hide();
        }
        catch(e){}
        this.signup_link(1);
        
        //this.router.navigate(['/application'])
        localStorage.removeItem('description')
        localStorage.removeItem('platform')
        localStorage.removeItem('auth_types')
        localStorage.removeItem('ApplicationData')
        localStorage.removeItem('AppName')
        localStorage.removeItem('App_id')
        this.ApiInfoForm.reset;
        this.AuthForm.reset;
        this.GetApplList();
        this.NewApplication();
       
       }
       else{
        
         //this.toastrmsg('error', "something went wrong");
         //this.modalRef.hide();
         }
        
     },
     err => {
       console.log('err', err);
     //  this.router.navigate(['error']);
       this.toastrmsg('error',"Something went wrong. Please try again in some time.");
     },
       
  );  
//}catch{ }  
}


// To create new application
saveAddAppl(call_back_url:any,scope:any){
    var obj = [];
    for(let i=0;i<this.apis.length;i++){
      obj.push(this.apis[i].key);
    }
  var json={
    "id": localStorage.getItem('id'),
    "app_name":this.ApiInfoForm.value.app_name,
    "description":this.ApiInfoForm.value.description,
    "call_back_url":this.AuthForm.value.call_back_url,
    "platform": this.platform,
    "scope": this.AuthForm.value.scope,
    "auth_type":this.auth_type,
    "apis":  obj.join(", "), 
    "app_id": 0,
    "username":localStorage.getItem('username')
  }
   this.adm.saveAddAppl(json)
   .subscribe(
     (data:any) => {
       var response= data._body; 
       var obj=JSON.parse(response);
       if(obj.status==true )
       { 
        this.toastrmsg('success', "Application Added Successfully");
        //window.location.reload();
        //window.location.replace('/#/application')
        try{
          this.modalRef2.hide();
        }
        catch(e){}
        try{
          this.modalRef1.hide();
        }
        catch(e){}
        try{
          this.modalRef.hide();
        }
        catch(e){}
        this.signup_link(1);        
        //this.router.navigate(['/application'])
        localStorage.removeItem('description')
        localStorage.removeItem('platform')
        localStorage.removeItem('auth_types')
        localStorage.removeItem('ApplicationData')
        localStorage.removeItem('AppName')
        localStorage.removeItem('App_id')
        this.ApiInfoForm.reset;
        this.AuthForm.reset;
        
         this.GetApplList();
    this.NewApplication();
       
       }
       else{
        
         //this.toastrmsg('error', "something went wrong");
         //this.modalRef.hide();
         }
        
     },
     err => {
       console.log('err', err);
     //  this.router.navigate(['error']);
       this.toastrmsg('error',"Something went wrong. Please try again in some time.");
     },
       
  );  
}
// End region

onradiotab1(ss:any)
{
  localStorage.setItem('platform',ss);
  this.platform=ss;

}

onradiotab3(ss1:any)
{
  localStorage.setItem('auth_types',ss1);
 
  this.auth_type=ss1;
}


savetab1(description:any,AppName:any){
  this.signup_link(2);
}

saveTab2(selecteddata:any=[])
{
  var NAMES1='';
  for (let i = 0; i < selecteddata.length; i++) {
   NAMES1=NAMES1+','+selecteddata[i].id
  }
  localStorage.setItem('ApplicationData',NAMES1.substring(1, NAMES1.length - 0));
  this.signup_link(3);
}
// End Region

// delete application service
  
 DeleteApplist(App_id:any)
 {
  if(confirm("Are you sure to delete")) {
    var json={
              //"id": localStorage.getItem('id'), 
              "app_id":App_id,
              "username":localStorage.getItem('username')
            } 
     this.adm.deleteApp(json)
     .subscribe(
       (data:any) => {
         var response= data._body; 
         var obj=JSON.parse(response);
         if(obj.status==true )
         { 
          this.toastrmsg('success', "Application Deleted Successfully");
           this.GetApplList();
    this.NewApplication(); 
         }
         else{
               this.toastrmsg('error', "something went wrong please try again");
             } 
       },
       err => {
         console.log('err', err);
        // this.router.navigate(['error']);
         this.toastrmsg('error',"Something went wrong. Please try again in some time.");
       },
    );  
  } 
 }  
// End Application

signup_link(id){
  if(id == 1){
    this.shfrmSFFirst = true;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = false;
  } else if(id == 2){
     this.shfrmSFFirst = false;
    this.shfrmSFSecond = true;
    this.shfrmSFThird = false;
  } else {
     this.shfrmSFFirst = false;
    this.shfrmSFSecond = false;
    this.shfrmSFThird = true;
  }
  
}


}
