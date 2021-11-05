import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./LandingPage/layout/layout.component";
import { MailverifyComponent } from "./mailverify/mailverify.component";
import { AuthGuard } from "./services/auth.guard";
import { AdminPortalComponent } from "./admin-portal/admin-portal.component";
import { AppathonComponent } from "./appathon/appathon.component";
import { JwtAuthComponent } from './jwt-auth/jwt-auth.component'
import { ErrorPageComponent } from './error-page/error-page.component';
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { AdminpanelComponent } from "./adminpanel/adminpanel.component";
// import { UserdataComponent } from "./userdata/userdata.component";
import { NewLandingPageComponent } from "./new-landing-page/new-landing-page.component";
//import { DownloadComponent } from "./maindashboard/download/download.component";

const routes: Routes = [
 //{ path: '', redirectTo :'index', pathMatch :'full' },
  { path: "layout", component: LayoutComponent, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    component: MailverifyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jwt-auth',
    component: JwtAuthComponent,
    canActivate: [AuthGuard],
  },
 
  { path: 'signUpPage', component: SignupPopupComponent },
  // { path: 'dbAccess', component:UserdataComponent  },
  


  //{path: '404', component: ErrorPageComponent},
 // {path: '**', redirectTo: '/404'},

  {
    path: 'error',
    component: ErrorPageComponent,
  },
  
{

  path: 'pagenotfound',

  component:PagenotfoundComponent ,

},

//{ path: 'admin', redirectTo :'/admin-panel', pathMatch :'full' },
  /* {
    path: "admin",
    component: AdminpanelComponent,
    // canActivate: [true],
    children: [
     
    //  { path: 'login', component: LoginComponent },
      {
        path: "",
        redirectTo: '/admin/login',
        pathMatch: 'full'
        
      },
    ]
  }, */
  {
    path: "admin",
    component: AdminPortalComponent,
    // canActivate: [true],
    children: [
      {
        path: "",
        loadChildren: "./adminpanel/adminpanel.module#AdminpanelModule"
      }
    ]
  }, 
  {
    path: "appathon",
    component: AppathonComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./appathon-landing/appathon-landing.module#AppathonLandingModule"
      }
    ]
  },
 // {path: '404', component: ErrorPageComponent},
  //{path: '**',  component: ErrorPageComponent,},

  // {
  //   path: 'documentation',
  //   loadChildren:
  //         './documentation-dashb/documentation-dashb.module#DocumentationDashbModule',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
