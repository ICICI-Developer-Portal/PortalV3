import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { MerchantOnboardingRoutingModule } from './merchant-onboarding-routing.module';
import { MerchantOnboardingComponent } from './merchant-onboarding.component';

import { MerchantOnboardingPageComponent } from './merchant-onboarding-page/merchant-onboarding-page.component';
import { OnboardedMerchantRequestComponent } from './onboarded-merchant-request/onboarded-merchant-request.component';
import { ApproveOnboardedMerchantRequestComponent } from './approve-onboarded-merchant-request/approve-onboarded-merchant-request.component';
import { OnboardedMerchantDetailComponent } from './onboarded-merchant-detail/onboarded-merchant-detail.component';
import { MoSidebarComponent } from './mo-sidebar/mo-sidebar.component';

@NgModule({
  declarations: [MerchantOnboardingComponent,  MerchantOnboardingPageComponent,  OnboardedMerchantRequestComponent, ApproveOnboardedMerchantRequestComponent, OnboardedMerchantDetailComponent, MoSidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,

    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,   
    ReactiveFormsModule,
    MerchantOnboardingRoutingModule
  ]
})
export class MerchantOnboardingModule { }
