import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ProductionOnboardinRoutingModule } from './production-onboarding-routing.module';

import { ProductionOnboardingPageComponent } from './production-onboarding-page/production-onboarding-page.component';
import { ProductionOnboardingComponent } from './production-onboarding.component';
import { ProductionSidebarComponent } from './production-sidebar/production-sidebar.component';

import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProdOnboardingPageComponent } from './new-prod-onboarding-page/new-prod-onboarding-page.component';


@NgModule({
  declarations: [ProductionOnboardingPageComponent,
    ProductionOnboardingComponent,
     ProductionSidebarComponent,
     NewProdOnboardingPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ProductionOnboardinRoutingModule,
    

  ]
})
export class ProductionOnboardingModule { }
