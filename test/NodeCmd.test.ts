import * as chai from 'chai';
import NodeCmdUtil from '../src/Utils/NodeCmd';

import { pwd } from 'shelljs';

const expect = chai.expect;

describe('NodeCmd - getNpmModuleDirectory', () => {
  it('should return The path to global npm directory when given cmd npm config get prefix', (done) => {
    expect(NodeCmdUtil.executeCmd('npm config get prefix').replace(/(\r\n\t|\n|\r\t)/gm, '')).to.be.a('string');
    done();
  });
  it('should throw error if the cmd supplied as invalid', (done) => {
    try {
      expect(NodeCmdUtil.executeCmd('npm invalidcommandsuppollied')).to.throw(Error);
    } catch(err) {
      expect(err.message).to.be.a('string');
      done();
    }
  })
});

describe('NodeCmd - getNpmModule', () => {
  it('should return Javascript Npm Module when given no arguments', () => {
    expect(NodeCmdUtil.getNpmModule(null)).to.be.equal(NodeCmdUtil.es6Module);
  });
});

describe('NodeCmd - validateType', () => {
  it('should return true if str matches regexp', () => {
    expect(NodeCmdUtil.validateType('react', /^(es6|react|typescript)$/i)).to.be.true;
    expect(NodeCmdUtil.validateType('typescript', /^(es6|react|typescript)$/i)).to.be.true;
    expect(NodeCmdUtil.validateType('es6', /^(es6|react|typescript)$/i)).to.be.true;
  });
  it('should return false if str does not match regexp', () => {
    expect(NodeCmdUtil.validateType('reacttt', /^(es6|react|typescript)$/i)).to.be.false;
    //expect(NodeCmdUtil.validateType('tYpescript', /^(es6|react|typescript)$/i)).to.be.false;
    expect(NodeCmdUtil.validateType('es', /^(es6|react|typescript)$/i)).to.be.false;
  })
});

describe('NodeCmd - isWindows, isMac', () => {
  const windows = "win32";
  const mac = "darwin";
  
  it('should return true if on windows', () => {
    if(process.platform === windows){
      expect(NodeCmdUtil.isWindows()).to.be.true;
    }
    else if(process.platform === mac){
      expect(NodeCmdUtil.isMac()).to.be.true;
    }
  });
  it('should return false if NOT on windows', () => {
    if(process.platform === mac){
      expect(NodeCmdUtil.isWindows()).to.be.false;
    }
    else if(process.platform === windows){
      expect(NodeCmdUtil.isMac()).to.be.false;
    }
  });
});


describe('NodeCmd - getSlash', () => {
  const windows = "win32";
  const mac = "darwin";
  
  it('should return / if on Mac', () => {
    if(process.platform === mac){
      expect(NodeCmdUtil.getSlash()).to.be.equal('/');
    }
  })
  it('should return \\ if on windows', () => {
    if(process.platform === windows){
      expect(NodeCmdUtil.getSlash()).to.be.equal('\\');
    }
  });
});

describe('NodeCmd - getDirectory', () => {
  const windows = "win32";
  const mac = "darwin";

  it('should return Node Module location if on mac', () => {
    if(process.platform === mac){
      expect(NodeCmdUtil.getDirectory('bms-webpack-js-example')).to.be.equal(`${NodeCmdUtil.executeCmd("npm config get prefix")}/lib/node_modules/bms-webpack-js-example`.replace(/(\r\n\t|\n|\r\t)/gm,""));
    }
  })
  it('should return Node Module location if on windows', () => {
    if(process.platform === windows){
      expect(NodeCmdUtil.getDirectory('bms-webpack-js-example')).to.be.equal(`${NodeCmdUtil.executeCmd("npm config get prefix")}\\node_modules\\bms-webpack-js-example`.replace(/(\r\n\t|\n|\r\t)/gm,""));
    }
  });
});

describe('NodeCmd - isDirectoryExist', () => {

  it('should return true if directory exists', () => {
    expect(NodeCmdUtil.isDirectoryExist('test')).to.be.true;
  })
  it('should return false if directory does not exist', () => {
    expect(NodeCmdUtil.isDirectoryExist('tesssst')).to.be.false;
  });
});

describe('NodeCmd - getFile', () => {
  const path = `${pwd()}${NodeCmdUtil.getSlash()}test_mocks${NodeCmdUtil.getSlash()}package.json`;

  it('should return file contents if file exists', () => {
    expect(NodeCmdUtil.getFile(path)).to.be.equal("{\n" +
      "  \"name\": \"bms-webpack-js-example\",\n" +
      "  \"version\": \"0.0.2\",\n" +
      "  \"description\": \"\",\n" +
      "  \"main\": \"index.js\"\n" +
      "}");
  })
  it('should throw error if path provided is invalid', () => {
    try{
      expect(NodeCmdUtil.getFile('some/invalid/path/propvidedlakdsf')).to.throw(Error);
    }
    catch(err){
      expect(err.message).to.be.a('string');
    }
  })
});