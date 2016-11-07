import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '../../../../src/js/components/common/form/group';

describe('<FormGroup />', () => {
  it(`renders expected content iwth 'children' as Array`, () => {
    const children = [(<div key="1">child</div>)];
    const wrapper = shallow(<FormGroup>
                              {children}
                            </FormGroup>);

    expect(wrapper.find('[data-form-group]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-group-label]')).to.have.lengthOf(0);
    expect(wrapper.find('[data-form-group-content]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-group-content]').children().equals(children[0])).to.be.true;
  });

  it(`renders expected content iwth 'children' as Element`, () => {
    const child = (<div key="1">child</div>);
    const wrapper = shallow(<FormGroup>
                              {child}
                            </FormGroup>);

    expect(wrapper.find('[data-form-group]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-group-label]')).to.have.lengthOf(0);
    expect(wrapper.find('[data-form-group-content]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-group-content]').children().equals(child)).to.be.true;
  });

  it(`renders expected label when supplied`, () => {
    const children = [(<div key="1">child</div>)];
    const label = 'my label';
    const wrapper = shallow(<FormGroup label={label}>
                              {children}
                            </FormGroup>);

    expect(wrapper.find('[data-form-group-label]')).to.have.lengthOf(1);
    expect(wrapper.find('[data-form-group-label]').text()).to.include(label);
  });
});
