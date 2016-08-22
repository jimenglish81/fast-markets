import React, { Component, PropTypes } from 'react';
import MarketDropdownOption from './dropdown-option';
import MarketName from './name';

class MarketDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount () {
    // TODO - touch
    document.addEventListener('click', this.onDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  onDocumentClick(evt) {
    if (!this._element.contains(evt.target)) {
      this.setState({
        isOpen: false,
      });
    }
  }

  onMouseDown() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderItems() {
    const {
      markets,
      onClick,
      selectedMarket
    } = this.props;

    return _.without(markets, selectedMarket).map((market) => {
      return (
        <MarketDropdownOption
          key={market.epic}
          onClick={onClick}
          market={market}
        />
      );
    });
  }

  render() {
    const selectedMarket = this.props.selectedMarket;
    const className = `market-dropdown${this.state.isOpen ? ' market-dropdown--open' : ''}`;

    return (
      <div className="market-dropdown" ref={(el) => this._element = el}>
        <div className="market-dropdown-selected" onMouseDown={this.onMouseDown}>
          <MarketName
            status={selectedMarket.status}
            marketName={selectedMarket.name}
          />
        <span className="market-dropdown-arrow" />
        </div>
        {this.state.isOpen ? <div className="market-dropdown-menu">{this.renderItems()}</div> : null}
      </div>
    );
  }
}

MarketDropdown.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMarket: PropTypes.object.isRequired,
};

export default MarketDropdown;
