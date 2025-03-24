import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VehicleService } from "../../services/vehicle.service";
import { vehicleActions } from "./vehicle.action";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";
import { Vehicle } from "../vehicle/types/vehicle.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectData } from "./vehicle.feature";

export const vehicleEffect = {
  fetchAll: createEffect((
    vehicleService = inject(VehicleService),
    actions$ = inject(Actions)
  ) => actions$.pipe(
    ofType(vehicleActions.fetchAll),
    exhaustMap((action) => vehicleService.get_vehicle(action.payload).pipe(
      map((vehicles: Vehicle[]) => vehicleActions.fetchSuccessful({ payload: vehicles })),
      catchError((error) => of(vehicleActions.fetchFailure({ error: error.message })))
    ))
  ), { functional: true, dispatch: true }),

  create: createEffect((
    vehicleService = inject(VehicleService),
    actions$ = inject(Actions),
    router = inject(Router),
    route = inject(ActivatedRoute)
  ) => actions$.pipe(
    ofType(vehicleActions.create),
    exhaustMap((action) => vehicleService.create_vehicle(action.payload).pipe(
      map((vehicle) => vehicleActions.createSuccessful({ payload: vehicle })),
      catchError((error) => of(vehicleActions.fetchFailure({ error: error.message })))
    ))
  ), { functional: true, dispatch: true }),

  view: createEffect((
    vehicleService = inject(VehicleService),
    actions$ = inject(Actions),
    store = inject(Store<{ vehicles: Vehicle[] }>)
  ) => actions$.pipe(
    ofType(vehicleActions.view),
    withLatestFrom(store.select((selectData))),
    exhaustMap(([action, vehicles]) => {
      console.log("vehicles", vehicles)
      const existingVehicle = vehicles.find((vehicle: Vehicle) => vehicle.id === action.payload);
      if (existingVehicle) {
        return of(vehicleActions.viewSuccessful({ payload: existingVehicle }));
      } else {
        return vehicleService.view_vehicle(action.payload).pipe(
          map((vehicle) => vehicleActions.viewSuccessful({ payload: vehicle })),
          catchError((error) => of(vehicleActions.viewFailure({ error: error.message })))
        );
      }
    })
  ), { functional: true, dispatch: true }),

}
