import { createFeature, createReducer, on } from "@ngrx/store";
import { vehicleActions } from '../state/vehicle.action';
import { Vehicle } from "../vehicle/types/vehicle.interface";

export interface VehicleState {
  loading: boolean;
  data: Vehicle[],
  error: string | null;
  selected: Vehicle | null
}
const initialState: VehicleState = {
  loading: true,
  data: [],
  error: null,
  selected: null
}
const vehicleFeatures = createFeature(
  {
    name: 'vehicle',
    reducer: createReducer(
      initialState,

      on(vehicleActions.fetchAll, (state) => ({ ...state, loading: true, error: '' })),
      on(vehicleActions.fetchSuccessful, (state, action) => ({ ...state, data: action.payload, loading: false })),
      on(vehicleActions.fetchFailure, (state, action) => ({ ...state, loading: false, error: action.error })),

      on(vehicleActions.create, (state) => ({ ...state, loading: true, error: '' })),
      on(vehicleActions.createSuccessful, (state, action) => ({
        ...state,
        data: [action.payload, ...state.data],
        loading: false
      })),
      on(vehicleActions.createFailure, (state, action) => ({ ...state, loading: false, error: action.error })),

      on(vehicleActions.view, (state) => ({ ...state, loading: true, error: '' })),
      on(vehicleActions.viewSuccessful, (state, action) => ({ ...state, selected: action.payload, loading: false })),
      on(vehicleActions.fetchFailure, (state, action) => ({ ...state, loading: false, error: action.error })),


    )
  }
);

export const { name: vehicleKeyFeature, reducer: vehicleReducer, selectData, selectError, selectLoading, selectSelected } = vehicleFeatures;
