import React, { PropTypes } from 'react';
import numeral from 'numeral';
import { conditionalRender } from '../../utils';

const TicketForm = (props) => {
  const inputChange = ({ target }) => {
    props.onSizeChange(target.value);
  };
  const createSubmitHandler = (direction) => (evt) => {
    evt.preventDefault();
    props.onSubmit(direction);
  };
  const {
    minDealSize,
    payout,
    strike,
    size,
  } = props;

  return (
    <section className="ticket">
      <form className="ticket-form">
        <section className="ticket-form__group">
          <div className="ticket-form__group__label">
            <label>Stake:</label>
          </div>
          <div className="ticket-form__group__field">
            <input
              placeholder={`Min: ${minDealSize}`}
              autoComplete="off"
              max="9999999"
              min={minDealSize}
              step="any"
              type="number"
              value={size}
              onChange={inputChange}
            />
          </div>
        </section>
        <section className="ticket-form__group">
          <div className="ticket-form__group__label">
            <label>Direction:</label>
          </div>
          <div className="ticket-form__group__field">
            <div className="ticket-form__direction">
              <button
                className="btn btn--price btn--price--above"
                onClick={createSubmitHandler('BUY')}>
                above
              </button>
              <div className="ticket-form__direction__strike">
                {numeral(strike).format('0,0.00')}
              </div>
              <button
                className="btn btn--price btn--price--below"
                onClick={createSubmitHandler('SELL')}>
                below
              </button>
            </div>
          </div>
        </section>
        <section className="ticket-form__group">
          <div className="ticket-form__group">
            <div className="ticket-form__group__label">
              <label>Payout:</label>
            </div>
            <div className="ticket-form__group__field">
              <div className="ticket-form__direction__strike">
                {conditionalRender(payout, numeral(payout).format('0,0.00'), '-')}
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

TicketForm.propTypes = {
  minDealSize: PropTypes.number.isRequired,
  size: PropTypes.number,
  strike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  payout: PropTypes.number,
  onSizeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TicketForm;
