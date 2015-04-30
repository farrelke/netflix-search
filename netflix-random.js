#!/usr/bin/env node
var netflixApi = require('./lib/netflixRouletteApi.js');
var exec = require('child_process').exec;
var yesno = require('yesno');
var program  = require('commander');
var colors = require('colors');

program
  .usage('<string>')
  .description('Goes directly to netflix for first result')
  .parse(process.argv);


console.log('powered by Netflix Roulette');





function SearchRandomMovie(){
	netflixApi.getRandomMovie().then(function(movie){
		printMovie(movie);
		spinAgain(movie.direct_link);		
	});
}


function printMovie(movie){
	console.log("");
	console.log(colors.blue.bold(movie.title));
	console.log(colors.blue(movie.description));
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
