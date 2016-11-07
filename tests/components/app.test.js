import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/js/components/app';

describe('<App />', () => {
  it('renders app correctly', () => {
    const text = 'child';
    const children = <div>{text}</div>;
    const wrapper = shallow(<App children={children} />);

    expect(wrapper.find('.fast-markets')).to.have.lengthOf(1);
    expect(wrapper.children()).to.have.lengthOf(3);
    expect(wrapper.find('.fast-markets-body').text()).to.equal(text);
  });
});
