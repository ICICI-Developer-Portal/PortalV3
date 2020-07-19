import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminpanelComponent } from './adminpanel.component';
import { AdminpanelRoutingModule } from './adminpanel-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RequestsComponent } from './requests/requests.component';
import { ApprovalComponent } from './approval/approval.component';
import { LoginComponent } from './login/login.component';
import { PendingRegComponent } from './pending-reg/pending-reg.component';
import { HomeComponent } from './home/home.component';
import {
  MatTreeModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSlideToggleModule,
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DocumentuploadComponent } from './documentupload/documentupload.component';
import { DocumentdownloadComponent } from './documentdownload/documentdownload.component';

@NgModule({
  imports: [
    CommonModule,
    AdminpanelRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    DragDropModule,
  ],
  declarations: [
    AdminpanelComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RequestsComponent,
    ApprovalComponent,
    LoginComponent,
    PendingRegComponent,
    HomeComponent,
    DocumentuploadComponent,
    DocumentdownloadComponent,
  ],
})
export class AdminpanelModule {}
