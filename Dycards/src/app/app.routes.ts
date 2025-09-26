import { Routes } from '@angular/router';
import { NotFound } from './features/shared/pages/not-found/not-found';


export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () =>
            import('./features/home/home/home').then((m) => m.Home)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login').then((m) => m.Login)
    },
    {
        path: 'services',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/our-service/our-service').then(m => m.OurService)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/service-detail/service-detail').then(m => m.ServiceDetail)
          }
        ]
      },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.default)
    },
    {
        path: 'mobile',
        loadChildren: () =>
            import('./features/mobile/mobile.routes').then(m => m.default)
    },
    
    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/register/register').then((m) => m.Register)
    },
    {
        path: 'olvide',
        loadComponent: () =>
            import('./features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword)
    },
    {
        path: 'reset-password/:token',
        loadChildren: () => 
            import('./features/auth/reset-password/reset-password').then((m) => m.ResetPassword)
    },
    { path: 'terminos', 
        loadComponent: () => import('./features/mobile/pages/ley-targeta/ley-targeta').then(m => m.LeyTargeta) },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '**',
        component: NotFound
    }
];
