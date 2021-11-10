import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppathonLandingRoutingModule } from './appathon-landing-routing.module';
import { AppathonLandingComponent } from './appathon-landing.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { FocusOnShowDirective } from './autofocus.directive';

//import { AppathonSignupComponent } from './appathon-signup/appathon-signup.component';

@NgModule({
  declarations: [
    AppathonLandingComponent,
    FooterComponent,
    HeaderComponent,
    FocusOnShowDirective
    
    //AppathonSignupComponent,
  ],
  imports: [
    CommonModule,
    AppathonLandingRoutingModule,
    ToasterModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
})
export class AppathonLandingModule {}
