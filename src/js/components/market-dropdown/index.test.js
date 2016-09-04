import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import MarketDropdown from './index';

const createMarkets = (amount) => {
    return _.times(amount).map((i) => ({
      epic: `epic_${i}`,
      instrumentName: `market_${i}`,
      marketStatus: `status_${i}`,
    }));
};

describe('<MarketDropdown />', () => {
  let addListenerSpy;
  let removeListenerSpy;

  beforeEach(() => {
    addListenerSpy = sinon.spy(document, 'addEventListener');
    removeListenerSpy = sinon.spy(document, 'removeEventListener');
  });

  afterEach(() => {
    addListenerSpy.restore();
    removeListenerSpy.restore();
  });

  it('renders the selected market', () => {
    const markets = createMarkets(2);
    const [selectedMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);

    expect(wrapper.find('MarketName')).to.have.lengthOf(1);
    expect(wrapper.find('MarketName').text()).to.have.equal(selectedMarket.instrumentName);
  });

  it('updates the selected market when set as a prop', () => {
    const markets = createMarkets(3);
    const [selectedMarket, nextMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);

    wrapper.setProps({
      selectedMarket: nextMarket,
    });

    expect(wrapper.find('MarketName')).to.have.lengthOf(1);
    expect(wrapper.find('MarketName').text()).to.have.equal(nextMarket.instrumentName);
  });

  it(`toggles visibility and shows correct amount of markets when 'isOpen' state set`, () => {
    const markets = createMarkets(3);
    const [selectedMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);

    wrapper.setState({
      isOpen: true,
    });
    expect(wrapper.find('MarketDropdownOption')).to.have.lengthOf(2);

    wrapper.setState({
      isOpen: false,
    });
    expect(wrapper.find('MarketDropdownOption')).to.have.lengthOf(0);
  });

  it(`doesn't render the selected market as an option`, () => {
    const markets = createMarkets(3);
    const [selectedMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);

    wrapper.setState({
      isOpen: true,
    });
    const names = wrapper.find('MarketDropdownOption').map((node) => {
      return node.text();
    });
    expect(names).to.not.include(selectedMarket.name);
  });

  it('attaches and removes a document click listener', () => {
    const markets = createMarkets(2);
    const [selectedMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);
    const handler = wrapper.instance().onDocumentClick;

    expect(addListenerSpy).to.have.been.calledOnce;
    expect(addListenerSpy).to.have.been.calledWith('click', handler, false);
    expect(removeListenerSpy).to.have.been.notCalled;

    wrapper.unmount();
    expect(removeListenerSpy).to.have.been.calledOnce;
    expect(removeListenerSpy).to.have.been.calledWith('click', handler, false);
  });

  it(`toggles 'isOpen' state on mouse down`, () => {
    const markets = createMarkets(2);
    const [selectedMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={_.noop}
                          />);

    expect(wrapper.state('isOpen')).to.be.false;
    wrapper.instance().onMouseDown();
    expect(wrapper.state('isOpen')).to.be.true;
  });

  it(`toggles 'isOpen' state to false and invokes 'onClick when 'onMarketClick' is run`, () => {
    const spy = sinon.spy();
    const markets = createMarkets(2);
    const [selectedMarket, nextMarket] = markets;
    const wrapper = mount(<MarketDropdown
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onClick={spy}
                          />);

    wrapper.instance().onMarketClick(nextMarket);
    expect(wrapper.state('isOpen')).to.be.false;
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith(nextMarket);
  });
});
