import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindashboardComponent } from './maindashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticPageComponent } from './analytic-page/analytic-page.component';

import { UserprofileComponent } from './userprofile/userprofile.component';
import { FaqComponent } from './faq/faq.component';
import { UATonboardingDashboardPageComponent } from './uatonboarding-dashboard-page/uatonboarding-dashboard-page.component';

import { AuthGuard } from '../services/auth.guard';
import { OnboardingrequestsComponent } from './onboardingrequests/onboardingrequests.component';
import { DownloadComponent } from './download/download.component';
import { MisComponent } from './mis/mis.component';
import { ReportIssuePageComponent } from './report-issue-page/report-issue-page.component';
import { NewUatonboardingPageComponent } from './new-uatonboarding-page/new-uatonboarding-page.component';

//import { NewProdOnboardingPageComponent } from './new-prod-onboarding-page/new-prod-onboarding-page.component';
// import { UserdataComponent } from './userdata/userdata.component';




const routes: Routes = [
    {
        path: '',
        component: MaindashboardComponent,        
        children: [       
            { path: 'faq', component: FaqComponent },
          //  {path:'uatonboarding-dashboard',component: UATonboardingDashboardPageComponent,canActivate: [AuthGuard]  },
  {path:'uatonboarding-dashboard',component: NewUatonboardingPageComponent,canActivate: [AuthGuard]  },
        ]
    },
    { path: 'application', component: ApplicationComponent ,canActivate: [AuthGuard]},
   /*  { path: 'analytics', component: AnalyticsComponent ,canActivate: [AuthGuard]},
    { path: 'analyticPage', component: AnalyticPageComponent ,canActivate: [AuthGuard]}, */
    { path: 'analytics', component: AnalyticPageComponent ,canActivate: [AuthGuard]},

    { path: 'userprofile', component: UserprofileComponent ,canActivate: [AuthGuard]},
    //{ path: 'supportticket', component: SupportticketComponent ,canActivate: [AuthGuard]},
    { path: 'onboardingrequests', component: OnboardingrequestsComponent ,canActivate: [AuthGuard]},
    { path: 'download', component: DownloadComponent ,canActivate: [AuthGuard]},
    { path: 'mis', component: MisComponent ,canActivate: [AuthGuard]},
    { path: 'report-issues', component:ReportIssuePageComponent  },
   // { path: 'db-access', component: UserdataComponent ,canActivate: [AuthGuard]}
  // { path: 'new-uatOnboardingPage', component:NewUatonboardingPageComponent  ,canActivate: [AuthGuard]},
  //{ path: 'new-prodOnboardingPage', component:NewProdOnboardingPageComponent  ,canActivate: [AuthGuard]},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaindashboardRoutingModule {
}
