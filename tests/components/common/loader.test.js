import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../src/js/components/common/loader';

describe('<Loader />', () => {
  it('renders', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.loader')).to.have.lengthOf(1);
    expect(wrapper.find('svg')).to.have.lengthOf(1);
  });
});
