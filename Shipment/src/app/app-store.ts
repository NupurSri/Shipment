import { AppActions } from './app.action';

export interface MeasureWeightStoreObj {
  totalWeight: number;
  acceptableWeight: number;
  lastWeightAdded: number;
}

export const MEASURE_WEIGHT_INITIAL_STATE: MeasureWeightStoreObj = {
  totalWeight: 0,
  acceptableWeight: 0,
  lastWeightAdded: 0
};
export interface ShipmentAppState {
  weightObj: MeasureWeightStoreObj;
}

export const INITIAL_STATE: ShipmentAppState = {
  weightObj: MEASURE_WEIGHT_INITIAL_STATE
};



export function rootReducer(lastState: ShipmentAppState, action): ShipmentAppState {
  const obj: ShipmentAppState = { weightObj: lastState.weightObj };
  switch (action.type) {
    case AppActions.MAX_WEIGHT_LIMIT_REACHED :
      obj.weightObj = action.data;
      return obj;
    default:
      return obj;
  }
}
