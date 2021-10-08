import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MailverifyComponent } from './mailverify.component';


@NgModule({
    imports: [
        CommonModule,
        // MailverifyRoutingModule,
         RouterModule,

    ],
    declarations: [
       MailverifyComponent
    ],

})
export class MailverifyModule {}
