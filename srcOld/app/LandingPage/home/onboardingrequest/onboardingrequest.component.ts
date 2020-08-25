import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { ToasterService, Toast } from 'angular2-toaster';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-onboardingrequest',
  templateUrl: './onboardingrequest.component.html',
  //styleUrls: ['./onboardingrequest.component.css']
})
export class OnboardingrequestComponent implements OnInit {
  imageSrc;
  sellersPermitFile: any;
  //base64s
  sellersPermitString: string;
  onboardForm:FormGroup
  finalJson = {};
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  currentId: number = 0;
  dropdownList:any=[];

  constructor(private HttpClient:HttpClient,private formbuilder:FormBuilder,private router:Router, private adm:LoginService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.onboardForm=this.formbuilder.group({
      freeText1 :["",[Validators.required]],
      freeText2 :["",[Validators.required]],
      freeText3 :["",[Validators.required]],
      freeText4 :["",[Validators.required]],
      freeText5 :["",[Validators.required]],
      freeText6 :["",[Validators.required]],
      file1 :["",[Validators.required]],
      spoc :["",[Validators.required, Validators.email]],
    })
  }

  get freeText1() { return this.onboardForm.get('freeText1'); }
  get freeText2() { return this.onboardForm.get('freeText2'); }
  get freeText3() { return this.onboardForm.get('freeText3'); }
  get freeText4() { return this.onboardForm.get('freeText4'); }
  get freeText5() { return this.onboardForm.get('freeText5'); }
  get freeText6() { return this.onboardForm.get('freeText5'); }
  get file1() { return this.onboardForm.get('file1'); }
  get spoc() { return this.onboardForm.get('spoc'); }

  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

  // Base 64 Image uploader

  public picked(event) {
    //this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.sellersPermitFile = file;
        this.handleInputChange(file)
    }
  }

  handleInputChange(files) {
    var file = files;
    //var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   this.toastrmsg('error', "Invalid Format.");
    //   return;
    // }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.imageSrc = base64result;
    localStorage.setItem('Imagepath', this.imageSrc) 
  }
  
  Save_merchantonboarding(){ 
    
    let input = new FormData();

    const formData = new FormData(); 
    // Add your values in here
    formData.append('freeText1', this.onboardForm.get('freeText1').value );
    formData.append('freeText2', this.onboardForm.get('freeText2').value );
    formData.append('freeText3', this.onboardForm.get('freeText3').value );
     formData.append('spoc', this.onboardForm.get('spoc').value );
    formData.append('freeText4', this.onboardForm.get('freeText4').value );
    formData.append('freeText5', this.onboardForm.get('freeText5').value );
    formData.append('freeText6', this.onboardForm.get('freeText6').value );
   // formData.append('file1', this.onboardForm.get('file1').value );

    let a:any= (<HTMLInputElement>document.getElementById('file1')).files;
    for (let k = 0; k < a.length; k++) {
      //for(let k in a)
      //{
        console.log('ak',a[k]);

        formData.append('file1', a[k] );
        //this.images.push({'files':i,title:t});
      }

   
    console.log(formData);
   this.HttpClient.post<any>('https://developerapi.icicibank.com:8443/api/v1/jira', formData).subscribe(
     (res) => console.log(res),
     (err) => console.log(err)
   );

    this.adm.Merchant_onboarding(formData).subscribe(
       (data:any) => {         
        console.log(data._body);
         var response= data._body;    
          this.toastrmsg('success', "Successfully Create jira Account.");
       },
       err => {
         console.log('err', err);
         this.router.navigate(['error']);
       },   
    );
  }
}

