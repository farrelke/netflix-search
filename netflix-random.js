#!/usr/bin/env node
var netflixApi = require('./lib/netflixRouletteApi.js');
var exec = require('child_process').exec;
var yesno = require('yesno');
var program  = require('commander');
var colors = require('colors');
var _ = require('lodash');
var ImageToAscii = require('image-to-ascii');

program
  .option('-r, --rating <rating>','lowest rating movie you want to see')
  .option('-a, --actor <actor>','search by actor')
  .option('-d, --director <director>','search by director') 
  .option('-k, --keyword <keyword>','search by keyword') 
  .description('finds a netflix movie randomly using Netflix Roulette')
  .parse(process.argv);


console.log('powered by Netflix Roulette');

var defaults = {
	rating: 1.0,
	actor: 'none',
	director: 'none',
	keyword: 'none'
};

var argv = _.defaults(
  program,
  defaults
);



function SearchRandomMovie(){
	netflixApi.getRandomMovie(argv).then(function(movie){
		printMovie(movie);
		spinAgain(convertToNetflixPage(movie.direct_link));		
	});
}


function convertToNetflixPage(link){
	return link.replace("WiPlayer?movieid=", 'WiMovie/'); 
}

function printMovie(movie){

	console.log("");
	console.log(colors.blue.bold(movie.title));
	console.log(colors.red('Netflix rating - ' + movie.rating));
	console.log(colors.blue(movie.description));
	console.log(colors.grey('staring ' + movie.cast));
	console.log("");
}

function spinAgain(movieLink){
	
	yesno.ask('Are you want watch this movie?', true, function(ok) {
    	if(ok) {
    		exec('open "' + movieLink + '"');
    		process.exit();
    	} else {
    		yesno.ask('Do you want to search for another random movie?', true, function(ok) {
    			if(ok) {
		    	    SearchRandomMovie();
		    	} else {
    	    		process.exit();
    	    	}
    	    });
    	}
	});
}


SearchRandomMovie();
