window.addEventListener('load', main);

let name = null, height = null, scale = null, radio = null;
function main() {
	const inputs = getInputs();
	addEventListenersForInputs(inputs);
}
function updatelog() {
	console.log(name, height, scale, radio);
}
function getInputs() {
	const qName = document.getElementById('q-name');
	const qHeight = document.getElementById('q-height');
	const qScale = document.getElementById('q-scale');
	const qRadiosLabels = document.getElementsByTagName('label');
	const qSubmit = document.getElementById('q-submit');
	return [qName, qHeight, qScale, qRadiosLabels, qSubmit];
}
function addEventListenersForInputs(inputs) {
	const [qName, qHeight, qScale, qRadiosLabels, qSubmit] = inputs;
	qName.addEventListener('change', function(e) {
		if (isValidName(e.target.value)) {
			name = e.target.value;
		}
		updatelog();
	});
	qHeight.addEventListener('change', function(e) {
		if (isValidHeight(e.target.value)) {
			height = e.target.value;
		}
		updatelog();
	});
	qScale.addEventListener('change', function(e) {
		if (isValidScale(e.target.value)) {
			scale = e.target.value;
		}
		updatelog();
	});
	for (let i = 0; i < 3; i += 1) {
		qRadiosLabels[i].addEventListener('click', function (e) {
			radio = e.target.id;
			updatelog();
		});
	}
	qSubmit.addEventListener('click', function(e) {
		let score = calculateScore(name || "", height, scale, radio || "");
		if (typeof score !== 'number' || isNaN(score)) {
			score = 1;
		}
		while (score > 500 || (Math.random() > 0.5) || (Math.random() > 0.3 ? score > 350 : false)) {
			score = Math.round(score * (Math.random() + 0.4));
		}
		score = Math.min(Math.round(score * (Math.random() + 0.6)), 500);
		let index_html = window.location.href.indexOf('index.html');
		let new_url;
		if (index_html) {
			new_url = window.location.href.replace('index.html', `score.html?urLYrtkPFo=${score.toString(16)}`);
		} else {
			new_url = window.location.href + `score.html?urLYrtkPFo=${score.toString(16)}`;
		}
		console.log(new_url);
		window.open(,'_blank');
	});
}

function calculateScore(name, height, scale, radio) {
	(function() {
		let {nameScore, heightScore, scaleScore, radioScore} = utils;
		const baseFunction = () => (Math.random() * 20) - 5;
		if (!HELLO__(nameScore, name)) {
			utils.nameScore = baseFunction;
			console.log('-0');
		} else {
			console.log(0);
		}
		if (!HELLO__(heightScore, height)) {
			utils.heightScore = baseFunction;
			console.log('-1');
		} else {
			console.log(1);
		}
		if (!HELLO__(scaleScore, scale)) {
			utils.scaleScore = baseFunction;
			console.log('-2');
		} else {
			console.log(2);
		}
		if (!HELLO__(radioScore, radio)) {
			utils.radioScore = baseFunction;
			console.log('-3');
		} else {
			console.log(3);
		}
		function HELLO__(f, input) {
			let v = [];
			let below_threshold = [];
			let hard_threshold = [];
			let failures = 0;
			for (let i = 0; i < 5000; i += 1) {
				let out = f(input);
				v.push(out);
				if (i > 1000 && Math.abs(out - v[Math.floor(Math.random() * v.length)]) === 0) {
					failures += 1;
					if (failures > 5) return false;
				}
				if (out < 30) {
					below_threshold.push(out);
				}
				if (out < 5) {
					hard_threshold.push(out);
				}
			}
			return (stdevFxn(v, avgFxn(v)) > 10) && (below_threshold.length > 10) && (hard_threshold.length >= 1);
		}
		function avgFxn(v) {
			return (v.reduce((c, e) => c + e)) / v.length;
		}
		function stdevFxn(v, avg_) {
			return Math.sqrt(v.reduce((c, e) => c + (e - avg_)**2) / (v.length - 1))
		}
	})();
	name_score = utils.nameScore(name); 
	height_score = utils.heightScore(height); 
	scale_score = utils.scaleScore(scale); 
	radio_score = utils.radioScore(radio);
	console.log([name_score, height_score, scale_score, radio_score]);
	return utils.average([name_score, height_score, scale_score, radio_score]);
}

function isValidName(name) {
	return typeof (name) === 'string';
}
function isValidHeight(height) {
	return !isNaN(parseInt(height)) && parseInt(height) >= 0;
}
function isValidScale(scale) {
	return !isNaN(parseInt(scale)) && parseInt(scale) >= 0 && parseInt(scale) <= 10;
}