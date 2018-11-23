#!/usr/bin/env node
/* tslint:disable:no-console */
import { NodeCmdUtil } from './Utils';

const chalk = require('chalk');
const expression = /^(es6|react|typescript)$/i;

const program = require('commander')
  .version("0.0.1")
  .option('-d, --dir [dir]', 'The directory name to create and scaffold the App in', 'src')
  .option('-t, --type <type>', 'Application Type (es6|react|typescript)', expression , "es6")
  .parse(process.argv);

try{
  if(program.type && !NodeCmdUtil.validateType(program.type, expression)){
    throw new Error("Invalid Supplied --type Argument!");
  }
  if(NodeCmdUtil.isDirectoryExist(program.dir)){
    throw new Error("The supplied --dir directory already exists!");
  }
  NodeCmdUtil.validateName(program.dir);
  
  const npxModule = NodeCmdUtil.getNpmModule(program.type);
  const command = `npm install -g ${npxModule}`;
  
  NodeCmdUtil.executeCmd(command);
  const moduleDirectory = NodeCmdUtil.getDirectory(npxModule);
  
  NodeCmdUtil.makeDirectory(program.dir);
  NodeCmdUtil.copyFiles(moduleDirectory, program.dir);
  
  const filePath = `${NodeCmdUtil.getPwd()}${NodeCmdUtil.getSlash()}${program.dir}${NodeCmdUtil.getSlash()}package.json`;
  
  const packageJsonJavascript = JSON.parse(NodeCmdUtil.getFile(filePath));
  
  packageJsonJavascript.version = "0.0.1";
  packageJsonJavascript.name = program.dir;
  delete packageJsonJavascript.scripts.prepublish;
  
  NodeCmdUtil.writeFile(filePath, JSON.stringify(packageJsonJavascript, null, 2));
  
  console.log(chalk.green(`Successfully Created app located at ${NodeCmdUtil.getPwd()}${NodeCmdUtil.getSlash()}${program.dir}`));
}
catch(err){
  console.error(chalk.red(`* ${err.message}`));
}
