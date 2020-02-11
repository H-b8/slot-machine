/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */

const slotValues = [
	{ name: 'dollar', image: 'images/dollar.png' },
	{ name: 'heel', image: 'images/heel.png' }, 
	{ name: 'cherries', image: 'images/cherries.png' },
	{ name: 'kit', image: 'images/kit.png' }, 
	{ name: 'angel', image: 'images/angel.png' },
	{ name: 'devil', image: 'images/devil.png' }
  ];
/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */

let cash, tkns;
let spinResults =[];

/* * * * * * * * * CASHED ELEMENT REFERENCES * * * * * * * * */

let placeBet = document.querySelector('#pb'); // button
let cashIn = document.querySelector('#cashin'); // input
let cashOut = document.querySelector('#cashout'); // button
let spinner = document.querySelector('#spinner');

/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */

placeBet.addEventListener('click', payMe);
cashOut.addEventListener('click', initialize);
spinner.addEventListener('click', function(evt){
	if(tkns >= 5) {
        spin(evt);
    } 
    else {
		cashIn.value = 'INSUFFICIENT FUNDS';
	}
});

/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */

initialize();

function initialize() {
	console.log('GAME STARTED')
	tkns = 0;
	tokens.innerText = '000000'
	for (let i = 0; i < 3; i++){
		console.log(`RANDOM IMAGE PLACED IN SLOT ${i}`)
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random()*slotValues.length)].image}`;
		document.getElementById(`${i}`).style.width = '150px';
	}
}

function payMe(evt) {
	tkns += Math.floor(cashIn.value / 0.05);
	tokens.innerText = tkns;
	cashIn.value = '0.00';
}

function spin(evt) {
	
	tkns -= 5;
	tokens.innerText = tkns;
	spinResults = [null, null, null];

	for (i = 0; i < spinResults.length; i++) {
		// play slider animation
		spinResults[i] = slotValues[Math.floor(Math.random()*slotValues.length)]; // puts a slotValue OBJECT into array
		document.getElementById(`${i}`).src = spinResults[i].image;
	}

	console.log(spinResults)
	matchTally(spinResults);
}

function matchTally(objArr) {
	let slotCount = spinResults.reduce(function (acc, slot) {
		acc[slot.name] = acc[slot.name] ? acc[slot.name] + 1 : 1;
		return acc;
	}, {});
	console.log(slotCount) // spits out objArr with names and count only
	updateTokens(slotCount); // pass that objArr to calculate tokens
}

function updateTokens(obj) {
	for (let key in obj) { // key = names, value = count

		if(obj[key] === 3){ 
			console.log('3 IN A ROW')
		  if (key === 'dollar') {
			console.log('DOLL HAIR! ADD 500')
			tkns += 500;
		  }
		  else if (key !== 'dollar' && key !== 'devil') {
			console.log('ADD 100')
			tkns += 100;
		  }
		  else {
			console.log('DEVILS! MINUS 420')
			tkns -= 420;
		  }
		}
	
		if (obj[key] === 2) {
		  if (key !== 'devil') {
			console.log('2 MATCHES, ADD 50')
			tkns += 50
		  }
		  else {
			console.log('2 DEVILS, MINUS 100')
			tkns -= 100;
		  }
		}
	
		if (obj[key] === 1 && key === 'dollar') {
			console.log('BONUS 20')
			tkns += 20;
		}

		console.log(tkns)
		tokens.innerText = tkns;
	  }
}