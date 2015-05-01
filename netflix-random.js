#!/usr/bin/env node
var netflixApi = require('./lib/netflixRouletteApi.js');
var utils = require('./lib/utils');

var yesno = require('yesno');
var program  = require('commander');
var colors = require('colors');
var _ = require('lodash');

program
  .option('-r, --rating <rating>','lowest rating movie you want to see')
  .option('-a, --actor <actor>','search by actor')
  .option('-d, --director <director>','search by director') 
  .option('-k, --keyword <keyword>','search by keyword') 
  .option('-t, --tv', 'search for tv shows instead of movies')
  .description('finds a netflix movie randomly using Netflix Roulette')
  .parse(process.argv);

var defaults = {
	rating: 1.0,
	actor: 'none',
	director: 'none',
	keyword: 'none',
	tv: false,
};

var argv = _.defaults(
  program,
  defaults
);

console.log('powered by Netflix Roulette');
SearchRandomMovie();



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
	console.log(colors.grey('starring ' + movie.cast));
	console.log("");
}


function spinAgain(movieLink){
	var type = argv.tv ? "tv show" : "movie";

	yesno.ask('Are you want watch this ' + type  + '?' , true, function(ok) {
    	if(ok) {
    		utils.openLink(movieLink);
    		process.exit();
    	} else {
    		yesno.ask('Do you want to search for another random ' + type + '?', true, function(ok) {
    			if(ok) {
		    	    SearchRandomMovie();
		    	} else {
    	    		process.exit();
    	    	}
    	    });
    	}
	});
}


