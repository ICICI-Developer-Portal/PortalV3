import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_name = '';
  constructor(private router:Router,private adm:LoginService,private auth:AuthService) { 

    this.user_name = localStorage.getItem('username');
    this.adm.check_user_log();
  }

  ngOnInit() {
    this.auth.ischeck_session();
    this.adm.getUserName().subscribe(
    data => {
      this.user_name = data;
    });
  }

     //  Fuction for Logout
     logout(){
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      sessionStorage.removeItem('username');
      localStorage.removeItem('id');
      this.router.navigate(['/admin/login'])
    }

}
