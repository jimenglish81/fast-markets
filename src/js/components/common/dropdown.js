import React, { PropTypes } from 'react';

const DropDown = (props) => {
  const renderItems = (items) => {
    items.map((item) => {
      return (
        <Option value={} />
      );
    });
  };

  return (
    <div>
      {renderItems(props.items)}
    </div>
  );
};
