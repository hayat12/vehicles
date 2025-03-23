import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Vehicle } from "../vehicle/types/vehicle.interface";
import { Params } from "@angular/router";
import { SubmissionDataInterface } from "../vehicle/add-vehicle/submission-data.interface";

export const vehicleActions = createActionGroup(
  {
    'source': "VEHICLE",
    events: {
      fetchAll: props<{ payload: Params }>(),
      'fetch successful': props<{ payload: Vehicle[] }>(),
      'fetch failure': props<{ error: string }>(),

      create: props<{ payload: SubmissionDataInterface }>(),
      'create successful': props<{ payload: Vehicle }>(),
      'create failure': props<{ error: string }>(),

      view: props<{ payload: Vehicle['id'] }>(),
      'view successful': props<{ payload: Vehicle }>(),
      'view failure': props<{ error: string }>(),
    }
  }
)
