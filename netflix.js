#!/usr/bin/env node
var program  = require('commander');


program
  .usage('<command>')
  .command('search', 'search for a show by title or word')
  .command('go', 'go directly to netflix')
  .on('--help', printHelp)
  .parse(process.argv);

function printHelp(){
  console.log('See --help on each command for usage examples for that command');
  console.log('`man netflix-search` for more info about this program');
}