import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Countdown, { TAU } from '../../../src/js/components/common/countdown';

describe('<Countdown />', () => {
  [0, 50, 100].forEach((value) => {
    it(`renders a countdown with ${value}%`, () => {
      const percentage = value / 100;
      const wrapper = shallow(<Countdown
                                background={'red'}
                                foreground={'blue'}
                                percentage={percentage}
                              />);
      const outer = wrapper.find('[data-countdown-outer]');
      const inner = wrapper.find('[data-countdown-inner]');

      expect(outer).to.have.lengthOf(1);
      expect(outer.props().style.fill).to.equal('red');
      expect(inner).to.have.lengthOf(1);
      expect(inner.props().style.fill).to.equal('blue');
      expect(inner.props()['data-end-angle']).to.equal(TAU * percentage);
    });
  });
});
