/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */

const slotValues = [

	{ name: 'angel', image: 'images/angel.png' },
	{ name: 'cherries', image: 'images/cherries.png' },
	{ name: 'devil', image: 'images/devil.png' },
	{ name: 'dollar', image: 'images/dollar.png' },
	{ name: 'mv', image: 'images/mv.png' },
	{ name: 'of', image: 'images/of.png' },
	{ name: 'pleaser', image: 'images/pleaser.png' },
	{ name: 'trainingkit', image: 'images/trainingkit.png' }
];

/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */

let tkns;
let spinResults = [];

/* * * * * * * * * CACHED ELEMENT REFERENCES * * * * * * * * */

let cashIn = document.querySelector('#cashin');
let placeBet = document.querySelector('#placebet');
let spinner = document.querySelector('#spinner');
let spinSound = document.querySelector('#spinsound');
let winSound = document.querySelector('#winsound');
let cashOut = document.querySelector('#cashout');

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
	for (let i = 0; i < 3; i++) {
		document.getElementById(`${i}`).src = `${slotValues[Math.floor(Math.random() * slotValues.length)].image}`;
	}
}

function payMe(evt) {

	if (!isNaN(cashIn.value)) {
		tkns += Math.floor(cashIn.value / 0.05);
		tokens.innerText = leadingZeros(tkns, 6);
		cashIn.value = '0.00';
		cashIn.style = null;
	} else {
		cashIn.style.color = 'red';
		cashIn.value = 'ENTER A VALID CASH AMOUNT';
	}
}

function spin(evt) {

	spinSound.play();
	tkns -= 5;
	tokens.innerText = leadingZeros(tkns, 6);
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
	updateTokens(slotCount);
}

function updateTokens(obj) {

	for (let key in obj) {
		if (obj[key] === 3) {
			if (key === 'dollar') {
				tkns += 500;
				winSound.play();
				notification.innerHTML = '<h3>SOMEONE TIPPED 500 TOKENS</h3>';
				notification.style.background = 'yellow';
				notification.style.color = 'black';
				removeNotification();

			} else if (key === 'devil') {
				tkns -= 666;
				notification.innerHTML = '<h3>SOME TIMEWASTER COST YOU 666 TOKENS</h3>';
				notification.style.background = 'red';
				notification.style.color = 'white';
				removeNotification();

			} else if (key === 'of') {
				tkns -= Math.floor(tkns * .20);
				notification.innerHTML = '<h3>ONLYFANS TOOK A 20% CUT OF YOUR EARNINGS</h3>';
				notification.style.background = '#00aff0';
				notification.style.color = 'white';
				removeNotification();
			} else if (key === 'mv') {
				tkns -= Math.floor(tkns * .40);
				notification.innerHTML = '<h3>MANYVIDS TOOK A 40% CUT OF YOUR EARNINGS</h3>';
				notification.style.background = '#ff4081';
				notification.style.color = 'white';
				removeNotification();
			} else if (key === 'trainingkit') {
				tkns += 1000;
				notification.innerHTML = '<h3>SOMEONE TIPPED 1,000 TOKENS</h3>';
				notification.style.background = 'yellow';
				notification.style.color = 'black';
				removeNotification();

			} else {
				tkns += 100;
				winSound.play();
				notification.innerHTML = '<h3>SOMEONE TIPPED 100 TOKENS</h3>';
				notification.style.background = 'yellow';
				notification.style.color = 'black';
				removeNotification();
			}
		}

		if (obj[key] === 2) {
			if (key === 'devil') {
				tkns -= 100;
				notification.innerHTML = '<h3>SOME TIMEWASTER COST YOU 100 TOKENS</h3>';
				notification.style.background = 'red';
				notification.style.color = 'white';
				removeNotification();
			} else if (key === 'of') {
				tkns -= Math.floor(tkns * .20);
				notification.innerHTML = '<h3>ONLYFANS TOOK A 20% CUT OF YOUR EARNINGS</h3>';
				notification.style.background = '#00aff0';
				notification.style.color = 'white';
				removeNotification();
			} else if (key === 'mv') {
				tkns -= Math.floor(tkns * .40);
				notification.innerHTML = '<h3>MANYVIDS TOOK A 40% CUT OF YOUR EARNINGS</h3>';
				notification.style.background = '#ff4081';
				notification.style.color = 'white';
				removeNotification();
			} else {
				tkns += 50
				winSound.play();
				notification.innerHTML = '<h3>SOMEONE TIPPED 50 TOKENS</h3>';
				notification.style.background = 'yellow';
				notification.style.color = 'black';
				removeNotification();
			}
		}

		if (obj[key] === 1 && key === 'dollar') {
			tkns += 20;
			winSound.play();
			notification.innerHTML = '<h3>SOMEONE TIPPED 20 TOKENS</h3>';
			notification.style.background = 'yellow';
			notification.style.color = 'black';
			removeNotification();
		}
	}

	if (tkns > 0) {
		tokens.innerText = leadingZeros(tkns, 6);
	} else {
		tkns = 0;
		tokens.innerText = '000000'
	}
}

function leadingZeros(n, width, z) {

	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function removeNotification() {

	setTimeout(function () {
		notification.innerHTML = null;
		notification.style.background = null;
		notification.style.color = null;
	}, 1500);
}