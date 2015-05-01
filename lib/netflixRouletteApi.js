var rest = require('restler-q');
var cheerio = require('cheerio')
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
			lowrating: opts.rating,
			highrating:'5.0',
			director: opts.director,
			actor: opts.actor,
			keyword: opts.keyword,
		}
	}).then(function(res){
 		deferred.resolve(convertToJson(res));
	});

	return deferred.promise;
}


function convertToJson(html){
	var  $ = cheerio.load(html);
	var movie = {};

	$('p strong').empty();
	movie.title = $('h1').text().trim(); 
	movie.rating =  $('p').slice(0).eq(0).text().trim();
	movie.description =  $('p').slice(1).eq(0).text().trim();
	movie.director =  $('p').slice(2).eq(0).text().trim();
	movie.cast =  $('p').slice(3).eq(0).text().trim();
	movie.direct_link =  $('a').slice(2).eq(0).attr('href');

	return movie;
}