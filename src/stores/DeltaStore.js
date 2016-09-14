/* @flow */

import { observable, computed, reaction } from 'mobx';
import DeltaModel from '../models/DeltaModel';

import type { DeltaType } from '../models/DeltaModel';

export default class DeltaStore {
  @observable deltas = [];

  @computed get expenses(): DeltaModel[] {
    return this.deltas.filter((d: DeltaModel): boolean => d.amount < 0);
  }

  @computed get incomes(): DeltaModel[] {
    return this.deltas.filter((d: DeltaModel): boolean => d.amount > 0);
  }

  tick(interval: number): number {
    return this.deltas.reduce((sum: number, d: DeltaModel): number => sum + d.tick(interval), 0);
  }

  @computed get recurring(): DeltaModel[] {
    return this.deltas.filter(d => !d.done);
  }

  remove(delta: DeltaModel) {
    this.deltas = this.deltas.filter((d: DeltaModel): boolean => d !== delta);
  }

  newDelta(name: string, amount: number, timesPerYear: number) {
    this.addDelta(new DeltaModel(this, this.deltas.length, name, amount, timesPerYear));
  }

  addDelta(delta: DeltaModel | DeltaType) {
    this.deltas.push(DeltaModel.fromJS(this, delta));
  }

  subscribeLocalStorageToStore() {
    const localStorageKey = 'money-game-deltas';
    const localStorageVal = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    localStorageVal.forEach((d: DeltaType) => {
      this.addDelta(d);
    });
    reaction(
      this.toJS.bind(this),
      (deltas: DeltaType[]) => {
        console.log('deltas changed', deltas);
        localStorage.setItem('money-game-deltas', JSON.stringify(deltas));
      }
    );
  }

  toJS(): DeltaType[] {
    return this.recurring.map((d: DeltaModel): DeltaType => d.toJS());
  }

  static fromJS(deltas: DeltaType[]): DeltaStore {
    const store = new DeltaStore();
    const models = deltas.map(d => DeltaModel.fromJS(store, d));
    models.forEach(d => store.addDelta(d));
    return store;
  }
}
