import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { vehicleReducer } from './features/state/vehicle.feature';
import { provideEffects } from '@ngrx/effects';
import { vehicleEffect } from './features/state/vehicle.effect';

export const routes: Routes = [
  {
    path: 'dkv',
    children: [
      {
        path: 'vehicle',
        providers: [
          provideState(
            {
              name: 'vehicle',
              reducer: vehicleReducer
            }
          ),
          provideEffects(vehicleEffect)
        ],
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
