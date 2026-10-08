import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AuctionComponent } from './components/auction/auction.component';
import { CalcCarComponent } from './components/calc-car/calc-car.component';
import { CalcCustomsComponent } from './components/calc-customs/calc-customs.component';
import { CalcDeliveryComponent } from './components/calc-delivery/calc-delivery.component';
import { LandingComponent } from './components/landing/landing.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'auction',
    component: AuctionComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'calc-all-inclusive',
    component: CalcCarComponent
  },
  {
    path: 'calc-delivery',
    component: CalcDeliveryComponent
  },
  {
    path: 'calc-customs',
    component: CalcCustomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 64], // [x, y] - adjust scroll offset
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
