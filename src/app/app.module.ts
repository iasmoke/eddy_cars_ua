import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';

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
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatBadgeModule } from '@angular/material/badge';

import { HttpClientModule } from '@angular/common/http';
import { ModalNoticeComponent } from './components/modal-notice/modal-notice.component';

import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { ServicesComponent } from './components/services/services.component';
import { ModalCallComponent } from './components/modal-call/modal-call.component';
import { AboutComponent } from './components/about/about.component';
import { CalcCarComponent } from './components/calc-car/calc-car.component';
import { CalcDeliveryComponent } from './components/calc-delivery/calc-delivery.component';
import { CalcCustomsComponent } from './components/calc-customs/calc-customs.component';
import { ModalTelsComponent } from './components/modal-tels/modal-tels.component';
import {RouterModule} from '@angular/router';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuctionComponent } from './components/auction/auction.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalNoticeComponent,
    LandingComponent,
    ServicesComponent,
    ModalCallComponent,
    AboutComponent,
    CalcCarComponent,
    CalcDeliveryComponent,
    CalcCustomsComponent,
    ModalTelsComponent,
    ReviewsComponent,
    AuctionComponent,

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4s6qg_wpiw5LIMWSk7y8D-d6QY-xCzDE'
    })
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
