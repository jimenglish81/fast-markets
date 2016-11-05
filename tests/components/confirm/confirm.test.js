import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Confirm from '../../../src/js/components/confirm/confirm';

describe('<Confirm />', () => {
  ['Success', 'Failure'].forEach((status) => {
    it('renders a success confirm', () => {
      const message = `is${status}`;
      const wrapper = shallow(<Confirm
                                isSuccess={status === 'Success'}
                                message={message}
                              />);

      expect(wrapper.find('.confirm__text').text()).to.equal(message);
      expect(wrapper.find(status)).to.have.lengthOf(1);
    });
  });
});
