import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Confirm as ConfirmComponent } from '../../components/confirm';

class Confirm extends Component {
  render() {
    if (this.props.confirm) {
      const {
        confirm: {
          reason,
        },
      } = this.props;

      return (
        <ConfirmComponent state={reason} />
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
    trade,
  } = state;

  return {
    confirm,
  };
}

export default connect(mapStateToProps)(Confirm);
