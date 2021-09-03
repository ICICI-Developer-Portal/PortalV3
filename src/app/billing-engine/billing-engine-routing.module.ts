import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingEngineComponent } from './billing-engine.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { UserDetailsComponent } from './user-details/user-details.component'
import { MerchantAppComponent } from './merchant-app/merchant-app.component'
import { SetRatePlanComponent } from './set-rate-plan/set-rate-plan.component';

import { AuthGuard } from '../services/auth.guard';
import { ApproveRatePlanComponent } from './approve-rate-plan/approve-rate-plan.component';
import { BuhAppDashboardComponent } from './buh-app-dashboard/buh-app-dashboard.component';



const routes: Routes = [
  {
      //    path: 'request', component: RequestsComponent
      path: '',
      component: BillingEngineComponent,   
      children: [       
          { path: 'merchants', component: MerchantsComponent ,  },
          { path: 'UserDetails', component: UserDetailsComponent  },
          { path: 'MerchantApp', component: MerchantAppComponent  },
          { path: 'setRatePlan/:id', component: SetRatePlanComponent,  },
        { path: 'AppDashboard', component: BuhAppDashboardComponent,  },
          { path: 'approveRatePlan/:id', component: ApproveRatePlanComponent ,  }
          
         ],
         canActivate: [AuthGuard]
    },     

];
@NgModule({  
 
  imports: [RouterModule.forChild(routes),   
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,],
  exports: [RouterModule]   
})
export class BillingEngineRoutingModule { }
