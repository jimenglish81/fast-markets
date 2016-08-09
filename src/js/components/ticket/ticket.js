import React from 'react';

const Ticket = () => {
  return (
    <form>
      <div className="field-group">
        <label>Stake:</label>
        <input
          placeholder="Stake"
          className="form-control"
        />
      </div>
      <div className="field-group">
        <label>Expiry:</label>
        <input
          placeholder="Expiry"
          className="form-control"
        />
      </div>
      <div className="field-group">
        <label>Direction:</label>
        <div>above</div>
        <div>price</div>
        <div>above</div>
      </div>
      <div className="field-group">
        <button>submit PAYOUT</button>
      </div>
    </form>
  );
}

export default Ticket;
