import React from 'react';
import { shallow } from 'enzyme';
import MarketDropdownOption from './option';

describe('<MarketDropdownOption />', () => {
  let spy;
  const market = {
    marketStatus: 'foo',
    instrumentName: 'bar',
  };

  beforeEach(() => {
    spy = sinon.spy();
  });

  it('renders a MarketName', () => {
    const wrapper = shallow(<MarketDropdownOption
                            market={market}
                            onClick={spy}
                          />);
    expect(wrapper.find('MarketName')).to.have.lengthOf(1);
  });

  it('adds a click handler', () => {
    const wrapper = shallow(<MarketDropdownOption
                            market={market}
                            onClick={spy}
                          />);
    wrapper.find('[data-market-dropdown-item]').simulate('click');
    expect(spy).to.have.been.calledOnce;
  });
});
