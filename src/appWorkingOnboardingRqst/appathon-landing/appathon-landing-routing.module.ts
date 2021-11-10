import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppathonLandingComponent } from './appathon-landing.component';

const routes: Routes = [
  {
    //    path: 'request', component: RequestsComponent
    path: 'landing-page',
    component: AppathonLandingComponent,
    // children: [
    //   { path: 'request', component: RequestsComponent },
    //   { path: 'approval', component: ApprovalComponent },
    //   { path: 'pendingreg', component: PendingRegComponent },
    // ],
    // canActivate: [AuthGuard],
  },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppathonLandingRoutingModule {}
