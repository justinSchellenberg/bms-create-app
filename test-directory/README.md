# Bold ES6 JavaScript Scaffold Configuration

## TODOs
- [x] Create a REPO for ES6 JavaScript Example
- [x] Create a Repo for Typescript Example
- [x] Improve yarn build script to upload only bundled assets
- [ ] Improve README.MD Documentation for usage
- [ ] allow yarn start command to be passed an --env for theme watch

## About
The goal of this tool is to allow us as developers the option to use ES6 and/or typescript if we so choose. The goal of this is to just enable us to have more options available to us if we so desire. For medium/large projects, this scaffold may be a viable option as having access to modules and code reuse can hasten our development time/workflow. This current example showcases ES6 with JavaScript. There is an Example that Showcases Typescript That can be seen Here(update link)

## Update gitIgnore

- Ensure .gitignore reflects similar to this one.

```shell
*___jb_old___*
*___jb_tmp___*
*.lock
.DS_Store
theme.lock
config.yml
settings_data.json
.idea/
.vscode/
node_modules/
src/node_modules
locksmith-content-variables.liquid
locksmith-variables.liquid
locksmith.liquid
bold-common.liquid
*.shogun.*
config.*.yml
*.cache*
src/dist/*

```

## Pre-requisites
- Install [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install)


## Getting Started
Ensure you are within the src directory, from project root `cd src`

Install node dependencies
```shell
# Run this if you are using yarn
$ yarn

# Or run this if you are using npm
$ npm install
```

## Building a bundle using an Entrypoint and Webpack
This project relies on webpack in order to build the file into a bundle. For configuration options, and file naming, will need to change the following `webpack.config.js`

The main point of interest within this file is the following:
```shell
module.exports = {
  entry: {
    BMSBlackFridayCoupons: './builds/BMS-BlackFridayCoupons.js'
    //something: './builds/anotherEntryPoint.js'
  },
```
The key for the object entry, will be the name of the bundle that will be placed within the shopify `assets/` directory.
So For example: `BMSBlackFridayCoupons: './builds/BMS-BlackFridayCoupons.js'`
This takes the file found at the location `/src/builds/BMS-BlackFridayCoupons.js` and bundles it, outputing it at the location of `/assets/BMSBlackFridayCoupons.bundle.js`

This is because of the specified output within `webpack.config.js`
```shell
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../assets')
  }
```

## Working locally

```shell
# Run this if you are using yarn
$ yarn start

# Or run this if you are using npm
$ npm start
```


This will start watching for file changes related to the entry point for the files being watched.
This command concurrently runs theme watch (for the default `development:`) environment from `config.yml` This in short allows to develop the files within es6, and then have the bundle be uploaded concurrently.

## Production build


To create a production build (Which minifies and optimizes the bundle code) , run the following command

```shell
# Run this if you are using yarn
$ yarn build
# Or run this if you are using npm
$ npm run build
```

This will create a javascript file in the /dist folder, this is for compiling the Typescript into Javascript. The bundled JavaScript is then automatically moved to the assets folder, as a minified bundle. Once this command has completed, it will then run `bmstk` This will then upload the bundled assets to the store. For more information on bmstk please see [here](https://www.npmjs.com/package/bms-theme-kit)


## Using Bold ES6 JavaScript Scaffold Configuration

Read the Full Usage guide (Coming soon?)
