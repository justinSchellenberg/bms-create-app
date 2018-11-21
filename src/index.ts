#!/usr/bin/env node
/* tslint:disable */
/* tslint:enable */

const program = require('commander')
  .version("0.0.1")
  .option('-d, --dir [dir]', 'The directory name to create and scaffold the App in', 'src')
  .option('-t, --ts', 'If flag is supplied, will Scaffold a Typescript App else will do a JavaScript App')
  .parse(process.argv);


console.log(program.dir);

