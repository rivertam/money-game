// @flow
import { observable, reaction, computed } from 'mobx';

import type DeltaStore from './DeltaStore';

export default class MoneyStore {

  @observable money = 0;
  @observable lastDate = new Date();
  deltaStores: DeltaStore[] = [];

  @computed get currentCash(): number {
    return this.money;
  }

  constructor(money: number = 0) {
    this.money = money;
    this.syncWithLocalStorage();

    setInterval(this.update.bind(this), 100);
  }

  syncWithLocalStorage() {
    const localStorageMoneyKey = 'money-game-money';
    const localStorageMoneyValue: number = JSON.parse(localStorage.getItem(localStorageMoneyKey) || '0');
    this.money += localStorageMoneyValue;

    const localStorageDateKey = 'money-game-last-sync';
    const localStorageDateValue: number = JSON.parse(localStorage.getItem(localStorageDateKey) || '0');
    if (localStorageDateValue !== 0) {
      this.lastDate = new Date(localStorageDateValue);
    }

    reaction(
      (): number => this.money,
      (money: number): void => localStorage.setItem(localStorageMoneyKey, `${money}`)
    );

    reaction(
      (): Date => this.lastDate,
      (date: Date): void => localStorage.setItem(localStorageDateKey, `${date.getTime()}`)
    );
  }

  subscribeToDeltaStore(deltaStore: DeltaStore) {
    this.deltaStores.push(deltaStore);
  }

  update() {
    if (this.deltaStores.length === 0) {
      return;
    }

    const now = new Date();
    this.lastDate = this.lastDate || now;
    this.changeAmount(this.deltaStores.reduce(
      (sum: number, deltaStore: DeltaStore): number =>
        deltaStore.tick(now.getTime() - this.lastDate.getTime())
      , 0
    ));
    this.lastDate = now;
  }

  changeAmount(delta: number) {
    this.money += delta;
  }
}
