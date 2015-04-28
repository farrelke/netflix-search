#!/usr/bin/env node
var program  = require('commander');


program
  .usage('<command>')
  .command('search', 'search for a show by title or word')
  .on('--help', printHelp)
  .parse(process.argv);

function printHelp(){
  console.log('See --help on each command for usage examples for that command');
  console.log('`man rado` for more info about this program');
}