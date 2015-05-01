var exec = require('child_process').exec;

exports.openLink = openLink;


function openLink(link){
	exec('open "' + link + '"');
}