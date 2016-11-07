import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Success from '../../../src/js/components/confirm/success';

describe('<Success />', () => {
  it('renders', () => {
    const wrapper = shallow(<Success />);

    expect(wrapper.find('[data-confirm-success]')).to.have.lengthOf(1);
  });
});
