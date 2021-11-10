import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppathonDashboardComponent } from './appathon-dashboard/appathon-dashboard.component';

const routes: Routes = [
  { path: '', component: AppathonDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppathonDashboardRoutingModule { }
