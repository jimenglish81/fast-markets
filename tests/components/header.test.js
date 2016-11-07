import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/js/components/header';

describe('<Header />', () => {
  it('renders a header correctly', () => {
    const children = <div className="child-node">header</div>;
    const wrapper = shallow(<Header children={children} />);

    expect(wrapper.find('.nav')).to.have.lengthOf(1);
    expect(wrapper.find('.nav__logo')).to.have.lengthOf(1);
    expect(wrapper.find('.nav__title')).to.have.lengthOf(1);
    expect(wrapper.find('.child-node')).to.have.lengthOf(1);
  });
});
