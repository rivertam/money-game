// @flow
import React, { Element, Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import Money from './money';

import type DeltaModel from '../models/DeltaModel';

export default function DeltaList({ title, deltas }: { title: string, deltas: DeltaModel[] }): Element<{}> {
  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
          <th>Amount</th>
          <th>Times Per Year</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
      {
        deltas.map(d => (
          <tr key={d.id}>
            <td>{d.name}</td>
            <td><Money pennies={d.amount} /></td>
            <td>{d.timesPerYear}</td>
            <td><button onClick={d.destroy.bind(d)}>x</button></td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}
