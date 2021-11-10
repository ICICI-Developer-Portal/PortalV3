import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from "@angular/router";
import { LoginService } from "src/app/services";
import * as CryptoJS from 'crypto-js';
declare var $: any;
@Component({
  selector: 'app-new-landing-page',
  templateUrl: './new-landing-page.component.html',
  styleUrls: ['./new-landing-page.component.css'],
  providers: [DatePipe]
})
export class NewLandingPageComponent implements OnInit {

  Inter_full_name: String = "";
  Inter_email: String = "";
  Inter_contactnumber: String = "";
  Inter_location: String = "";
  Inter_company: String = "";
  Inter_requirements: String = "";
  otp_code: String = "";
  submitSucces:boolean = false;
  sent_otp:boolean = false;
  otp_invalid:boolean = false;
  otp_valid:boolean = false;
  otp_txt_id: any = "";

  constructor(
     private router: Router,
    private adm: LoginService,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
//SLIDER
$(document).ready(function() {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    margin: 20,
  autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
  autoHeight:true,
    nav: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 3
      },
      1280: {
        items: 4
      }
    }
  })
})
$('#recipeCarousel').carousel({
  interval: 100000000
})

$('.carousel .carousel-item').each(function(){
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<minPerSlide;i++) {
        next=next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        
        next.children(':first-child').clone().appendTo($(this));
      }
});


//FORM VALIDATION
$(document).ready(function() {
$(function(){
$.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Alphabets only");	  
$.validator.addMethod("startw", function(value, element) {      
return this.optional(element) || /^[6-9][0-9]*$/i.test(value); 
}, "Number should start with 6, 7, 8 or 9");
$.validator.addMethod("valEmail", function(value, element) {
    // allow any non-whitespace characters as the host part
    return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:\S{1,63})$/.test( value );
    },"Please enter valid email id");

$("#contact_form").validate({
    errorElement: 'b',
    onfocusout: function(e) {
      this.element(e);
    },
    errorClass: 'help-block',
      rules:{
        name:{required: true, lettersonly: true},
        mobile:{required: true, startw:true,minlength:10,  maxlength:10, },
        email:{ required:true, valEmail:true},

      },
      messages:{
        name:{ required: 'First Name is required.', lettersonly: 'Alphabets only'},
        mobile:{ required: 'Mobile is required.',  minlength: '10 digit number only', maxlength: '10 digit number only' },
        email:{ required: 'Please enter valid email id'},
      }
    });
});
/* END */
});

//FORM
$('.formSec .mobile_f').find('input').on('input', function (e) {
  $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
});

  }
  goToSignup(){
  if(this.Inter_full_name != "" && (this.Inter_email != "" || this.Inter_contactnumber != "" )){
    var feedback =
      "User Interested Full Name = " +
      this.Inter_full_name +
      " Contact Number =" +
      this.Inter_contactnumber;
    var json = {
      fullName: this.Inter_full_name,
      email: this.Inter_email,
      mobile: this.Inter_contactnumber,
      location: this.Inter_location,
      company: this.Inter_company,
      requirements: this.Inter_requirements,
      feedbackIn: feedback
    };
    console.log("josn", json);
    this.adm.feedback(json).subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      if (obj.status == true) {
     console.log("success, Thank your for your Request.");
        this.Inter_full_name = "";
        this.Inter_contactnumber = "";
        this.Inter_email = "";
        this.Inter_location = "";
        this.Inter_company = "";
        this.Inter_requirements = "";
        this.otp_code = "";
        this.submitSucces = true;
        this.router.navigate(['signUpPage']);
      } else {
        console.log("error" + obj.message);
        this.router.navigate(['signUpPage']);
      }
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
     this.router.navigate(['signUpPage']);
    },);
  }else{
    this.router.navigate(['signUpPage']);
  }
    
    
  }
  
  inter_submit() {

  /*   if(this.Inter_contactnumber !="" && !this.otp_valid){

        this.SendOtp()

    }else if(this.otp_valid){ */
      var feedback =
      "User Interested Full Name = " +
      this.Inter_full_name +
      " Contact Number =" +
      this.Inter_contactnumber;
    var json = {
      fullName: this.Inter_full_name,
      email: this.Inter_email,
      mobile: this.Inter_contactnumber,
      location: this.Inter_location,
      company: this.Inter_company,
      requirements: this.Inter_requirements,
      feedbackIn: feedback
    };
    console.log("josn", json);
    this.adm.feedback(json).subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      if (obj.status == true) {
      // alert("success, Thank your for your Request.");
        this.Inter_full_name = "";
        this.Inter_contactnumber = "";
        this.Inter_email = "";
        this.Inter_location = "";
        this.Inter_company = "";
        this.Inter_requirements = "";
        this.otp_code = "";
        this.submitSucces = true;
      } else {
        alert("error" + obj.message);
      }
    },
    err => {
      console.log('err', err);
     // this.router.navigate(['error']);
      alert("error, Something went wrong, try again in sometimes");
    },);
    
    
    /* }else{
      alert("Invalid mobile number");
    } */
  
   
  }

  SendOtp() {
    
    try {
     
      var json = {
        mobile_no: this.Inter_contactnumber
      };
     
      this.adm.SendOTP(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == true) {
          this.otp_txt_id = obj.data;
          this.sent_otp = true;
        } else {
          this.otp_invalid = true;
        }
      },
      err => {
        console.log('err', err);
        this.otp_invalid = true;
        //this.router.navigate(['error']);
       // this.toastrmsg('error',this.errorMsg);
      },);
    } catch { }
  }
  verifyOtp1() {

    let data =
    {
      email: this.Inter_email,
      mobile_no: this.Inter_contactnumber,
      otp_code: this.otp_code
    }
    try {
      this.adm
        .verify_otpCopy(data, this.otp_txt_id)
        .subscribe((data: any) => {
          console.log("otp verification section");
          var response = data._body;
          var obj = JSON.parse(response);
          obj = this.decode(obj.data);
          obj = JSON.parse(obj);
          if (obj.status == true) {
           this.otp_valid = true;
           this.sent_otp = false;
          } else {
            this.otp_valid = false;
          }
        },
        err => {
          console.log('err', err);
          this.otp_valid = false;
        //  this.router.navigate(['error']);
        //  this.toastrmsg('error',this.errorMsg);
        },);
    } catch { }
  }
  decode(val){
 
    // Decryption process
    var key = 'ICICI#~#';
    key += this.datepipe.transform(Date.now(),'ddMMyyyy');
  
    var encryptedBase64Key=btoa(key); //base64encryption
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
  
    var encryptedCipherText = val ; // or encryptedData;
    var decryptedData = CryptoJS.AES.decrypt( encryptedCipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    } );
    var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
    return decryptedText
  
  }
  
}
