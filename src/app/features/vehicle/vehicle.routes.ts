import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list-vehicles/list-vehicles.component').then(m => m.ListVehiclesComponent)
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./view-vehicle/view-vehicle.component').then(m => m.ViewVehicleComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./add-vehicle/add-vehicle.component').then(m => m.AddVehicleComponent)
      },
    ]
  }
];
