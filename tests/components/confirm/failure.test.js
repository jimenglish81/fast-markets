import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Failure from '../../../src/js/components/confirm/failure';

describe('<Failure />', () => {
  it('renders', () => {
    const wrapper = shallow(<Failure />);

    expect(wrapper.find('[data-confirm-failure]')).to.have.lengthOf(1);
  });
});
