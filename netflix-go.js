#!/usr/bin/env node
var streamapi = require('./lib/streamapi.js');
var utils = require('./lib/utils');
var program  = require('commander');

program
  .usage('<string>')
  .description('Goes directly to netflix for first result')
  .parse(process.argv);

 var searchTerm = program.args[0];


if(!program.args[0]){
	console.log("Please enter a movie title");
}

streamapi.getMovies(searchTerm) 
	.then(function(movies){

		if(movies.length > 0){

			var title = movies[0].title;
			var movieInfoPromise = streamapi.getMovieDetails( movies[0]._id);
			return [ title , movieInfoPromise];

		}else{
			console.log("Could not find a movie with that title");
		}

	}).spread(function(title, movie){

		if(movie.netflix_instant){
			utils.openLink(movie.netflix_instant.direct_url);
		}else{
			console.log( title + " doesn't appear to be on netflix");
		}

	}).catch(function(err){
		console.log(err);
	});
