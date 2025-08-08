import { Route } from '@angular/router';
import { Home } from './home/home';
import { MobileLayout } from './components/mobile-layout/mobile-layout';

export default [
  {
    path: '',
    component: MobileLayout,
    children: [
      { path: 'home', component: Home },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'our-service', loadComponent: () => import('./pages/our-service/our-service').then(m => m.OurService) },
      { path: 'LoginModalComponent', loadComponent: () => import('./home/components/login-modal.components/login-modal.component').then(m => m.LoginModalComponent) },
      { path: 'LeyTargeta', loadComponent: () => import('./pages/ley-targeta/ley-targeta').then(m => m.LeyTargeta) },
      {
        path: 'our-service',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/our-service/our-service').then(m => m.OurService)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/service-detail/service-detail').then(m => m.ServiceDetail)
          }
        ]
      }
    ]
  }
] satisfies Route[];

