import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindashboardComponent } from './maindashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FaqComponent } from './faq/faq.component';
import { UATonboardingDashboardPageComponent } from './uatonboarding-dashboard-page/uatonboarding-dashboard-page.component';

import { AuthGuard } from '../services/auth.guard';
import { OnboardingrequestsComponent } from './onboardingrequests/onboardingrequests.component';
import { DownloadComponent } from './download/download.component';
import { MisComponent } from './mis/mis.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { NewpartnerComponent } from './newpartner/newpartner.component';





const routes: Routes = [
    {
        path: '',
        component: MaindashboardComponent,        
        children: [       
            { path: 'transactionHistory', component: TransactionHistoryComponent ,canActivate: [AuthGuard]},

            { path: 'faq', component: FaqComponent },
            {path:'uatonboarding-dashboard',component: UATonboardingDashboardPageComponent,canActivate: [AuthGuard]  },

        ]
    },
    { path: 'application', component: ApplicationComponent ,canActivate: [AuthGuard]},
    { path: 'analytics', component: AnalyticsComponent ,canActivate: [AuthGuard]},
    { path: 'userprofile', component: UserprofileComponent ,canActivate: [AuthGuard]},
    //{ path: 'supportticket', component: SupportticketComponent ,canActivate: [AuthGuard]},
    { path: 'onboardingrequests', component: OnboardingrequestsComponent ,canActivate: [AuthGuard]},
    { path: 'download', component: DownloadComponent ,canActivate: [AuthGuard]},
    { path: 'mis', component: MisComponent ,canActivate: [AuthGuard]},
    { path: 'connectedBanking', component: NewpartnerComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaindashboardRoutingModule {
}