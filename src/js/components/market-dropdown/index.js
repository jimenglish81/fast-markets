import React, { Component, PropTypes } from 'react';
import MarketDropdownOption from './option';
import MarketName from './name';

/**
 * Dropdown allow user to pick Sprint Market.
 * @extends {React.Component}
 * @param {Object} props
 * @param {Object[]} props.markets
 * @param {Function} props.onClick
 * @param {Object} props.selectedMarket
 */
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

  /**
   * Attach document click listener.
   * @private
   */
  componentDidMount () {
    // TODO - touch
    document.addEventListener('click', this.onDocumentClick, false);
  }

  /**
   * Detach document click listener.
   * @private
   */
  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  /**
   * Handle document click.
   * @private
   * @param {Event} evt Simulated DOM event.
   */
  onDocumentClick(evt) {
    if (!this._element.contains(evt.target)) {
      this.setState({
        isOpen: false,
      });
    }
  }

  /**
   * Handle mouse down on Element.
   * @private
   */
  onMouseDown() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * Handle click of child  option by proxying on call with Market object.
   * @private
   * @param {Object} market
   */
  onMarketClick(market) {
    this.props.onClick(market);
    this.setState({
      isOpen: false,
    });
  }

  /**
   * Render options.
   * @private
   */
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

  /**
   * Render Component.
   * @public
   */
  render() {
    const {
      selectedMarket: {
        instrumentName,
        marketStatus,
      },
    } = this.props;

    return (
      <div className={this.className} ref={(el) => this._element = el}>
        <div className="market-dropdown__selected" onMouseDown={this.onMouseDown}>
          <MarketName
            status={marketStatus}
            name={instrumentName}
          />
        <span className="market-dropdown__arrow" />
        </div>
        {this.state.isOpen ? <div className="market-dropdown__menu">{this.renderItems()}</div> : null}
      </div>
    );
  }

  get className() {
    return `market-dropdown${this.state.isOpen ? ' market-dropdown--open' : ''}`;
  }
}

MarketDropdown.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedMarket: PropTypes.object.isRequired,
};

export default MarketDropdown;
