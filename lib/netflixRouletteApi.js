var rest = require('restler-q');
var hObj = require('htm-to-json');
var Q = require('q');

exports.getRandomMovie = getRandomMovie;


function getRandomMovie(opts){
	
	var deferred = Q.defer();

	rest.post('http://netflixroulette.net/core/mediaSpin.py',
	{
		data: {	
			genre:'All',
			movies:'true',
			tv:'false',
			lowrating:'1.0',
			highrating:'5.0',
			director:'none',
			actor:'none',
			keyword:'none',
		}
	}).then(function(res){
 		
		convertToJson(res).then(function(json){
			deferred.resolve(json);
		});
	});

	return deferred.promise;
}


function convertToJson(html){
	var deferred = Q.defer();

	hObj.convert_html_to_json(html,function(err,jHtml){
		var movie = {};
		
		movie.title = jHtml.h1[0].innerHTML;
		movie.description = jHtml.p[0].innerHTML;
		movie.direct_link = jHtml.a[2].href;
		
		deferred.resolve(movie);
	});

	return deferred.promise;

}
