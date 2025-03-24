import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { vehicleReducer } from '../state/vehicle.feature';
import { vehicleEffect } from '../state/vehicle.effect';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      provideState(
        {
          name: 'vehicle',
          reducer: vehicleReducer
        }
      ),
      provideEffects(vehicleEffect)
    ],
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
