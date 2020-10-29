import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./LandingPage/layout/layout.module";
import { HomeModule } from "./LandingPage/home/home.module";
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { UserservicesModule } from "./services/userservice.module";
import { LoginService, DashboardService } from "./services";
import { Config } from "./config/config";
import { MaindashboardModule } from "./maindashboard/maindashboard.module";
import { MailverifyModule } from "./mailverify/mailverify.module";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
//import { LocationStrategy, HashLocationStrategy ,Location, PathLocationStrategy } from "@angular/common";

import { DocumentationDashbComponent } from "./documentation-dashb/documentation-dashb.component";
import { DocumentationDashbModule } from "./documentation-dashb/documentation-dashb.module";
import { VariablesService } from "./services/Variables.service";
import { AdminPortalComponent } from "./admin-portal/admin-portal.component";
//import { DownloadPdfServiceComponent } from './LandingPage/downloadPdfService.component';
import { AppathonComponent } from "./appathon/appathon.component";
import { AdvertisementComponent } from "./advertisement.component";
import { AppathonSignupComponent } from "./appathon-landing/appathon-signup/appathon-signup.component";
//import {AppathonLandingComponent} from './advertisement.component';
//import { AppathonAdComponent } from './appathon-ad/appathon-ad.component';
//import { AppathonComponent } from './appathon/appathon-root/appathon.component';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material/dialog";
import { SigninModalComponent } from "./LandingPage/home/common-modal/signin-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToasterModule, ToasterService } from "angular2-toaster";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { JwtAuthComponent } from './jwt-auth/jwt-auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
//import { MisComponent } from './maindashboard/mis/mis.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { FocusOnShowDirective } from "./autofocus.directive";
import { ProductionOnboardingModule } from "./production-onboarding/production-onboarding.module";


@NgModule({
  declarations: [
    AppComponent,
    AdminPortalComponent,
    SigninModalComponent,
    AppathonComponent,
    AdvertisementComponent,
    AppathonSignupComponent,
    JwtAuthComponent,
    ErrorPageComponent,
    HeaderComponent,
    FocusOnShowDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    MaindashboardModule,
    DocumentationDashbModule,
    HttpClientModule,
    HttpModule,
    UserservicesModule,
    MailverifyModule,
    MatDialogModule,

    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    Ng4LoadingSpinnerModule,
    ProductionOnboardingModule 
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  // Location, 
  // {provide: LocationStrategy, useClass: PathLocationStrategy},
    Config,
    LoginService,
    VariablesService,
    DashboardService
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [
    AdvertisementComponent,
    SigninModalComponent,
    AppathonSignupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
