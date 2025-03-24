import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'dkv',
    children: [
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./features/vehicle/vehicle.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dkv/vehicle/list',
  }
];
