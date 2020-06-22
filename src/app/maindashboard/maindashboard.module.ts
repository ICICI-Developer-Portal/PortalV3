import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { MaindashboardComponent } from './maindashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FaqComponent } from './faq/faq.component';

import { UATonboardingDashboardPageComponent } from './uatonboarding-dashboard-page/uatonboarding-dashboard-page.component';

import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OnboardingrequestsComponent } from './onboardingrequests/onboardingrequests.component';
import { UATonboardingDashboardPageSidebarComponent } from './uatonboarding-dashboard-page-sidebar/uatonboarding-dashboard-page-sidebar.component';
import { DownloadComponent } from './download/download.component';
import { MatInputModule, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

   
@NgModule({
    imports: [
        CommonModule,   
         MaindashboardRoutingModule,
         RouterModule,
         ModalModule.forRoot(),
         ToasterModule.forRoot(),
         FormsModule,
         ReactiveFormsModule,
         Ng4LoadingSpinnerModule.forRoot(),
         NgMultiSelectDropDownModule.forRoot(),
         NgxPaginationModule,
         Ng2SearchPipeModule,
        
         MatInputModule,
         MatAutocompleteModule,
         MatFormFieldModule,
         BrowserAnimationsModule,
         MatInputModule,

         
    ],
    declarations: [
        // IndexComponent,
        MaindashboardComponent,
        HeaderComponent,
        SidebarComponent,
        DashboardComponent,
        ApplicationComponent,
        AnalyticsComponent,
        UserprofileComponent,
        FaqComponent,
        UATonboardingDashboardPageComponent,
        OnboardingrequestsComponent,
        UATonboardingDashboardPageSidebarComponent,
        DownloadComponent
        
    ],

})
export class MaindashboardModule {}
