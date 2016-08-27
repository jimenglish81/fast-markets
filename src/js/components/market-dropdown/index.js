import React, { Component, PropTypes } from 'react';
import MarketDropdownOption from './option';
import MarketName from './name';

class MarketDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMarketClick = this.onMarketClick.bind(this);
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

  onMarketClick(market) {
    this.props.onClick(market);
    this.setState({
      isOpen: false,
    });
  }

  renderItems() {
    const {
      markets,
      selectedMarket
    } = this.props;

    return markets
      .filter(({ epic }) => selectedMarket.epic !== epic)
      .map((market) => {
        return (
          <MarketDropdownOption
            key={market.epic}
            onClick={this.onMarketClick}
            market={market}
          />
        );
      });
  }

  render() {
    const selectedMarket = this.props.selectedMarket;
    const className = `market-dropdown${this.state.isOpen ? ' market-dropdown--open' : ''}`;

    return (
      <div className={className} ref={(el) => this._element = el}>
        <div className="market-dropdown__selected" onMouseDown={this.onMouseDown}>
          <MarketName
            status={selectedMarket.marketStatus}
            name={selectedMarket.instrumentName}
          />
        <span className="market-dropdown__arrow" />
        </div>
        {this.state.isOpen ? <div className="market-dropdown__menu">{this.renderItems()}</div> : null}
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
