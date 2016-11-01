import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import AuthForm from './index';
chai.use(sinonChai);

describe('<AuthForm />', () => {

  it('renders all fields', () => {
    const wrapper = shallow(<AuthForm
                              onFormSubmit={_.noop}
                              onInputChange={_.noop}
                            />);

    expect(wrapper.find('form')).to.have.lengthOf(1);
    expect(wrapper.find('input')).to.have.lengthOf(2);
    expect(wrapper.find('button')).to.have.lengthOf(1);
    expect(wrapper.find('FormGroup')).to.have.lengthOf(4);
  });

  it('correctly sets input placeholders', () => {
    const wrapper = shallow(<AuthForm
                              onFormSubmit={_.noop}
                              onInputChange={_.noop}
                            />);

    expect(wrapper.find('input').at(0).prop('placeholder')).to.equal('Username');
    expect(wrapper.find('input').at(1).prop('placeholder')).to.equal('Password');
  });

  it(`triggers 'onFormSubmit' when form is submitted`, () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AuthForm
                              onFormSubmit={spy}
                              onInputChange={_.noop}
                            />);

    wrapper.find('form').simulate('submit');
    expect(spy).to.have.been.calledOnce;
  });

  it(`triggers 'onInputChange' when 'identifier' input is changed`, () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AuthForm
                              onFormSubmit={_.noop}
                              onInputChange={spy}
                            />);
    const identifierInput = wrapper.find('input').at(0);

    identifierInput.simulate('change', {
      target: {
        value: 'foo',
      },
    });
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith('identifier', 'foo');
  });

  it(`triggers 'onInputChange' when 'password' input is changed`, () => {
    const spy = sinon.spy();
    const wrapper = shallow(<AuthForm
                              onFormSubmit={_.noop}
                              onInputChange={spy}
                            />);
    const identifierInput = wrapper.find('input').at(1);

    identifierInput.simulate('change', {
      target: {
        value: 'bar',
      },
    });
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith('password', 'bar');
  });
});
