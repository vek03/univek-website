import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'calendario',
        loadComponent: () =>
          import('./pages/calendario/calendario.component').then((m) => m.CalendarioComponent),
      },
      {
        path: 'disciplinas',
        loadComponent: () =>
          import('./pages/disciplinas/disciplinas.component').then((m) => m.DisciplinasComponent),
      },
    ]
  }
];
