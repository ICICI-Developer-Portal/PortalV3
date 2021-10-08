import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { IndexComponent } from './index/index.component';
import { FaqComponent } from './faq/faq.component';
import { OnboardingrequestComponent } from './onboardingrequest/onboardingrequest.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ResetComponent } from './reset_password/reset.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { NDAComponent } from './nda/nda.component';
import { ContractComponent } from './contract/contract.component';
import { AuthGuard } from '../../services/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageUserRoleComponent } from './manage-user-role/manage-user-role.component';
//import { AppathonComponent } from '../../LandingPage/home/appathon/appathon.component';
//import { AppathonAdComponent } from '../../LandingPage/home/appathon-ad/appathon-ad.component';
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: LayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'faq', component: FaqComponent },
      {
        path: 'userprofile',
        component: UserprofileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'merchantOnboarding',
        component: OnboardingrequestComponent,
        canActivate: [AuthGuard],
      },
      //{ path: 'dashboard', component: DashboardComponent},
      { path: 'termsandcondition', component: TermsandconditionComponent },
      { path: 'nda', component: NDAComponent },
      { path: 'contract', component: ContractComponent },
     
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: 'reset_password', component: ResetComponent }],
  },
  { path: 'change_password', component: ChangePasswordComponent,canActivate: [AuthGuard]},
  { path: 'manageUser', component: ManageUserRoleComponent,canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
