import React from 'react';
import Ticket from '../containers/ticket/ticket';
import Chart from './chart';
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesReferenceLine
} from 'react-sparklines';

export default (props) => {
  const level = 50;
  return (
    <div>
      <Ticket />
      <Chart />
      <Sparklines data={[10, 30, 40, 50, 80, 90, 40, 10, 20, 30, 50, 90]} limit={20}>
        <SparklinesLine color="#1c8cdc" />
        <SparklinesSpots />
        <SparklinesReferenceLine type="custom" value={level} />
      </Sparklines>
    </div>
  );
}
