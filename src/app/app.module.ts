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
import { MisComponent } from './mis/mis.component';
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
    MisComponent
  ],
  imports: [
    BrowserModule,
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
    MatInputModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
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
