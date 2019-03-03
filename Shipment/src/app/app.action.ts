import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class AppActions {
  static MAX_WEIGHT_LIMIT_REACHED = {};
  setMaxWeightLimit(obj): any {
    return { type: AppActions.MAX_WEIGHT_LIMIT_REACHED, data: obj };
  }
}
