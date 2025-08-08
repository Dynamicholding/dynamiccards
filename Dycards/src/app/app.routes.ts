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
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '**',
        component: NotFound
    }
];
