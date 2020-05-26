import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailverifyComponent } from './mailverify.component';


const routes: Routes = [
    {
        path: '',
        component: MailverifyComponent,   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MailverifyRoutingModule {
}
