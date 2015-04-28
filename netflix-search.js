#!/usr/bin/env node
var program  = require('commander');
var  _ = require('lodash');
var nc = require('ncurses');
var exec = require('child_process').exec;

var gui = require('./gui.js');
var streamapi = require('./streamapi.js');


program
  .usage('<string>')
  .description('Search for shows by title')
 // .on('--help', printHelp)
  .parse(process.argv);


var searchString = "";

var isRight = false;
var rowPos = 0;
var linkPos = 0;



gui.w.on('inputChar', function(letter,key_code, is_key) {
	//console.log(key_code);


	if(key_code === 10){
		var movie = curResults[rowPos -1];
		if(movie){
			var link = SelectedLink(linkPos);
			exec('open "' + movie.links[link] + '"');
		}
	}
	else if(key_code === 261){
		isRight = true;
		linkPos = 1;
		gui.printResults(curResults, rowPos, SelectedLink(linkPos));

	}else if(key_code === 260){
		isRight = false;
		linkPos = 0;
		gui.printResults(curResults, rowPos, SelectedLink(linkPos));
	}
	else if( key_code === 258){

		if(isRight){
			if(SelectedLink(linkPos + 1)){
				linkPos = linkPos + 1;
			}
		}else{
			rowPos = rowPos + 1;// :rowPos;
			getStreamlinks();
		}

		gui.printResults(curResults, rowPos,SelectedLink(linkPos));
	
	}else if(key_code === 259){
		if(isRight){
			linkPos = linkPos <= 1 ? 1 :linkPos - 1;
		}else{
			rowPos = rowPos ? rowPos - 1 :rowPos;
		}

		gui.printResults(curResults, rowPos,SelectedLink(linkPos));
	}
	else if(key_code === 127 ){
		if(searchString.length > 0){
			searchString = searchString.substring(0, searchString.length - 1);
			rowPos = 0;
			gui.updateSearchText(searchString);
			fetchNewResult(searchString);
		}
	}else{ 
		searchString += letter;
		rowPos = 0;
		gui.updateSearchText(searchString);
		fetchNewResult(searchString);
	}

});


var curResults = [];
function fetchNewResult(searchString){
	if(searchString.length > 2){

		streamapi.getMovies(searchString).then(function(result){
				curResults = result;
				gui.printResults(curResults, rowPos, SelectedLink(linkPos));
		});
	}
}


function getStreamlinks(){
	var movie = curResults[rowPos - 1];
	//gui.close();
	//			console.log(movie._id);

	if(movie && !movie.hasStreamLinks){

		movie.hasStreamLinks = true;

		streamapi.getMovieDetails( movie._id).then(function(result){
				movie.streamSearchCompleted = true;

				if(result.netflix_instant){
					movie.links.netflix = result.netflix_instant.direct_url;
				}

				if(result.amazon_prime_instant_video){
					movie.links.amazon_prime = result.amazon_prime_instant_video.direct_url;
				}
				gui.printResults(curResults, rowPos, SelectedLink(linkPos));
		});
	};
}



function SelectedLink(linkPos){
	var movie = curResults[rowPos - 1];
	if(movie){
		var linkNum = 1;
		if(movie.links.imdb){
			if(linkNum === linkPos){
				return "imdb";
			}
			linkNum += 1;
		}
		if(movie.links.rottentomatoes){
			if(linkNum === linkPos){
				return "rottentomatoes";
			}
			linkNum += 1;
		}	
		if(movie.links.netflix){
			if(linkNum === linkPos){
				return "netflix";
			}
			linkNum += 1;
		}	
		if(movie.links.amazon_prime){
			if(linkNum === linkPos){
				return "amazon_prime";
			}
			linkNum += 1;
		}	
	}

	return false;
}



gui.setup();

process.on('SIGINT', function() {
	gui.close();
	process.exit();
});




