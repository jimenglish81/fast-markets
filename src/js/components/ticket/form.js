import React from 'react';
import { FormGroup } from '../common/form';

const TicketForm = (props) => {
  return (
    <section className="ticket">
      <form className="ticket-form">
        <FormGroup label="Stake">
          <input
            placeholder="Min: 1"
            autoComplete="off"
            max="9999999"
            min="1"
            step="any"
            type="number"
          />
        </FormGroup>
        <FormGroup label="Direction">
          <button className="btn btn--price btn--price--above">above</button>
          <div>1234.56</div>
          <button className="btn btn--price btn--price--below">below</button>
        </FormGroup>
      </form>
    </section>
  );
}

export default TicketForm;
