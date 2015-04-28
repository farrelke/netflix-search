#!/usr/bin/env node
var streamapi = require('./streamapi.js');
var exec = require('child_process').exec;
var program  = require('commander');

program
  .usage('<string>')
  .description('Goes directly to netflix for first result')
  .parse(process.argv);

 var searchTerm = program.args[0];



var title = "";

streamapi.getMovies(searchTerm) 
	.then(function(movies){
		if(movies.length > 0){
			title = movies[0].title;
			return streamapi.getMovieDetails( movies[0]._id);
		}else{
			console.log("Could not find a movie with that title");
		}
	}).then(function(movie){
		if(movie.netflix_instant){
			exec('open "' + movie.netflix_instant.direct_url + '"');
		}else{
			console.log( title + " doesn't appear to be on netflix");
		}
	}).catch(function(err){
		console.log(err);
	});
