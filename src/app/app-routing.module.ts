import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CalcCarComponent } from './components/calc-car/calc-car.component';
import { CalcCustomsComponent } from './components/calc-customs/calc-customs.component';
import { CalcDeliveryComponent } from './components/calc-delivery/calc-delivery.component';
import { LandingComponent } from './components/landing/landing.component';
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
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
