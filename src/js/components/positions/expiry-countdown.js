import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Countdown from '../common/countdown';

class ExpiryCountdown extends Component {
  constructor(props) {
    super(props);
    const {
      position: {
        createdDate,
        expiryTime,
      },
    } = props;
    const expiryUtc = moment.utc(expiryTime);

    this.state = {
      expiryUtc,
      expiryInSeconds: expiryUtc.diff(moment.utc(createdDate), 'seconds'),
      percentage: 0,
    };
  }

  _tick() {
    const {
      expiryUtc,
      expiryInSeconds,
    } = this.state;
    const timeInSeconds = expiryUtc.diff(moment.utc(), 'seconds');
    this.setState({
      percentage: 1 - (timeInSeconds / expiryInSeconds),
    });
    this._timeout = window.setTimeout(() => this._tick(), 1000);
  }

  componentWillMount() {
    this._tick();
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeout);
  }

  render() {
    return (
      <Countdown
        foreground={this.props.isWinning ? '#1bc98e' : '#e64759'}
        background={'#51586a'}
        percentage={this.state.percentage}
      />
    );
  }
}

ExpiryCountdown.propTypes = {
  isWinning: PropTypes.bool,
  position: PropTypes.object.isRequired,
};

export default ExpiryCountdown;
