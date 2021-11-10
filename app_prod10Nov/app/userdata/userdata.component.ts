import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Toast, ToasterService } from 'angular2-toaster';
// import { DataTableResource } from 'angular7-data-table';
import { LoginService } from 'src/app/services';


@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  
  userForm: FormGroup;
  userForm1: FormGroup;
  userForm2: FormGroup;
  userForm3: FormGroup;
  userForm4: FormGroup;
  userForm5: FormGroup;
  userForm6: FormGroup;
  userForm7: FormGroup;
  Merchant_user: any = false;
  API_Sample_packet: any = false;
  ADD_Parameters_Table: any = false;
  API_REQ_PARAMETER_Table: any = false;
  API_RES_PARAMETER_Table: any = false;
  TEST_CASE : any= false;
  API_DETAIL : any=false;
  tableName : any = "MERCHANT_USER";
  data : any = {
	"username": "arunbala_rai",
	"merchant":"CashPay"
	}
	

  @ViewChild('modalClose') modalClose:ElementRef;
  //Static data, you can change as per your need
  persons: any[] = [
		{"id": "1", "merchantname": "CD ", "username": "chetan"},
		{"id": "2", "merchantname": "RazorPay ", "username": "apitesting@2"},
		{"id": "3", "merchantname": "SafeGold ", "username": "nitinthard"},
		{"id": "4", "merchantname": "Safexpay ", "username": "deepaknair.17"},
	   
	    
	];
	// itemResource = new DataTableResource(this.persons);
	items = [];
	itemCount = 0;
	params = {offset: 0, limit: 10}; //Static can be changed as per your need
	formFlag = 'add';
	tableList : any[] = ["MERCHANT_USER","API_SAMPLE_PACKET","ADD_PARAMETERS_TABLE","API_REQ_PARAMETER","API_RES_PARAMETER","TEST_CASE","API_DETAIL"];

    constructor(
		private adm: LoginService,
    private toasterService: ToasterService,
	){
    //   this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems(this.params);
    }  

    reloadItems(params) {
    //   this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:
    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.merchantname);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.merchantname);
    }

	rowTooltip(item) { return item.username; }

	//Init method
	ngOnInit(){

		//init MERCHANT_USER
		this.userForm = new FormGroup({
		  'id': new FormControl(null),
		  'merchantname': new FormControl(null, Validators.required),
		  'username': new FormControl(null, Validators.required)
		});

		this.userForm1 = new FormGroup({
			'id': new FormControl(null),
			'packetID': new FormControl(null, Validators.required),
			'apiID': new FormControl(null, Validators.required),			
			'samplerequest': new FormControl(null, Validators.required),

		  });

		  this.userForm2 = new FormGroup({
			'id': new FormControl(null),
			'apiID': new FormControl(null, Validators.required),
			'fieldname': new FormControl(null, Validators.required),			
			'apiname': new FormControl(null, Validators.required),

		  });

		  this.userForm3 = new FormGroup({
			'id': new FormControl(null),
			'reqID': new FormControl(null, Validators.required),
			'apiID': new FormControl(null, Validators.required),			
			'reqName': new FormControl(null, Validators.required),
			'reqType': new FormControl(null, Validators.required),
			'reqDesc': new FormControl(null, Validators.required),
			'reqMand': new FormControl(null, Validators.required)

		  });

		  this.userForm4 = new FormGroup({
			'id': new FormControl(null),
			'reqID': new FormControl(null, Validators.required),
			'apiID': new FormControl(null, Validators.required),			
			'reqName': new FormControl(null, Validators.required),
			'reqType': new FormControl(null, Validators.required),
			'reqDesc': new FormControl(null, Validators.required),
			'reqMand': new FormControl(null, Validators.required)

		  });

		  this.userForm5 = new FormGroup({
			'id': new FormControl(null),
			'respID': new FormControl(null, Validators.required),
			'apiID': new FormControl(null, Validators.required),			
			'respName': new FormControl(null, Validators.required),
			'respDesc': new FormControl(null, Validators.required),
			'respType': new FormControl(null, Validators.required),

		  });

		  this.userForm6 = new FormGroup({
			'id': new FormControl(null),
			'testcaseId': new FormControl(null, Validators.required),
			'testcaseName': new FormControl(null, Validators.required),			
			'requestpacket': new FormControl(null, Validators.required),
			'responsepacket': new FormControl(null, Validators.required),
			'testcaseDesc': new FormControl(null, Validators.required),

		  });

		  this.userForm7 = new FormGroup({
			'id': new FormControl(null),
			'apiID': new FormControl(null, Validators.required),
			'apiDomain': new FormControl(null, Validators.required),			
			'apiName': new FormControl(null, Validators.required),
			'apiDesc': new FormControl(null, Validators.required),
			'apisubDomain': new FormControl(null, Validators.required),
			'sandboxUrl': new FormControl(null, Validators.required),
			'apiLevel': new FormControl(null, Validators.required),
			'errorCode': new FormControl(null, Validators.required),

		  });
		
	}

	initUser(){
		//User form reset
		this.userForm.reset();
		this.formFlag = 'add';
	}
	//Save user's data
	saveUser(){
		if(this.formFlag == 'add')
		{
			this.userForm.value.id= this.persons.length + 1;
			this.persons.unshift(this.userForm.value);
		}
		else
		{
			var index = this.persons.findIndex(x => x.id== this.userForm.value.id);
			if (index !== -1) {
			  this.persons[index] = this.userForm.value;
			}
		}
		this.db_Access();
		this.reloadTableManually();
		//Close modal
		this.modalClose.nativeElement.click();
		//User form reset
		this.userForm.reset();
	}
	//Get data while edit
	getData(item)
	{
		this.userForm.patchValue(item);
		this.formFlag = 'edit';
	}
	//Delete user's data
	delData(item){
		this.persons.splice(this.persons.indexOf(item), 1);
		this.reloadTableManually();
	}
	//Reload table manually after add/edit
	reloadTableManually(){
		this.reloadItems(this.params);
		// this.itemResource.count().then(count => this.itemCount = count);
	}
	changeTableName(val){

		console.log(val);
		
		if(val === "MERCHANT_USER"){
			this.Merchant_user= true;			
			this.API_Sample_packet  = false;
			this.ADD_Parameters_Table  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = false;
			this.API_DETAIL=false;

		} else if(val === "API_SAMPLE_PACKET"){
			this.API_Sample_packet= true;

			this.Merchant_user= false;
			this.ADD_Parameters_Table  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = false;
			this.API_DETAIL=false;


		}else if(val === "ADD_PARAMETERS_TABLE"){
			this.ADD_Parameters_Table= true;

			this.Merchant_user= false;
			this.API_Sample_packet  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = false;
			this.API_DETAIL=false;

		}else if(val === "API_REQ_PARAMETER"){
			this.API_REQ_PARAMETER_Table= true;

			this.Merchant_user= false;
			this.API_Sample_packet  = false;
			this.ADD_Parameters_Table  = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = false;
			this.API_DETAIL=false;
		}else if(val === "API_RES_PARAMETER"){
			this.API_RES_PARAMETER_Table= true;
			this.Merchant_user= false;
			this.API_Sample_packet  = false;
			this.ADD_Parameters_Table  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.TEST_CASE = false;
			this.API_DETAIL=false;
		}else if(val === "TEST_CASE"){
			this.Merchant_user= false;
			this.API_Sample_packet  = false;
			this.ADD_Parameters_Table  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = true;
			this.API_DETAIL=false;
		}else if(val === "API_DETAIL"){
			this.Merchant_user= false;
			this.API_Sample_packet  = false;
			this.ADD_Parameters_Table  = false;
			this.API_REQ_PARAMETER_Table = false;
			this.API_RES_PARAMETER_Table  = false;
			this.TEST_CASE = false;
			this.API_DETAIL=true;
		}
	}

	db_Access(){

		let req = {
			"tableName":this.tableName,
			"Operation":"INSERT",
			"data":this.data
		}
		
		this.adm.dbAccess(req).subscribe((data: any) => {
			var response = data._body;
	  
			var obj = JSON.parse(response);
			console.log(obj.message);
			
		  },
		  err => {
			console.log('err', err);
		   // this.router.navigate(['error']);
			this.toastrmsg('error',"Something went wrong. Please try again in some time.");
			
		  },);

	}
	toastrmsg(type, title) {
		var toast: Toast = {
		  type: type,
		  showCloseButton: true,
		  title: "",
		  body: title
		  
		};
		this.toasterService.pop(toast);
	  }
}
