// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Money from './money';

@observer
export default class MoneyOverview extends Component {
  static propTypes = {
    moneyStore: React.PropTypes.object.isRequired,
  }

  render(): React.Element<{}> {
    const { moneyStore } = this.props;
    return (
      <div>
        You have <Money pennies={moneyStore.money} /> moneys
      </div>
    );
  }
}
