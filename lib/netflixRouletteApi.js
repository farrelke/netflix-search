var rest = require('restler-q');

exports.getMovies = getMovieByTitle;
exports.getMovieDetails = getMovieByActor;
exports.getMovieDetails = getMovieByDirector;


function getMovieByTitle(title){
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