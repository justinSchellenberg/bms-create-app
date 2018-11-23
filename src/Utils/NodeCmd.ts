import { cp, exec, ls, mkdir, mv, pwd, test } from 'shelljs';

const fs = require('fs');

export default class NodeCmdUtil {
  public static reactModule: string = 'react';
  public static typescriptModule: string = 'typescript';
  public static es6Module: string = 'bms-webpack-js-example';
  public static getDirectoryCommand: string = 'npm config get prefix';

  public static executeCmd(cmd: string): string {
    const res = exec(cmd);
    if (res.stderr) {
      throw new Error(res.stderr);
    }
    return res.stdout;
  }

  public static getNpmModule(type: string | null): string {
    if (type === 'react') {
      return NodeCmdUtil.reactModule;
    } else if (type === 'tsc') {
      return NodeCmdUtil.typescriptModule;
    }
    return NodeCmdUtil.es6Module;
  }

  public static validateName(name: string): void {
    if (name.toLowerCase() !== name) {
      throw new Error('Name can no longer contain capital letters');
    }
    if (name.charAt(0) === '.' || name.charAt(0) === '_') {
      throw new Error('The name can’t start with a dot or an underscore.');
    }
  }

  /**
   *
   * @param {string} type - The String to test
   * @param {RegExp} regExpStr - The Regular Expression
   * @returns {boolean} - Returns true if the regExp Matches, else returns false.
   */
  public static validateType(type: string, regExpStr: RegExp): boolean {
    const regex = new RegExp(regExpStr);
    return regex.test(type);
  }

  public static isWindows(): boolean {
    return process.platform === 'win32';
  }

  public static isMac(): boolean {
    return process.platform === 'darwin';
  }

  public static getSlash() {
    return NodeCmdUtil.isWindows() ? '\\' : '/';
  }

  public static getDirectory(module: string): string {
    const preFixDirectory = NodeCmdUtil.executeCmd(NodeCmdUtil.getDirectoryCommand);
    const directory = NodeCmdUtil.isWindows()
      ? `${preFixDirectory}${NodeCmdUtil.getSlash()}node_modules${NodeCmdUtil.getSlash()}${module}`
      : `${preFixDirectory}${NodeCmdUtil.getSlash()}lib${NodeCmdUtil.getSlash()}node_modules${NodeCmdUtil.getSlash()}${module}`;

    return directory.replace(/(\r\n\t|\n|\r\t)/gm, '');
  }

  public static copyFiles(path: string, source: string) {
    ls(path).forEach(file => {
      if (file !== 'node_modules' && file !== 'package.json') {
        cp('-Rf', `${path}/${file}`, `./${source}`);
      }
    });
    mv(`./${source}/package-example.json`, `./${source}/package.json`);
  }

  public static makeDirectory(dir: string): void {
    mkdir(dir);
  }

  public static isDirectoryExist(dir: string): boolean {
    return test('-d', `./${dir}`);
  }

  public static getPwd(): string {
    return pwd();
  }

  public static getFile(filePath: string) {
    if (!test('-e', filePath)) {
      throw new Error(`Tried to read file at ${filePath}, But IT DOESN'T EXIST!`);
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  public static writeFile(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data, 'utf8');
  }
}
