import React from 'react';
import { FormGroup } from '../common/form';
import MarketDropdown from '../market/dropdown';

const markets = [
  {
    epic: 'W.IP',
    status: 'dealable',
    name: 'FTSE',
  },
  {
    epic: 'V.IP',
    status: 'undealable',
    name: 'Google',
  }
]

const TicketForm = () => {
  return (
    <section className="ticket">
      <form className="ticket-form">
        <FormGroup>
          <MarketDropdown
            markets={markets}
            selectedMarket={markets[0]}
            onClick={() => console.log(arguments)}
          />
        </FormGroup>
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
