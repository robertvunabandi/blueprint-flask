/**
 * Rules of the game:
 * For a score, you cannot return a specific number. The 
 * score returned must be random. To do so, use "Math.random()", 
 * which generates a random number ranging from 0 to 1. 
 * For this to be a valid score function, there should always be
 * a possibility to return a score of zero. 
 * 
 * Let's say I wanted to give a score to be from 0 to 50, then I 
 * can do "Math.random()*50;". This effectively returns a score
 * from 0 to 50.
 */
const utils = {
	nameScore: function(name) {
		/* TODO */
		return 0;
	}, 
	heightScore: function(height) {
		/* TODO */
		return 0;
	},
	scaleScore: function(scale) {
		/* TODO */
		return 0;
	},
	radioScore: function(radio) {
		/* Example of a score function */ 
		switch(radio.toLowerCase()) {
			case 'mint':
				return Math.random() * 250;
			case 'vanilla':
				return Math.random() * 200;
			case 'chocolate':
				return Math.random() * 100;
			default:
				return (Math.random() * 50) - 25;
		}
		return 0;
	},
	average: function(array) { 
		// given an array of numbers, return the average of those numbers
		let running_sum = 0;
		for (let index = 0; index < array.length; index += 1) {
			running_sum += array[index];
		}
		return running_sum / array.length;
	}
};
/*
Some utility functions you may find helpful
*/
// TODO: Do this