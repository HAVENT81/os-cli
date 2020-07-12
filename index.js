#! /usr/bin/env node

const pkg = require('./package.json')

// console.log(`version: ${pkg.version}`)
console.log(`author: ${pkg.author}`)

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version(pkg.version, '-v, --version')
    .description(pkg.description)
