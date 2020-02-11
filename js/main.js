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

/* * * * * * * * * CASHED ELEMENT REFERENCES * * * * * * * * */

let bet = document.querySelector('#pb');
let cashIn = document.querySelector('#cashin');

/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */

bet.addEventListener('click', payMe);

// let spinner = document.querySelector('.spinner')
// section.addEventListener('click', (evt) => {
    
//     if(tkns >= 5) {
        
//         spin(evt);
//     } 
//     else {
        
// 		// inner text of input turns red, displays "INSUFFICIENT FUNDS"
// 		// wait for user input
//         tkns = tkns + (cash * 0.05);
//         // update element on page
//     }
// });

/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */

initialize();

function initialize() {
	console.log('GAME STARTED')
	tkns = 0;
	for (let i = 0; i < 3; i++){
		console.log(`RANDOM IMAGE PLACED IN SLOT ${i}`)
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random()*slotValues.length)].image}`;
	}
}

// USER TYPES IN CASH AMOUNT, CLICKS "PLACE BET"

function payMe(evt) {
	tkns += Math.floor(cashIn.value / 0.05);
	tokens.innerText = tkns;
}

// SPIN IS CLICKED 

function spin(evt) {
	
	tkns -= 5;
	tokens.innerText = tkns;
	let spinResults = [null, null, null];

	// loop one div at a time
	for (i = 0; i < spinResults.length; i++) {
		// play slider animation
		spinResults[i] = slotValues[Math.floor(Math.random()*this.slotValues.length)]; // puts a slotValue OBJECT into array
		document.getElementById(`${i}`).src = spinResults[i].image;
	}

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
		console.log("perf row")
		  if (key === 'dollar') {
			tkns += 500;
		  }
		  else if (key !== 'dollar' && key !== 'devil') {
			tkns += 100;
		  }
		  else {
			console.log("....LOL")
			tkns -= 420;
		  }
		}
	
		if (obj[key] === 2) {
		  if (key !== 'devil') {
			console.log("2 matches")
			tkns += 50
		  }
		  else {
			console.log("2 devils")
			tkns -= 100;
		  }
		}
	
		if (obj[key] === 1 && key === 'dollar') {
		  console.log("1 doll hair")
		  tkns += 20;
		}
	  }
}