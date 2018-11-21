import * as chai from 'chai';
import NodeCmdUtil from '../src/Utils/NodeCmd';

const expect = chai.expect;

describe('NodeCmd - getNpmModuleDirectory', () => {
  it('should return The path to global npm directory when given cmd npm config get prefix', () => {
    expect(NodeCmdUtil.executeCmd('npm config get prefix')).to.have.string('npm');
  });
  it('should throw error if the cmd supplied as invalid', () => {
    try {
      expect(NodeCmdUtil.executeCmd('npm invalidcommandsuppollied')).to.throw(Error);
    } catch(err) {
      expect(err.message).to.be.a('string');
    }
  })
});