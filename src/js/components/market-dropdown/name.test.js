import React from 'react';
import { shallow } from 'enzyme';
import MarketName, {
  MARKET_STATUS_TRADEABLE_TITLE,
  MARKET_STATUS_UNTRADEABLE_TITLE
} from './name';

describe('<MarketName />', () => {

  ['TRADEABLE', 'UNTRADEABLE'].forEach((status) => {
    const lowerStatus = status.toLowerCase();
    it(`renders the correct market status for a ${lowerStatus} market`, () => {
      const wrapper = shallow(<MarketName name="FTSE" status={status} />);
      expect(wrapper.find(`.market-name__status--${lowerStatus}`)).to.have.lengthOf(1);
    });

    it(`sets the correct market status title for a ${lowerStatus} market`, () => {
      const wrapper = shallow(<MarketName name="Google" status={status} />);
      const title = wrapper.find('[data-market-name-status]').prop('title');
      expect(title).to.equal(lowerStatus === 'tradeable' ?
              MARKET_STATUS_TRADEABLE_TITLE : MARKET_STATUS_UNTRADEABLE_TITLE);
    });
  });

  it('renders the correct market name', () => {
    const wrapper = shallow(<MarketName name="Google" status="TRADEABLE" />);
    expect(wrapper.find('[data-market-name-title]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-market-name-title]').text()).to.equal('Google');
    expect(wrapper.find('[data-market-name-title]').prop('title')).to.equal('Google');
  });
});
