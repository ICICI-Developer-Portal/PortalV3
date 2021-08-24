import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { MerchantOnboardingComponent } from './merchant-onboarding.component';
import { MerchantOnboardingPageComponent } from './merchant-onboarding-page/merchant-onboarding-page.component'
import { ApproveOnboardedMerchantRequestComponent } from './approve-onboarded-merchant-request/approve-onboarded-merchant-request.component';
import { OnboardedMerchantDetailComponent } from './onboarded-merchant-detail/onboarded-merchant-detail.component';
import { OnboardedMerchantRequestComponent } from './onboarded-merchant-request/onboarded-merchant-request.component';
import { AuthGuard } from '../services/auth.guard';
import { BUAuthGuard } from '../services/bu-auth.gaurd';

const routes: Routes = [
  {
      //    path: 'request', component: RequestsComponent
      path: '',
      component: MerchantOnboardingComponent,   
      children: [  
        { path: 'ApproveRequest', component: ApproveOnboardedMerchantRequestComponent ,},

        { path: 'MerchantDetail', component: OnboardedMerchantDetailComponent  },

        { path: 'MerchantOnboarding', component: MerchantOnboardingPageComponent  },
        { path: 'onboardedMerchantList/:id', component: OnboardedMerchantRequestComponent  },

        ],
        canActivate: [BUAuthGuard]
      },     
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantOnboardingRoutingModule { }
