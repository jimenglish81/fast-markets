import React from 'react';
import Chart from './chart';
import Ticket from './ticket/form';

export default (props) => {
  return (
    <div>
      <Ticket />
      <Chart />
    </div>
  );
}
