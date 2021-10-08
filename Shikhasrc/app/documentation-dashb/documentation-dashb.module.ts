import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap";
import { ToasterModule } from "angular2-toaster";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { DocumentationDashbComponent } from "./documentation-dashb.component";
import { DocumentationDashbRoutingModule } from "./documentation-dashb-routing.module";
import { NavbarComponent } from "./Dashboard-layout/navbar/navbar.component";
import { DocumentationComponent } from "./documentation/documentation.component";
import { SidebarComponent } from "./Dashboard-layout/sidebar/sidebar.component";
import { LoaderComponent } from "./Dashboard-layout/loader/loader.component";
import { ApiDetailsComponent } from "./api-details/api-details.component";
import { BuildingBlocksComponent } from "./Sidenav-pages/building-blocks/building-blocks.component";
import { LoanandCardComponent } from "./Sidenav-pages/loanand-card/loanand-card.component";
import { PaymentsComponent } from "./Sidenav-pages/payments/payments.component";

import { CorporateBankComponent } from "./Sidenav-pages/corporate-bank/corporate-bank.component";
import { CommertialBankComponent } from "./Sidenav-pages/commertial-bank/commertial-bank.component";
import { ViewAllApiComponent } from "./Sidenav-pages/view-all-api/view-all-api.component";
import { AccountDepositComponent } from "./Sidenav-pages/account-deposit/account-deposit.component";
import { MerchantOnboardingComponent } from "./merchant-onboarding/merchant-onboarding.component";
import { OffersComponent } from "./Sidenav-pages/Sidenav-Subpages/offers/offers.component";
import { CustomerAuthComponent } from "./Sidenav-pages/Sidenav-Subpages/customer-auth/customer-auth.component";
import { CustomerOnboardingComponent } from "./Sidenav-pages/Sidenav-Subpages/customer-onboarding/customer-onboarding.component";
import { AutoloanComponent } from "./Sidenav-pages/Sidenav-Subpages/autoloan/autoloan.component";
import { PersonalLoanComponent } from "./Sidenav-pages/Sidenav-Subpages/personal-loan/personal-loan.component";
import { LoanTopUpComponent } from "./Sidenav-pages/Sidenav-Subpages/loan-top-up/loan-top-up.component";
import { LoanmanagementComponent } from "./Sidenav-pages/Sidenav-Subpages/loanmanagement/loanmanagement.component";
import { CreditcardsComponent } from "./Sidenav-pages/Sidenav-Subpages/creditcards/creditcards.component";
import { PrepaidcardComponent } from "./Sidenav-pages/Sidenav-Subpages/prepaidcard/prepaidcard.component";
import { PaylaterComponent } from "./Sidenav-pages/Sidenav-Subpages/paylater/paylater.component";
import { PaymentUPIComponent } from "./Sidenav-pages/Sidenav-Subpages/payment-upi/payment-upi.component";
import { PaymentsUPI2Component } from "./Sidenav-pages/Sidenav-Subpages/payments-upi2/payments-upi2.component";
import { UtilityPaymentsComponent } from "./Sidenav-pages/Sidenav-Subpages/utility-payments/utility-payments.component";
import { FixeddepositComponent } from "./Sidenav-pages/Sidenav-Subpages/fixeddeposit/fixeddeposit.component";
import { SavingaccountComponent } from "./Sidenav-pages/Sidenav-Subpages/savingaccount/savingaccount.component";
import { IwishaccountComponent } from "./Sidenav-pages/Sidenav-Subpages/iwishaccount/iwishaccount.component";
import { CorporateinternetbankingComponent } from "./Sidenav-pages/Sidenav-Subpages/corporateinternetbanking/corporateinternetbanking.component";
import { CashdepositmachineComponent } from "./Sidenav-pages/Sidenav-Subpages/cashdepositmachine/cashdepositmachine.component";
import { CmspaymentComponent } from "./Sidenav-pages/Sidenav-Subpages/cmspayment/cmspayment.component";
import { CmscollectionComponent } from "./Sidenav-pages/Sidenav-Subpages/cmscollection/cmscollection.component";
import { InstaIMPSComponent } from "./Sidenav-pages/Sidenav-Subpages/insta-imps/insta-imps.component";

import { AutoLoanComponent } from "./Sidenav-pages/Sidenav-Subpages/auto-loan/auto-loan.component";
import { EazypayComponent } from "./Sidenav-pages/Sidenav-Subpages/eazypay/eazypay.component";
import { RecurringdepositComponent } from "./Sidenav-pages/Sidenav-Subpages/recurringdeposit/recurringdeposit.component";
import { CurrentaccountComponent } from "./Sidenav-pages/Sidenav-Subpages/currentaccount/currentaccount.component";
import { AccountopeningComponent } from "./Sidenav-pages/Sidenav-Subpages/accountopening/accountopening.component";
import { EcollectionComponent } from "./Sidenav-pages/Sidenav-Subpages/ecollection/ecollection.component";
import { IsurepayComponent } from "./Sidenav-pages/Sidenav-Subpages/isurepay/isurepay.component";
import { RemittanceComponent } from "./Sidenav-pages/Sidenav-Subpages/remittance/remittance.component";
import { CompositepayComponent } from "./Sidenav-pages/Sidenav-Subpages/compositepay/compositepay.component";
import { PanvalidationComponent } from "./Sidenav-pages/Sidenav-Subpages/panvalidation/panvalidation.component";
import { CustomerAuthenticationComponent } from "./Sidenav-pages/Sidenav-Subpages/customer-authentication/customer-authentication.component";
import { NewCustomerOnboardingComponent } from "./Sidenav-pages/Sidenav-Subpages/new-customer-onboarding/new-customer-onboarding.component";
import { DemographicDetailsComponent } from "./Sidenav-pages/Sidenav-Subpages/demographic-details/demographic-details.component";
import { CorporateComponent } from "./Sidenav-pages/corporate/corporate.component";
import { PennyDropComponent } from "./Sidenav-pages/Sidenav-Subpages/penny-drop/penny-drop.component";
import { CdmComponent } from "./Sidenav-pages/Sidenav-Subpages/cdm/cdm.component";
import { CashDepositComponent } from "./Sidenav-pages/Sidenav-Subpages/cash-deposit/cash-deposit.component";
import { Pay2corpComponent } from "./Sidenav-pages/Sidenav-Subpages/pay2corp/pay2corp.component";
import { Pay2corpserviceComponent } from "./Sidenav-pages/Sidenav-Subpages/pay2corpservice/pay2corpservice.component";
import { UtilitypaymentComponent } from "./Sidenav-pages/Sidenav-Subpages/utilitypayment/utilitypayment.component";
import { BbpsComponent } from "./Sidenav-pages/Sidenav-Subpages/bbps/bbps.component";
import { InstapayComponent } from "./Sidenav-pages/Sidenav-Subpages/instapay/instapay.component";
import { Upi2Component } from "./Sidenav-pages/Sidenav-Subpages/upi2/upi2.component";
import { Upi2serviceComponent } from "./Sidenav-pages/Sidenav-Subpages/upi2service/upi2service.component";
import { CollectionsComponent } from "./Sidenav-pages/Sidenav-Subpages/collections/collections.component";
import { AccountservicesComponent } from "./Sidenav-pages/Sidenav-Subpages/accountservices/accountservices.component";
import { CompositepayserviceComponent } from "./Sidenav-pages/Sidenav-Subpages/compositepayservice/compositepayservice.component";
import { ImpsComponent } from "./Sidenav-pages/Sidenav-Subpages/imps/imps.component";
import { EasypayComponent } from "./Sidenav-pages/Sidenav-Subpages/easypay/easypay.component";
import { PaymentComponent } from "./Sidenav-pages/Sidenav-Subpages/payment/payment.component";
import { SecurityComponent } from "./Sidenav-pages/security/security.component";
import { BranchDetailsComponent } from "./branch-details/branch-details.component";
import { RootDetailsComponent } from "./root-details/root-details.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { FocusOnShowDirective } from './autofocus.directive';
import { NewApiDetailsComponent } from "./new-api-details/new-api-details.component";
import { ViewAllApiFilterPipe } from './Sidenav-pages/view-all-api-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    DocumentationDashbRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
 
    //  NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  declarations: [
    DocumentationDashbComponent,
    NavbarComponent,
    //FooterComponent,
    DocumentationComponent,
    SidebarComponent,
    LoaderComponent,
    ApiDetailsComponent,
    BuildingBlocksComponent,
    LoanandCardComponent,
    PaymentsComponent,
    CorporateBankComponent,
    CommertialBankComponent,
    ViewAllApiComponent,
    AccountDepositComponent,
    MerchantOnboardingComponent,
    OffersComponent,
    CustomerAuthComponent,
    CustomerOnboardingComponent,
    AutoloanComponent,
    PersonalLoanComponent,
    LoanTopUpComponent,
    LoanmanagementComponent,
    CreditcardsComponent,
    PrepaidcardComponent,
    PaylaterComponent,
    PaymentUPIComponent,
    PaymentsUPI2Component,
    UtilityPaymentsComponent,
    FixeddepositComponent,
    SavingaccountComponent,
    IwishaccountComponent,
    CorporateinternetbankingComponent,
    CashdepositmachineComponent,
    CmspaymentComponent,
    CmscollectionComponent,
    InstaIMPSComponent,
    AutoLoanComponent,
    EazypayComponent,
    RecurringdepositComponent,
    CurrentaccountComponent,
    AccountopeningComponent,
    EcollectionComponent,
    IsurepayComponent,
    RemittanceComponent,
    CompositepayComponent,
    PanvalidationComponent,
    CustomerAuthenticationComponent,
    NewCustomerOnboardingComponent,
    DemographicDetailsComponent,
    CorporateComponent,
    PennyDropComponent,
    CdmComponent,
    CashDepositComponent,
    Pay2corpComponent,
    Pay2corpserviceComponent,
    UtilitypaymentComponent,
    BbpsComponent,
    InstapayComponent,
    Upi2Component,
    Upi2serviceComponent,
    CollectionsComponent,
    AccountservicesComponent,
    CompositepayserviceComponent,
    ImpsComponent,
    EasypayComponent,
    PaymentComponent,
    SecurityComponent,
    BranchDetailsComponent,
    RootDetailsComponent,
    FocusOnShowDirective,
    NewApiDetailsComponent,
    ViewAllApiFilterPipe
  ]
})
export class DocumentationDashbModule {}
