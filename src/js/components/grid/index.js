import React, { Component, PropTypes } from 'react';

/**
 */
class Grid extends Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    return '';
  }

  render() {
    return (
      <div style={this.getStyle()}>
        {this.renderItems()}
        {this.renderItems()}
      </div>
    )
  }
}

export default Grid;
