var rest = require('restler-q');

exports.getMovies = getMovies;
exports.getMovieDetails = getMovieDetails;


function getMovies(title){
	return 	rest.get('http://www.canistream.it/services/search',{query: {movieName: title}});
}

function getMovieDetails(movieId){
	return 	rest.get('http://www.canistream.it/services/query',
					    { 	
					    	query: { 
					    		movieId: movieId, 
					  			attributes: '1',
                      			mediaType: 'streaming'
                      		}
                      	});

}