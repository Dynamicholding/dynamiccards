import { Route } from '@angular/router';
import { Dashboard } from './dashboard';

export default [
    {
        path: '',
        component: Dashboard,
        children: [
            {
                path: 'usuarios',
                loadComponent: () =>
                    import('../users/users').then(m => m.Users)
            },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    }
] satisfies Route[];
