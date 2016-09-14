// @flow
import React, { Component, Element } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

@observer
export default class DeltaEntry extends Component {
  render(): Element<{}> {
    return (
      <div>
        <input ref="name" placeholder="Name" />
        <input ref="amount" placeholder="Amount" />
        <input ref="timesPerYear" placeholder="# recurrences per year" />
        <button onClick={this.createNewDelta.bind(this)}>+</button>
      </div>
    );
  }

  createNewDelta() {
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const amount = Math.round(parseFloat(ReactDOM.findDOMNode(this.refs.amount).value.trim()) * 100);
    const timesPerYear = parseInt(ReactDOM.findDOMNode(this.refs.timesPerYear).value.trim(), 10);
    this.props.deltaStore.newDelta(name, amount, timesPerYear);
    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.amount).value = '';
    ReactDOM.findDOMNode(this.refs.timesPerYear).value = '';
  }
}

DeltaEntry.propTypes = {
  deltaStore: React.PropTypes.object.isRequired,
};
