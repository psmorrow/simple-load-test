const http = require('http');

const load = 100;

const options = {
	host: 'localhost',
	port: 8000,
	method: 'GET',
	path: '/index.html'
};

let durations = [];

for (let i = 0; i < load; ++i) {
	const start = Date.now();

	const request = http.request(options, function(response) {
		console.log(`Interation: ${ i + 1 }\n`);
		console.log('Status: ' + response.statusCode);
		console.log('Headers: ' + JSON.stringify(response.headers));
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
			console.log('Data: ' + chunk);
		});
		response.on('end', function() {
			logDuration(start, Date.now());
		});
	});
	request.on('error', function(error) {
		console.log(`Interation: ${ i + 1 }\n`);
		console.log('Error: ' + error);
		logDuration(start, Date.now());
	});
	request.end();
}

function logDuration(start, stop) {
	const duration = stop - start;
	durations.push(duration);
	console.log(`Duration (ms): ${ duration }\n`);
	if (durations.length === load) {
		logAverageDuration();
	}
}

function logAverageDuration() {
	let total = 0;
	for (let i = 0; i < durations.length; ++i) {
		total += durations[i];
	}
	const average = total/durations.length;
	console.log(`Average duration (ms): ${ average }\n`);
}
