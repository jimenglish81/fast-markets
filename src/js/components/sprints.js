import React from 'react';
import Chart from './chart';
import Ticket from '../containers/ticket/ticket';

export default (props) => {
  return (
    <div>
      <Ticket />
      <Chart />
    </div>
  );
}
