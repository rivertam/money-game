/* @flow */

import React, { Component, Element } from 'react';
import { observer } from 'mobx-react';
import { Router } from 'director';

import MoneyOverview from './moneyOverview';
import DeltaOverview from './deltaOverview';

import DevTool from 'mobx-react-devtools';

@observer
export default class MoneyApp extends Component {
  render(): Element<{}> {
    const { moneyStore, deltaStore } = this.props;
    return (
      <div>
        <DevTool />
        <h1>This is how much money you have!</h1>
        <MoneyOverview moneyStore={moneyStore} />
        <DeltaOverview deltaStore={deltaStore} />
      </div>
    );
  }
}

MoneyApp.propTypes = {
  moneyStore: React.PropTypes.object.isRequired,
  deltaStore: React.PropTypes.object.isRequired,
};
