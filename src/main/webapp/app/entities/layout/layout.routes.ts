import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import LayoutResolve from './route/layout-routing-resolve.service';

const layoutRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/layout.component').then(m => m.LayoutComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/layout-detail.component').then(m => m.LayoutDetailComponent),
    resolve: {
      layout: LayoutResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/layout-update.component').then(m => m.LayoutUpdateComponent),
    resolve: {
      layout: LayoutResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default layoutRoute;
