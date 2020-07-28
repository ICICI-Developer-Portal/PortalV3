import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionOnboardingComponent } from './production-onboarding.component';

import { ProductionOnboardingPageComponent } from './production-onboarding-page/production-onboarding-page.component';
import { AuthGuard } from '../services/auth.guard';
//import { AppathonComponent } from '../../LandingPage/home/appathon/appathon.component';
//import { AppathonAdComponent } from '../../LandingPage/home/appathon-ad/appathon-ad.component';
const routes: Routes = [
    {
        //    path: 'request', component: RequestsComponent
        path: '',
        component: ProductionOnboardingComponent,   
        children: [       
            { path: 'productionOnboardingPage', component: ProductionOnboardingPageComponent ,canActivate: [AuthGuard]  },

        ]
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionOnboardinRoutingModule {}
