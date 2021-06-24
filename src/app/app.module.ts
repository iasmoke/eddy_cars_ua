import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatBadgeModule } from '@angular/material/badge';

import { ModalLoginComponent } from './components/modal-login/modal-login.component';


// import { AgmCoreModule } from '@agm/core';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CarfaxComponent } from './components/carfax/carfax.component';

import { UserService } from './services/user.service';
import { MagayaService } from './services/magaya.service';

import { HttpClientModule } from '@angular/common/http';
import { PickupOrdersComponent } from './components/pickup-orders/pickup-orders.component';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { SystemMainComponent } from './components/system-main/system-main.component';
import { SystemContainersComponent } from './components/system-containers/system-containers.component';
import { DealersComponent } from './components/dealers/dealers.component';
import { ModalEditDealerComponent } from './components/modal-edit-dealer/modal-edit-dealer.component';
import { DealerLotsComponent } from './components/dealer-lots/dealer-lots.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ModalPaymentComponent } from './components/modal-payment/modal-payment.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { PaymentDueComponent } from './components/payment-due/payment-due.component';
import { ModalPaymentDetailsComponent } from './components/modal-payment-details/modal-payment-details.component';
import { UtilService } from './services/util.service';
import { ModalDealerMakePaymentComponent } from './components/modal-dealer-make-payment/modal-dealer-make-payment.component';
import { DealersPaymentsComponent } from './components/dealers-payments/dealers-payments.component';
import { DealersCreatePaymentComponent } from './components/dealers-create-payment/dealers-create-payment.component';
import { ModalDealerCreatePaymentComponent } from './components/modal-dealer-create-payment/modal-dealer-create-payment.component';
import { MyPaymentsComponent } from './components/my-payments/my-payments.component';
import { ModalNoticeComponent } from './components/modal-notice/modal-notice.component';
import { PaidCarsComponent } from './components/paid-cars/paid-cars.component';
import { MyContainersComponent } from './components/my-containers/my-containers.component';
import { NotLoadedComponent } from './components/not-loaded/not-loaded.component';
import { UserBalancesComponent } from './components/shared/user-balances/user-balances.component';
import { DueInvoicesComponent } from './components/due-invoices/due-invoices.component';
import { ModalNewCarComponent } from './components/modal-new-car/modal-new-car.component';
import { GivedOutCarsComponent } from './components/gived-out-cars/gived-out-cars.component';
import { CalculatorFreightComponent } from './components/calculator-freight/calculator-freight.component';
import { IsEmptyPipePipe } from './pipes/is-empty-pipe.pipe';
import { TitlesComponent } from './components/titles/titles.component';
import { CalcSettingsComponent } from './components/calc-settings/calc-settings.component';

import { AgmCoreModule } from '@agm/core';
import { ServicesComponent } from './components/services/services.component';
import { ModalCallComponent } from './components/modal-call/modal-call.component';
import { AboutComponent } from './components/about/about.component';
import { CalcCarComponent } from './components/calc-car/calc-car.component';
import { CalcDeliveryComponent } from './components/calc-delivery/calc-delivery.component';
import { CalcCustomsComponent } from './components/calc-customs/calc-customs.component';
import { ModalTelsComponent } from './components/modal-tels/modal-tels.component';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ModalFormComponent,
    ModalLoginComponent,
    CalculatorComponent,
    CarfaxComponent,
    PickupOrdersComponent,
    ModalDetailsComponent,
    SystemMainComponent,
    SystemContainersComponent,
    DealersComponent,
    ModalEditDealerComponent,
    DealerLotsComponent,
    ModalConfirmComponent,
    PaymentsComponent,
    ModalPaymentComponent,
    PaymentHistoryComponent,
    PaymentDueComponent,
    ModalPaymentDetailsComponent,
    ModalDealerMakePaymentComponent,
    DealersPaymentsComponent,
    DealersCreatePaymentComponent,
    ModalDealerCreatePaymentComponent,
    MyPaymentsComponent,
    ModalNoticeComponent,
    PaidCarsComponent,
    MyContainersComponent,
    NotLoadedComponent,
    UserBalancesComponent,
    DueInvoicesComponent,
    ModalNewCarComponent,
    GivedOutCarsComponent,
    CalculatorFreightComponent,
    IsEmptyPipePipe,
    TitlesComponent,
    CalcSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatRippleModule,
    MatSidenavModule,
    MatTreeModule,
    MatTableExporterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDOq0Mfal9tHHNlj33ls6Orc2XFSbPRIZY'
    // })
  ],
  entryComponents: [
    ModalFormComponent,
    ModalDetailsComponent,
    ModalNewCarComponent,
    DealerLotsComponent,
    ModalPaymentComponent,
    ModalDealerMakePaymentComponent,
    UserBalancesComponent
  ],
  providers: [
    UserService,
    MagayaService,
    UtilService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
