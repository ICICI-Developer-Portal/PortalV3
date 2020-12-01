import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { IndexComponent } from "./index/index.component";
import { FaqComponent } from "./faq/faq.component";
import { ModalModule } from "ngx-bootstrap";
import { ToasterModule } from "angular2-toaster";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OnboardingrequestComponent } from "./onboardingrequest/onboardingrequest.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { TermsandconditionComponent } from "./termsandcondition/termsandcondition.component";
import { NDAComponent } from "./nda/nda.component";
import { ContractComponent } from "./contract/contract.component";

import { ResetComponent } from "./reset_password/reset.component";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

//import { SigninModalComponent } from "./common-modal/signin-modal.component";
//import { AppathonComponent } from './appathon/appathon.component';
//import { AppathonAdComponent } from '../../LandingPage/home/appathon-ad/appathon-ad.component';
import { FocusOnShowDirective } from './autofocus.directive';
//import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
//import { CarouselComponent } from './carousel/carousel.component';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    // RecaptchaModule,
    // RecaptchaFormsModule
  ],

  declarations: [
    HomeComponent,
    IndexComponent,
    FaqComponent,
    OnboardingrequestComponent,
    UserprofileComponent,
    ResetComponent,
    TermsandconditionComponent,
    NDAComponent,
    ContractComponent,
    FocusOnShowDirective
    
  ]

  // import { CommonSigninModalComponent } from './common-signin-modal/common-signin-modal.component';
})
export class HomeModule {}
