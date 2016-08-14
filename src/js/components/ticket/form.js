import React from 'react';
import { FormGroup } from '../common/form';

const TicketForm = () => {
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
        <FormGroup label="Expiry">
          <div className="expiry">
            <label>
              <input
                name="expiry"
                type="radio"
                value="1"
              />
              <span>1</span>
            </label>
            <label>
              <input
                name="expiry"
                type="radio"
                value="2"
              />
              <span>2</span>
            </label>
            <label>
              <input
                name="expiry"
                type="radio"
                value="5"
              />
              <span>5</span>
            </label>
          </div>
        </FormGroup>
        <FormGroup label="Direction">
          <label>
            <input
              name="direction"
              type="radio"
              value="above"
            />
            <span>above</span>
          </label>
          <div>1234.56</div>
          <label>
            <input
              name="direction"
              type="radio"
              value="below"
            />
            <span>below</span>
          </label>
        </FormGroup>
        <button>
          submit
        </button>
      </form>
    </section>
  );
}

export default TicketForm;
