import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppathonDashboardRoutingModule } from './appathon-dashboard-routing.module';
import { AppathonDashboardComponent } from './appathon-dashboard/appathon-dashboard.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppathonService } from 'src/app/services/appathon.service';

@NgModule({
  declarations: [AppathonDashboardComponent],
  imports: [
    CommonModule,
    AppathonDashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    AppathonService
  ]
})
export class AppathonDashboardModule { }
