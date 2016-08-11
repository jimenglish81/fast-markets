import React from 'react';

const Ticket = () => {
  return (
    <section className="ticket">
      <div className="ticket-form">
        <form>
          <section className="ticket-form__ticket-form-group col_group">
            <div className="col_2">
              <label>Stake: </label>
            </div>
            <div className="col_2">
              <input
                placeholder="Min: 1"
                autoComplete="off"
                max="9999999"
                min="1"
                step="any"
                type="number"
              />
            </div>
          </section>

          <section className="ticket-form__ticket-form-group col_group">
            <div className="col_2">
              <label>Expiry: </label>
            </div>
            <div className="col_2 expiry">
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
          </section>

        </form>
      </div>
    </section>
  );
}

export default Ticket;
