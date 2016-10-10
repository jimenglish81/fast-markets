import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Confirm as ConfirmComponent } from '../../components/confirm';

const generateMessage = (isSuccess, instrumentName) => {
  const message = isSuccess ?
    `Deal placed` : `Deal rejected`;

  if (instrumentName) {
    return `${message} on ${instrumentName}.`;
  }

  return `${message}.`;
};

class Confirm extends Component {
  render() {
    const { confirm } = this.props;
    if (!_.isEmpty(confirm)) {
      const isSuccess = confirm.reason === 'SUCCESS';
      const message = generateMessage(isSuccess, confirm.instrumentName);

      return (
        <ConfirmComponent
          isSuccess={isSuccess}
          message={message}
        />
      );
    }

    return null;
  }
}

Confirm.propTypes = {
  confirm: PropTypes.object,
};

function mapStateToProps(state) {
  const {
    trade: {
      confirm,
    },
  } = state;

  return {
    confirm,
  };
}

export default connect(mapStateToProps)(Confirm);
