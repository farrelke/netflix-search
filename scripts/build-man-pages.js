#!/usr/bin/env node
var path     = require('path-extra');
var fs       = require('fs');
var _        = require('lodash');
var markedman= require('marked-man');

// var docspath = path.resolve(__dirname,'../doc');
var manpath  = path.resolve(__dirname,'../man');



//special case: readme.md is not in doc/
var readmePath = path.resolve(__dirname,'..','readme.md');
createManfile(readmePath, 'netflix-search');

function isMarkdown(filename){
  return path.extname(filename) === '.md';
}

function createManfile(mdpath, commandName){
  var manfilePath = path.join(manpath,commandName + '.1');
  var md = fs.readFileSync(mdpath,'utf8');
  fs.writeFileSync(manfilePath,markedman(md));
}