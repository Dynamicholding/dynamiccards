// ✅ admin.routes.ts
import { Route } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';

export default [
  {
    path: '',
    children: [
      { path: 'dashboard', component: Dashboard },
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.routes')
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
] satisfies Route[];
