import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import FormError from '../../../../src/js/components/common/form/error';

describe('<FormError />', () => {
  it(`does not render when 'error' prop is not supplied`, () => {
    const wrapper = shallow(<FormError />);

    expect(wrapper.find('[data-form-error]')).to.have.lengthOf(0);
  });

  it(`does render when 'error' prop is supplied`, () => {
    const msg = 'error message';
    const wrapper = shallow(<FormError
                              error={msg}
                            />);

    expect(wrapper.find('[data-form-error]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-error]').text()).to.equal(msg);
  });
});
