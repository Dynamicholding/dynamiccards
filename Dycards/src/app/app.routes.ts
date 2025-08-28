import { Routes } from '@angular/router';
import { NotFound } from './features/shared/pages/not-found/not-found';


export const routes: Routes = [

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
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login').then((m) => m.Login)
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

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**',
        component: NotFound
    }
];
