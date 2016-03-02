var request = require('request');
var cheerio = require('cheerio');

request('http://181.30.128.34/asp/nivelesPrima.asp', function (error, response, body) {
	if (error) {
		console.log(error);
		process.exit(1);
	}
  	if (response.statusCode != 200) {
    	console.log('La página dió error: ' + response.statusCode);
    	process.exit(1);
  	}

  	var $ = cheerio.load(body);

  	var data = {};

  	$('td.etiqueta').each(function(index, element) {
  		var labelTD = $(this);
  		var valueTD = $(this).next();

  		data[labelTD.text()] = valueTD.text();
  		// console.log(labelTD.text(), valueTD.text());
  	});

  	if (data.MER) {
	  	process.stdout.write('(' + data.MER + '). ');
  		var curVal = string2float(data.MER.split(' ')[0]);
  		prettyRangeLog(curVal, compareValue(curVal, 25, 38), 'MER');
  	}
  	if (data.Tx) {
	  	process.stdout.write('(' + data.Tx + '). ');
  		var curVal = string2float(data.Tx.split(' ')[0]);
  		prettyRangeLog(curVal, compareValue(curVal, 35, 55), 'Tx');
  	}
  	if (data.Rx) {
	  	process.stdout.write('(' + data.Rx + '). ');
  		var curVal = string2float(data.Rx.split(' ')[0]);
  		prettyRangeLog(curVal, compareValue(curVal, -10, 10), 'Rx');
  	}
});

function prettyRangeLog(value, comparison, name) {
	switch(comparison) {
		case -1:
			console.log('El valor ' + name + ' es muy bajo.');
			break;
		case 0:
			console.log('El valor ' + name + ' esta dentro de un rango aceptable.');
			break;
		case 1:
			console.log('El valor ' + name + ' es muy alto.');
			break;
	}
}

function compareValue(actual, min, max) {
	if (actual < min) {
		return -1;
	} else if (actual >= min && actual <= max) {
		return 0;
	} else {
		return 1;
	}
}

// Convert a comma formatted string like "36,9" into the float 36.9
function string2float(str) {
	return parseFloat(str.replace(',', '.'))
}
