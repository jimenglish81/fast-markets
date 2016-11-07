import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import { jsdom } from 'jsdom';
import { mount } from 'enzyme';
import Chart from '../../../src/js/components/chart/index';

const generatePoints = () => {
  return [
    { timestamp: '2016/11/04 05:45:01', price: 101 },
    { timestamp: '2016/11/04 05:45:02', price: 102 },
    { timestamp: '2016/11/04 05:45:03', price: 103 },
    { timestamp: '2016/11/04 05:45:04', price: 104, },
  ];
};

describe('<Chart />', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    const doc = jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
  });

  afterEach(() => {
    clock.restore();
  });

  it('can render a chart', () => {
    const wrapper = mount(<Chart dataPoints={generatePoints()} />);
    expect(wrapper.find('svg')).to.have.lengthOf(1)
  });
});
