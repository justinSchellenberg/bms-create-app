#!/usr/bin/env node
/* tslint:disable:no-console */
import { NodeCmdUtil } from './Utils';

const chalk = require('chalk');
const expression = /^(es6|preact|react|typescript)$/i;

const program = require('commander')
  .version('0.1.3')
  .option('-d, --dir [dir]', 'The directory name to create and scaffold the App in', 'src')
  .option('-t, --type [type]', 'Application Type (es6|preact|react|typescript)', 'es6')
  .parse(process.argv);

let moduleDirectory = '';

try {
  if (program.type !== null && !NodeCmdUtil.validateType(program.type, expression)) {
    throw new Error('Invalid Supplied --type Argument! To see types run "npx bms-create-app --help"');
  }
  if (NodeCmdUtil.isDirectoryExist(program.dir)) {
    throw new Error('The supplied --dir directory already exists!');
  }
  NodeCmdUtil.validateName(program.dir);

  const npxModule = NodeCmdUtil.getNpmModule(program.type);
  const command = `npm install -g ${npxModule}`;

  moduleDirectory = NodeCmdUtil.getDirectory(npxModule);

  NodeCmdUtil.setIsNpmInstall(true); // before we try to install npm,
  NodeCmdUtil.executeCmd(command);
  copyFiles(moduleDirectory);
} catch (err) {
  if (!NodeCmdUtil.isNpmWarning(err.message)) {
    console.error(chalk.red('Error occurred!'));
    console.error(chalk.red(`* ${err.message}`));
    process.exit(1);
  }
  copyFiles(moduleDirectory);
}

function copyFiles(moduleDir: string) {
  NodeCmdUtil.setIsNpmInstall(false);

  NodeCmdUtil.makeDirectory(program.dir);
  NodeCmdUtil.copyFiles(moduleDir, program.dir);

  const filePath = `${NodeCmdUtil.getPwd()}${NodeCmdUtil.getSlash()}${
    program.dir
  }${NodeCmdUtil.getSlash()}package.json`;
  const packageJsonJavascript = JSON.parse(NodeCmdUtil.getFile(filePath));

  packageJsonJavascript.version = '0.0.1';
  packageJsonJavascript.name = program.dir;
  delete packageJsonJavascript.scripts.prepublish;

  NodeCmdUtil.writeFile(filePath, JSON.stringify(packageJsonJavascript, null, 2));

  console.log(
    chalk.green(`Successfully Created app located at ${NodeCmdUtil.getPwd()}${NodeCmdUtil.getSlash()}${program.dir}`),
  );
}
