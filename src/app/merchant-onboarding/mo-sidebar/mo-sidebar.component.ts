import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-mo-sidebar',
  templateUrl: './mo-sidebar.component.html',
  styleUrls: ['./mo-sidebar.component.css']
})
export class MoSidebarComponent implements OnInit {
  component:Boolean=true;
  constructor(private router:Router) {
    if(this.router.url == "/dashboard"){
      this.component = false;
    } else{
      this.component = true;
    }
    var check = setTimeout(() => {
      if (this.router.url === "/MerchantOnboarding") {
        $(document).ready(function() {
          
            $(".sideMenu>.nav-pills li.nav-link")
              .removeClass("active")
              .removeClass("openDropdown");

              $(".MerchantOnboarding").addClass('active');
          });
        }else if(this.router.url == "/merchants"){ 
          $(document).ready(function() {
              $(".sideMenu>.nav-pills li.nav-link")
              .removeClass("active")
              .removeClass("openDropdown");

              $(".merchantsList").addClass('active');
            });
            }
            else if(this.router.url == "/ApproveRequest"){ 
              $(document).ready(function() {
                  $(".sideMenu>.nav-pills li.nav-link")
                  .removeClass("active")
                  .removeClass("openDropdown");
    
                  $(".ApproveRequest").addClass('active');
                });
                }
               
      
    }, 500);



   
   }

  ngOnInit() {
    
    if(this.router.url == "/mis"){
      $('.tab-content>.sideMenu>.nav-pills').children('.MisSidebar').removeClass('active');
    } else if(this.router.url == "/onboardingrequests"){ 
      $(".MisSidebar").removeClass('active');
    }

    $(function(){
      $(".sideMenu>.nav-pills li.nav-link").unbind('click');
      $(".sideMenu>.nav-pills li.nav-link").click(function() {
           $(this).siblings(".active").removeClass("active");
           // $(this).siblings(".openDropdown").removeClass("openDropdown");
           // $(this).addClass("openDropdown");
           $(this).addClass("active");
       });
       $(".sideMenu>.nav-pills>li.nav-link a").click(function() {
           $(this).parent().siblings(".openDropdown").removeClass("openDropdown");
           $(this).parent().toggleClass("openDropdown");
       });
       $(".sideMenu .openDropdown.active").click(function() {
           $(this).toggleClass("openDropdown");
       });
       $(".sideMenu .nav-pills-first-level>li.nav-link").click(function() {
           $(this).siblings(".active").removeClass("active");
           $(this).addClass("active");
       });
       // $(".sideMenu .nav-pills-first-level>li.nav-link a").click(function () {
       //     $(this).parent().siblings(".openDropdown").removeClass("openDropdown");
       //     $(this).parent().addClass("openDropdown fuck");
       // });
       $(".sideMenu .nav-pills-first-level>li.nav-link a").click(function() {
           $(this).removeClass("active show");
       });
       $(".sideMenu .nav-pills-second-level>li.nav-link").click(function() {
           $(this).toggleClass("openDropdown");
           $(this).addClass("active");
           $(this).siblings(".openDropdown").removeClass("openDropdown active");
       });
       $(".sideMenu .nav-pills-second-level>li.nav-link a").click(function() {
           $(this).removeClass("active show");
       });
  });  
  $('.nav-link').on('click', function() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });  
  }

}


