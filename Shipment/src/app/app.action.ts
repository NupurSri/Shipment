import { Injectable } from '@angular/core';

@Injectable()
export class AppActions {
  static MAX_WEIGHT_LIMIT_REACHED = {};

  /* Method to set current weight state */
  setMaxWeightLimit(obj): any {
    return { type: AppActions.MAX_WEIGHT_LIMIT_REACHED, data: obj };
  }
}
