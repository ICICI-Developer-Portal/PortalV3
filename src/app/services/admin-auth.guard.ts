import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '.';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SigninModalComponent } from '../LandingPage/home/common-modal/signin-modal.component';
import { HeaderComponent } from '../LandingPage/layout/header/header.component';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import { Subject } from 'rxjs/Subject';
@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  modalRef: BsModalRef;
  constructor(
    private router: Router,
    private adm: LoginService,
    private modalService: BsModalService,
    public dialog: MatDialog,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const dialogRef = this.dialog.open(SigninModalComponent, {
    //   disableClose: true,
    // });
    // return false;

    // this.modalRef = this.modalService.show(HeaderComponent, {
    //   backdrop: 'static',
    // });
    if(localStorage.getItem('username') !== "admin"){
      console.log("yes admin");
      this.router.navigate([this.router.url]);
      return false;
    }
    if (
      localStorage.getItem('username') == '' ||
      !localStorage.getItem('username')
    ) {
      this.adm.sendUserId('');
      this.adm.LogoutPortal().subscribe(
        res => {
          if(localStorage.getItem('username') === "admin"){
            console.log("yes admin");
            this.router.navigate(['/admin/login']);
            return false;
          }
            

          /* const dialogRef = this.dialog.open(SigninModalComponent, {
            disableClose: true,
          });
          return false; */
        },
        err => {
          if(localStorage.getItem('username') === "admin"){
            console.log("yes admin");
            this.router.navigate(['/admin/login']);
            return false;
          }

        /*   const dialogRef = this.dialog.open(SigninModalComponent, {
            disableClose: true,
          });
          return false; */
        },
      );
    } else {
      sessionStorage.setItem('username', sessionStorage.getItem('username'));
      return true;
    }
  }
}

// import { Injectable } from '@angular/core';
// import {
//   Router,
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { LoginService } from '.';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private adm: LoginService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (
//       localStorage.getItem('username') == '' ||
//       !localStorage.getItem('username')
//     ) {
//       this.adm.sendUserId('');
//       this.adm.LogoutPortal().subscribe(
//         res => {
//           this.router.navigate(['/index'], {
//             queryParams: { returnUrl: state.url },
//           });
//           return false;
//         },
//         err => {
//           this.router.navigate(['/index'], {
//             queryParams: { returnUrl: state.url },
//           });
//           return false;
//         },
//       );
//     } else {
//       sessionStorage.setItem('username', sessionStorage.getItem('username'));
//       return true;
//     }
//   }
// }
