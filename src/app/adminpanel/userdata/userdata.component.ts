import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataTableResource } from 'angular7-data-table';


@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  
  userForm: FormGroup;
  @ViewChild('modalClose') modalClose:ElementRef;
  //Static data, you can change as per your need
  persons: any[] = [
		{"id": "1", "merchantname": "CD ", "username": "chetan"},
		{"id": "2", "merchantname": "RazorPay ", "username": "apitesting@2"},
		{"id": "3", "merchantname": "SafeGold ", "username": "nitinthard"},
		{"id": "4", "merchantname": "Safexpay ", "username": "deepaknair.17"},
	   
	    
	];
	itemResource = new DataTableResource(this.persons);
	items = [];
	itemCount = 0;
	params = {offset: 0, limit: 10}; //Static can be changed as per your need
	formFlag = 'add';

    constructor(){
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems(this.params);
    }  

    reloadItems(params) {
      this.itemResource.query(params).then(items => this.items = items);
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
		this.userForm = new FormGroup({
		  'id': new FormControl(null),
		  'merchantname': new FormControl(null, Validators.required),
		  'username': new FormControl(null, Validators.required)
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
		this.itemResource.count().then(count => this.itemCount = count);
	}
}
