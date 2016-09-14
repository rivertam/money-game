// @flow
import React, { Element, Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import DeltaEntry from './deltaEntry';
import DeltaList from './deltaList';
import type DeltaModel from '../models/DeltaModel';

@observer
export default class DeltaOverview extends Component {
  static propTypes = {
    deltaStore: React.PropTypes.object.isRequired,
  }

  render(): Element<{}> {
    return (
      <div>
        <DeltaList title="Expenses" deltas={this.props.deltaStore.expenses} />
        <DeltaList title="Incomes" deltas={this.props.deltaStore.incomes} />
        <DeltaEntry deltaStore={this.props.deltaStore} />
      </div>
    );
  }
}
