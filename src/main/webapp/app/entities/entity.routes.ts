import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'post',
    data: { pageTitle: 'blogApp.post.home.title' },
    loadChildren: () => import('./post/post.routes'),
  },
  {
    path: 'menu',
    data: { pageTitle: 'blogApp.menu.home.title' },
    loadChildren: () => import('./menu/menu.routes'),
  },
  {
    path: 'layout',
    data: { pageTitle: 'blogApp.layout.home.title' },
    loadChildren: () => import('./layout/layout.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
