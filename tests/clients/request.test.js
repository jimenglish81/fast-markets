import { describe, it } from 'mocha';
import { expect } from 'chai';
import { checkStatus } from '../../src/js/clients/request';

const createResponse = (status, statusText='') => {
  return { status, statusText };
}
describe('Request', () => {
  it('can check status of ok response', () => {
    expect(checkStatus(createResponse(200)).status).to.equal(200);
    expect(checkStatus(createResponse(201)).status).to.equal(201);
    expect(checkStatus(createResponse(299)).status).to.equal(299);
  });

  it('can check status of not ok response and throws', () => {
    expect(() => checkStatus(createResponse(500, 'bad request'))).to.throw(/bad request/);
    expect(() => checkStatus(createResponse(401, 'unauthorized'))).to.throw(/unauthorized/);
  });
});
