import { Route } from '@angular/router';
import { Home } from './home/home';
import { MobileLayout } from './components/mobile-layout/mobile-layout';
import { AuthGuard } from 'src/app/guards/auth.guards';


import { Finances } from './finances/finances';
import { Dashboard } from './dashboard/dashboard';

export default [
  {
    path: '',
    component: MobileLayout,
    children: [
      { path: 'home', component: Home, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      /* { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) }, */
      { path: 'finances', component: Finances },
      { path: 'LoginModalComponent', loadComponent: () => import('./home/components/login-modal.components/login-modal.component').then(m => m.LoginModalComponent) },
      { path: 'record', loadComponent: () => import('./pages/record/record').then(m => m.Record)} ,
      { path: 'prospects', loadComponent: () => import('./pages/prospects/prospects').then(m => m.Prospects) }    
    ]
  }
] satisfies Route[];

