function populateAverageScore() {
	// endpoint: GET average
	$.ajax({
		type: 'GET',
		url: '/average',
		success: function(average_score) {
			// populate the average on the web page
			console.log(average_score);
			document.getElementById('average').innerHTML = average_score;
		},
		error: function(xhr, status, error) {
			handleError(error);
		}
	});
}
function populateMaxScore() {
	// endpoint: GET max
		$.ajax({
		type: 'GET',
		url: '/max',
		success: function(maximum_score) {
			// populate the max score on the web page
			console.log(maximum_score);
			document.getElementById('maximum').innerHTML = maximum_score;
		},
		error: function(xhr, status, error) {
			handleError(error);
		}
	});
}

function postScore(score, callback) {
	// endpoint: POST add, PARAM: score
	let callbackHandler = callback[0];
	let handleError = callback[1];
	$.ajax({
		type: 'POST',
		url: '/add',
		data: { score: score },
		success: function() {
			populateAverageScore();
			populateMaxScore();
			if (callback) {
				callbackHandler();
			}
		},
		error: function(xhr, status, error) {
			handleError(score, error);
		}
	});
}

/**
 * 
 * DO NOT MODIFY THE CODE BELOW
 * 
 * WARNING: Code below is more advanced
 **/
function handleError(error) {
	document.getElementById('error').innerHMTL = `Last Error: ${error || "Unknown"}`;
	console.log(error);
}


window.addEventListener('load', main);

function main() {
	let codename = "urLYrtkPFo";
	index = window.location.href.indexOf(codename) + codename.length + 1;
	score = window.location.href.substring(index);
	score = parseInt(score.replace(/\#/, ''), 16);
	document.getElementById('outof').style.display = 'none';
	try {
		postScore(score, [function() {
					populateScore(score);
				}, function(score, err) {
					postScoreErrorHandler(score, err);
				}]);
	} catch (err) {
		postScoreErrorHandler(score, err);
	}
};

function postScoreErrorHandler(score, err) {
	console.log('an error occurred while posting the score');
	console.error(err);
	// populate the score anyway
	populateScore(score);
}

function populateScore(score) {
	let count = 4;
	// populate the score after a count down
	let interval = setInterval(function() {
		document.getElementById('score').innerHTML = count || Math.min(score, 500);
		count--;
		if (count === -1) {
			clearInterval(interval);
			document.getElementById('outof').style.display = 'inline-block';
		}
	}, 1000);
}