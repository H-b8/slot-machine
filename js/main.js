/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */

const slotValues = [
	{ name: 'dollar', image: 'images/dollar.png' },
	{ name: 'pleaser', image: 'images/pleaser.png' }, 
	{ name: 'cherries', image: 'images/cherries.png' },
	{ name: 'kit', image: 'images/kit.png' }, 
	{ name: 'angel', image: 'images/angel.png' },
	{ name: 'devil', image: 'images/devil.png' },
	{ name: 'of', image: 'images/of.png' },
	{ name: 'mv', image: 'images/mv.png' }
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
		placeBet.style.background = 'red';
		cashIn.style.color = 'red';
		cashIn.style.borderColor = 'black';
		cashIn.value = "IF YOU'RE STROKIN', TIP A TOKEN";
	}
});

/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */

initialize();

function initialize() {
	
	// console.log('GAME STARTED')
	
	tkns = 0;
	tokens.innerText = '000000'

	console.log(`${tkns} initial`) ////////////////////////

	for (let i = 0; i < 3; i++){
		console.log(`RANDOM IMAGE PLACED IN SLOT ${i}`)
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random()*slotValues.length)].image}`;
		document.getElementById(`${i}`).style.width = '150px';
	}
}

// function setSlot(i) {
// 	document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random()*slotValues.length)].image}`;
// 	document.getElementById(`${i}`).style.width = '150px';
// }

function payMe(evt) {

	if (!isNaN(cashIn.value)){
		
		tkns += Math.floor(cashIn.value / 0.05);
		tokens.innerText = leadingZeros(tkns, 6);
		
		console.log(`+ ${cashIn.value/0.05} (VIA CASH) = ${tkns} TOKENS`)
	
		cashIn.value = '0.00';
		cashIn.style = null;
		placeBet.style = null;
	}
	else {
		cashIn.style.color = 'red';
		cashIn.value = 'ENTER A VALID CASH AMOUNT';
	}

}

function spin(evt) {
	
	tkns -= 5;
	tokens.innerText = leadingZeros(tkns, 6);
	console.log(`- 5 (VIA SPIN) = ${tkns} TOKENS`)
	spinResults = [null, null, null];

	for (i = 0; i < 3; i++) {

		spinResults[i] = slotValues[Math.floor(Math.random()*slotValues.length)]; // puts a slotValue OBJECT into array
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
			if (key === 'dollar') {
				// symbol.innerText = '+';
				// win.innerText = '500';
				tkns += 500;
				console.log(`+ 500 ($$$) = ${tkns}`)
		  	}
			else if (key === 'devil') {
				// symbol.innerText = '-';
				// win.innerText = '666';
				tkns -= 420;
				console.log(`- 666 (DEVIL ROW) = ${tkns}`)
			}
			else if (key === 'of') {
				// symbol.innerText = '-';
				// win.innerText = '40%';
				tkns -= Math.floor(tkns * .20);
				console.log(`- 20% (TRIPLE O.F.) = ${tkns}`)
			}
			else if (key === 'mv') {
				// symbol.innerText = '-';
				// win.innerText = '80%';
				tkns -= Math.floor(tkns * .40);
				console.log(`- 40% (TRIPLE M.V.) = ${tkns}`)
			}
			else if (key === 'kit') {
				// symbol.innerText = '';
				// win.innerText = '';
				tkns = 0;
				console.log(`YOU'RE F*CKED = ${tkns}`)
			}
		 	else { // key = anything else
				// symbol.innerText = '+';
				// win.innerText = '100';
				tkns += 100;
				console.log(`+ 100 (PERF ROW) = ${tkns}`)
		  	}
		}
	
		if (obj[key] === 2) {
			if (key === 'devil') {
				// symbol.innerText = '-';
				// win.innerText = '100';
				tkns -= 100;
				console.log(`- 100 (DOUBLE DEVILS) = ${tkns}`)
			}
			else if (key === 'of') {
				// symbol.innerText = '-';
				// win.innerText = '40%';
				tkns -= Math.floor(tkns * .20);
				console.log(`- 20% (DOUBLE O.F.) = ${tkns}`)
			}
			else if (key === 'mv') {
				// symbol.innerText = '-';
				// win.innerText = '80%';
				tkns -= Math.floor(tkns * .40);
				console.log(`- 40% (DOUBLE M.V.) = ${tkns}`)
			}
			else { // key = anything else
				// symbol.innerText = '+';
				// win.innerText = '50';
				tkns += 50
				console.log(`+ 50 (DOUBLES) = ${tkns}`)
			}
		}
		
		if (obj[key] === 1 && key === 'dollar') {
			// symbol.innerText = '+';
			// win.innerText = '20';
			tkns += 20;
			console.log(`+ 20 ($ SIGN) = ${tkns}`)
		}
		
		if (tkns > 0) {
			tokens.innerText = leadingZeros(tkns, 6);
		}
		else {
			tkns = 0;
			tokens.innerText = '000000'
		}
	}
}

function leadingZeros(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }