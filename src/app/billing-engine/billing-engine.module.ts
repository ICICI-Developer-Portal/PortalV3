import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { BillingEngineRoutingModule } from './billing-engine-routing.module';
import { BillingEngineComponent } from './billing-engine.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MerchantAppComponent } from './merchant-app/merchant-app.component';
import { SetRatePlanComponent } from './set-rate-plan/set-rate-plan.component';

import { ApproveRatePlanComponent } from './approve-rate-plan/approve-rate-plan.component';
import { BuhAppDashboardComponent } from './buh-app-dashboard/buh-app-dashboard.component';
import { BESidebarComponent } from './besidebar/besidebar.component';
import { BuRequestComponent } from './bu-request/bu-request.component';

@NgModule({
  declarations: [
     BillingEngineComponent,
     MerchantsComponent,
     UserDetailsComponent, 
     MerchantAppComponent, 
     SetRatePlanComponent, 
     ApproveRatePlanComponent,
     BuhAppDashboardComponent,
     BESidebarComponent,
     BuRequestComponent
    ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule,

    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,   
    ReactiveFormsModule,
    
    BillingEngineRoutingModule
  ]
})
export class BillingEngineModule { }
