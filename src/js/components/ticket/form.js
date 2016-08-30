import React, { PropTypes } from 'react';
import { FormGroup } from '../common/form';

const TicketForm = (props) => {
  const inputChange = ({ target }) => {
    props.onSizeChange(target.value);
  };

  const createSubmitHandler = (direction) => (evt) => {
    evt.preventDefault();
    props.onSubmit(direction);
  };
  const { minDealSize, strike } = props;

  return (
    <section className="ticket">
      <form className="ticket-form">
        <FormGroup label="Stake">
          <input
            placeholder={`Min: ${minDealSize}`}
            autoComplete="off"
            max="9999999"
            min={minDealSize}
            step="any"
            type="number"
            value={props.size}
            onChange={inputChange}
          />
        </FormGroup>
        <FormGroup label="Direction">
          <div>
            <button className="btn btn--price btn--price--above" onClick={createSubmitHandler('BUY')}>above</button>
            <div>{strike}</div>
            <button className="btn btn--price btn--price--below" onClick={createSubmitHandler('SELL')}>below</button>
          </div>
        </FormGroup>
      </form>
    </section>
  );
};

TicketForm.propTypes = {
  minDealSize: PropTypes.number.isRequired,
  size: PropTypes.number,
  strike: PropTypes.number.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TicketForm;
