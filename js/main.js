/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */


const slotValues = [
	{ name: 'dollar', image: 'images/dollar.png' },
	{ name: 'pleaser', image: 'images/pleaser.png' },
	{ name: 'cherries', image: 'images/cherries.png' },
	{ name: 'trainingkit', image: 'images/trainingkit.png' },
	{ name: 'angel', image: 'images/angel.png' },
	{ name: 'devil', image: 'images/devil.png' },
	{ name: 'of', image: 'images/of.png' },
	{ name: 'mv', image: 'images/mv.png' }
];

const highlightIds = [a, b, c, d, e, f, g, h, j, k];


/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */


let tkns;
let spinResults = [];


/* * * * * * * * * CASHED ELEMENT REFERENCES * * * * * * * * */


let placeBet = document.querySelector('#placebet');
let cashIn = document.querySelector('#cashin');
let cashOut = document.querySelector('#cashout');
let spinner = document.querySelector('#spinner');
let spinSound = document.querySelector('#spinsound');
let winSound = document.querySelector('#winsound');


/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */


placeBet.addEventListener('click', payMe);
cashOut.addEventListener('click', initialize);

spinner.addEventListener('click', function (evt) {

	if (tkns >= 5) {
		spin(evt);
	} else {
		cashIn.style.color = 'red';
		cashIn.style.borderColor = 'black';
		cashIn.value = "IF YOU'RE STROKIN', TIP A TOKEN";
	}
});


/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */


initialize();

function initialize() {

	tkns = 0;
	tokens.innerText = '000000';
	console.log(`TOKENS = ${tkns}`)
	removeHighlight();
	for (let i = 0; i < 3; i++) {
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random() * slotValues.length)].image}`;
		document.getElementById(`${i}`).style.width = '150px';
	}
}

function payMe(evt) {

	if (!isNaN(cashIn.value)) {
		tkns += Math.floor(cashIn.value / 0.05);
		tokens.innerText = leadingZeros(tkns, 6);
		console.log(`+ ${cashIn.value / 0.05} (VIA CASH) = ${tkns} TOKENS`);
		cashIn.value = '0.00';
		cashIn.style = null;
	} else {
		cashIn.style.color = 'red';
		cashIn.value = 'ENTER A VALID CASH AMOUNT';
	}
}

function spin(evt) {

	spinSound.play();
	removeHighlight();
	tkns -= 5;
	tokens.innerText = leadingZeros(tkns, 6);
	console.log(`- 5 (VIA SPIN) = ${tkns} TOKENS`);
	for (let i = 0; i < 3; i++) {
		spinResults[i] = slotValues[Math.floor(Math.random() * slotValues.length)];
	}
	setSlotImage(spinResults);
}

function setSlotImage(objArr) {

	setTimeout(function () {
		document.getElementById('0').src = objArr[0].image;
	}, 300);
	setTimeout(function () {
		document.getElementById('1').src = objArr[1].image;
	}, 600);
	setTimeout(function () {
		document.getElementById('2').src = objArr[2].image;
		matchTally(spinResults);
	}, 900);
}

function matchTally(objArr) {

	let slotCount = spinResults.reduce(function (acc, slot) {

		acc[slot.name] = acc[slot.name] ? acc[slot.name] + 1 : 1;
		return acc;
	}, {});
	console.log(slotCount);
	updateTokens(slotCount);
}

function updateTokens(obj) {

	for (let key in obj) {
		if (obj[key] === 3) {
			if (key === 'dollar') {
				winSound.play();
				d.style.background = 'yellow';
				d.style.color = 'blue';
				tkns += 500;
				console.log(`+ 500 ($$$) = ${tkns}`);
			}
			else if (key === 'devil') {
				f.style.background = 'yellow';
				f.style.color = 'blue';
				tkns -= 666;
				console.log(`- 666 (DEVIL ROW) = ${tkns}`);
			}
			else if (key === 'of') {
				g.style.background = 'yellow';
				g.style.color = 'blue';
				tkns -= Math.floor(tkns * .20);
				console.log(`- 20% (ONLYFANS PAYCUT) = ${tkns}`);
			}
			else if (key === 'mv') {
				h.style.background = 'yellow';
				h.style.color = 'blue';
				tkns -= Math.floor(tkns * .40);
				console.log(`- 40% (MANYVIDS PAY CUT) = ${tkns}`);
			}
			else if (key === 'trainingkit') {
				j.style.background = 'yellow';
				j.style.color = 'blue';
				tkns = 0;
				console.log(`YOU'RE F*CKED = ${tkns}`);
			}
			else {
				winSound.play();
				b.style.background = 'yellow';
				b.style.color = 'blue';
				tkns += 100;
				console.log(`+ 100 (PERF ROW) = ${tkns}`);
			}
		}
		if (obj[key] === 2) {
			if (key === 'devil') {
				e.style.background = 'yellow';
				e.style.color = 'blue';
				tkns -= 100;
				console.log(`- 100 (DOUBLE DEVILS) = ${tkns}`);
			}
			else if (key === 'of') {
				g.style.background = 'yellow';
				g.style.color = 'blue';
				tkns -= Math.floor(tkns * .20);
				console.log(`- 20% (ONLYFANS PAY CUT) = ${tkns}`);
			}
			else if (key === 'mv') {
				h.style.background = 'yellow';
				h.style.color = 'blue';
				tkns -= Math.floor(tkns * .40);
				console.log(`- 40% (MANYVIDS PAY CUT) = ${tkns}`);
			}
			else if (key === 'trainingkit') {
				k.style.background = 'yellow';
				k.style.color = 'blue';
				tkns -= Math.floor(tkns * .50);
				console.log(`- 50% (DOUBLE T.K.) = ${tkns}`);
			}
			else {
				winSound.play();
				a.style.background = 'yellow';
				a.style.color = 'blue';
				tkns += 50
				console.log(`+ 50 (DOUBLES) = ${tkns}`);
			}
		}
		if (obj[key] === 1 && key === 'dollar') {
			winSound.play();
			c.style.background = 'yellow';
			c.style.color = 'blue';
			tkns += 20;
			console.log(`+ 20 ($ SIGN) = ${tkns}`);
		}
	}
	if (tkns > 0) {
		tokens.innerText = leadingZeros(tkns, 6);
	}
	else {
		tkns = 0;
		tokens.innerText = '000000'
	}
}

function removeHighlight() {

	for (i = 0; i < highlightIds.length; i++) {
		highlightIds[i].style = null;
	}
}

function leadingZeros(n, width, z) {

	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}