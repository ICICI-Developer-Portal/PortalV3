import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
// import { HttpClientModule } from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-view-all-api',
  templateUrl: './view-all-api.component.html',
  //styleUrls: ['./view-all-api.component.css']
})
export class ViewAllApiComponent implements OnInit {
   seartext:any;
  APIListV: string; 
  appNameList =[];
  AppId:any={};
  //searchText: string; 
  constructor(private adm:LoginService,public router:Router) {     
    this.Get_All_API_List();    
  }

  ngOnInit() {
   
  }

  onSearchChange(searchValue: string): void { 
    var json = {
      "username" : localStorage.getItem('username')
    } 
    // this.adm.Get_All_API().subscribe((data: any) => {
    this.adm.Get_All_API(json).subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      this.APIListV = obj; 
      var ApiName = [];
      for(let i=0;i<this.APIListV.length;i++)
      {        
       var apiname =this.APIListV[i]["ApiName"].toString().toLocaleLowerCase().trim();// this.APIListV[i]["ApiName"].toString().toLowerCase().trim(); //|| this.APIListV[i]["ApiDesc"].toLowerCase().indexOf(searchValue.toLowerCase()) !==-1
       var ApiDesc =this.APIListV[i]["ApiDesc"].toString().toLocaleLowerCase().trim();
       var a = apiname.includes(searchValue.toLocaleLowerCase().trim());
       var b = ApiDesc.includes(searchValue.toLocaleLowerCase().trim());
       var c =this.APIListV[i]["ApiName"].toString().includes(searchValue.toLocaleLowerCase());       
        if(a || b || c)
        {
          ApiName.push(this.APIListV[i]["ApiName"]);
        } 
                 
      }
      console.log("ApiName : "+ ApiName.sort()); 
      var sort_arr = ApiName.sort();
      var nn = [];
      var pp = [];
      var word = "";
      var obj1 = {};
      for(var i in sort_arr){
        if(word == sort_arr[i][0]){
          pp.push(sort_arr[i]); 
          obj1[word] = pp;
          nn.push(obj1);
        } else {
          obj1[word] = pp;
          nn.push(obj1);
          word = sort_arr[i][0];
          pp = [];
          pp.push(sort_arr[i]);
        }
        
      }
      this.appNameList = nn[0];
      console.log(this.appNameList);
    },
    err => {
      console.log('err', err);
      this.router.navigate(['error']);
      
    },); 
  }

  Get_All_API_List()
  {
    var json = {
      "username" : localStorage.getItem('username')
    } 
      // this.adm.Get_All_API().subscribe((data: any) => {
      this.adm.Get_All_API(json).subscribe((data: any) => {
      var obj = JSON.parse(data._body);
      console.log(obj);
      this.APIListV = obj; 
      
      var AppName = [];
    
      for(var i in obj)
      {
         AppName.push(obj[i].ApiName);
        this.AppId[obj[i].ApiName] = obj[i]['ApiId'];
      }   
      console.log("Api sort");   
    
      
      var sort_arr = AppName.sort();
      var nn = [];
      var pp = [];
      var word = "A";
      var obj1 = {};
      console.log('sort_arr',sort_arr);
      for(var i in sort_arr){
        if(word == sort_arr[i][0]){
          pp.push(sort_arr[i]); 
        } else {
          obj1[word] = pp;
          nn.push(obj1);
          word = sort_arr[i][0];
          pp = [];
          pp.push(sort_arr[i]);
        }
        
      }
      // console.log("newarray");
      // console.log(nn[0]);
     //var alfabets =[]; var temp;

      // for(var i in AppName.sort())
      // {
      //   // var firstChr = AppName[i];
      //   // if(temp!=firstChr)
      //   // {
      //   //    temp = firstChr;console.log(firstChr);
      //   //    alfabets.push(firstChr[0])
      //   // }
      // }
      //console.log(alfabets);
      this.appNameList = nn[0];
      console.log(this.appNameList);
      },
      err => {
        console.log('err', err);
        this.router.navigate(['error']);
      },)      
  }

  search( A:any){
    this.onSearchChange(A);
    this.seartext=A;
  }

  goto(from){
    $('html, body').animate({
                    scrollTop: $(".symbo_"+from).offset().top - 130
                }, 100);
  }

  goToPage(id){
    this.router.navigate(['apidetails/'+this.AppId[id]]);
  }

  gotoTop(){
     $('html, body').animate({
        scrollTop: 0
    }, 100);
  }
}
