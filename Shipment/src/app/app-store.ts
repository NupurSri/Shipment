import { AppActions } from './app.action';

// Interface for ShipmentWeight
export interface ShipmentAppState {
  shipmentWeight: number;
}

// Initializing interface.
export const INITIAL_STATE: ShipmentAppState = {
  shipmentWeight: 0.000
};

// Reducer method.
export function rootReducer(lastState: ShipmentAppState, action): ShipmentAppState {
  const obj: ShipmentAppState = { shipmentWeight: lastState.shipmentWeight };
  switch (action.type) {
    case AppActions.MAX_WEIGHT_LIMIT_REACHED :
      obj.shipmentWeight = action.data;
      return obj;
    default:
      return obj;
  }
}
