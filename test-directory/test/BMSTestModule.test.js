import * as chai from 'chai';
import  Product  from '../classes/Product';

const expect = chai.expect;

describe('Class - Product - Get - staticVariable', () => {
  it('should return Static Variable', () => {
    expect(Product.staticVariable).to.be.equal("staticVariable");
  });
});
