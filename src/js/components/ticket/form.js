import React, { PropTypes } from 'react';
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
          <div>
            <button className="btn btn--price btn--price--above">above</button>
            <div>{props.market.strike}</div>
            <button className="btn btn--price btn--price--below">below</button>
          </div>
        </FormGroup>
      </form>
    </section>
  );
};

TicketForm.propTypes = {
  market: PropTypes.object.isRequired,
};

export default TicketForm;
