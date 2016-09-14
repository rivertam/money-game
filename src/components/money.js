// @flow
import React from 'react';

export default function Money({ pennies }: { pennies: number }) {
  const sign = pennies < 0 ? 'negative' : 'positive';
  const dollars = Math.abs(Math.floor(pennies / 100));
  const cents = Math.floor(pennies % 100);
  const paddedCents = cents < 10 ? `0${cents}` : `${cents}`;
  return (
    <span className="money">
      <span className="dollar-sign">$</span>
      <span className="dollars">{dollars}</span>
      <span className="dot">.</span>
      <span className="cents">{paddedCents}</span>
    </span>
  );
}
