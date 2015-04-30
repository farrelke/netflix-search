
var nc = require('ncurses');


var w = new nc.Window();

exports.updateSearchText = updateSearchText;
exports.setup = setup;
exports.close = close;
exports.printResults = printResults;;
exports.w = w;


function setup(){
	w.cursor(0,0);
	w.print("> ");
	w.refresh();
}

function close(){
	w.close();
}

function updateSearchText(text){
	w.cursor(0 , 0 + 2);
	w.clrtoeol();
	w.print(text);
	w.refresh();
}


function printResults(results, selectedrow, selectedLink){
	clearRows(1,20);
	
	var x = w.curx;
	var y = w.cury;

	for(var i =0; i < results.length;i++){
		if(selectedrow === i + 1){
			selectedBox(results[i], selectedLink);
		}else{

			w.addstr(1 + w.cury, 0, results[i].title);
		}
	}
	w.cursor(y, x);
	w.refresh();
}


function clearRows(start,end){
	var x = w.curx;
	var y = w.cury;

	for(var i = start; i <= end; i++){
		w.cursor(i, 0);
		w.clrtoeol();
	}
	w.cursor(y, x);
}

function selectedBox(movie,selectedLink){


	w.addstr(1 + w.cury, 0, "* " + movie.title);
	w.addstr(1 + w.cury, 0, "   rating " + movie.rating + ", year " + movie.year + ", actors "+ movie.actors);

	var linkNum = 1;

	makeLink(movie,selectedLink,"imdb");
	makeLink(movie,selectedLink,"rottentomatoes");
	makeLink(movie,selectedLink,"netflix");
	makeLink(movie,selectedLink,"amazon_prime");

	if(movie.streamSearchCompleted && !movie.links.netflix && !movie.links.amazon_prime){
		w.addstr(1 + w.cury, 0, "   no streams :( ");
	}
	
}

function makeLink(movie,selectedLink, link){
	if(movie.links[link]){
		if(link === selectedLink){
			w.addstr(1 + w.cury, 0, "   *" + link + " -> " + movie.links[link]);
		}else{
			w.addstr(1 + w.cury, 0, "   " + link + " -> " + movie.links[link]);
		}
	}
}

