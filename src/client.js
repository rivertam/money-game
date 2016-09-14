import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import DeltaStore from '../src/stores/DeltaStore';
import MoneyStore from '../src/stores/MoneyStore';
import MoneyApp from '../src/components/moneyApp.js';

const initialState = window.initialState || {};

const moneyStore = new MoneyStore();
const deltaStore = new DeltaStore();

deltaStore.subscribeLocalStorageToStore();
moneyStore.subscribeToDeltaStore(deltaStore);

ReactDOM.render(
  <div>
    <MoneyApp moneyStore={moneyStore} deltaStore={deltaStore} />
  </div>,
  document.getElementById('money-game')
);
