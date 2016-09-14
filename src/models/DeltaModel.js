/* @flow */

import { observable } from 'mobx';
import type DeltaStore from '../stores/DeltaStore';

const MS_PER_YEAR = 365.24 * 24 * 60 * 60 * 1000;

export type DeltaType = {
  id: number,
  name: string,
  amount: number,
  timesPerYear: number
};

export default class DeltaModel {
  store: DeltaStore;
  id: number;
  done: boolean;
  @observable name: string;
  @observable timesPerYear: number;
  @observable amount: number;

  constructor(store: DeltaStore, id: number, name: string, amount: number, timesPerYear: number) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.timesPerYear = timesPerYear;
  }

  destroy() {
    this.store.remove(this);
  }

  tick(interval: number): number {
    if (this.timesPerYear === 0) {
      if (this.done) {
        return 0;
      }

      this.done = true;
      return this.amount;
    }

    const totalPerYear = this.timesPerYear * this.amount;
    const totalPerMS = totalPerYear / MS_PER_YEAR;
    return totalPerMS * interval;
  }

  toJS(): DeltaType {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      timesPerYear: this.timesPerYear,
    };
  }

  static fromJS(store: DeltaStore, object: DeltaType): DeltaModel {
    return new DeltaModel(store, object.id, object.name, object.amount, object.timesPerYear);
  }
}
