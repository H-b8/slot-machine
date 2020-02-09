/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */

const slots = [heel, cherries, devil, plug, dollar];

/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */

let cash, tkns;
let spinResults = [];

/* * * * * * * * * CASHED ELEMENT REFERENCES * * * * * * * * */



/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */

document.querySelector('button').addEventListener('click', addCash);

let section = document.querySelector('section')
section.addEventListener('click', (evt) => {
    
    if(tkns >= 5) {
        
        spin(evt);
    } 
    else {
        
        // inner text of input turns red, displays "INSUFFICIENT FUNDS"
        tkns = tkns + (cash * 0.05);
        // update element on page
    }
});

/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */

initialize();

// GAME IS STARTED

function initialize() {
	tkns = 0;
	// what's showing in the spinners is random parts of strip ?
}

// USER TYPES IN CASH AMOUNT, CLICKS "PLACE BET"

function placeBet() {

	// cash = input amount 
	tkns = cash / 0.05;
	// tokens.innerText = tkns;
}

// SPIN IS CLICKED 

function spin(evt) {
	
	tkns -= 1;
	tokens.innerText = tkns;
	spinResults = [null, null, null];

	// slider animation maybe
	// loop one div at a time
	// randomizer shuffles image around
	// centers in div
	// get corresponding name 
	// push to spinResults array

	render(spinResults);
}

function render() { // is being passed an array 

	// iterate to find or filter number of times each element occurs and return results like in array lab
	
	// if any dollar tkns += 69
	// if pair tkns += 50
	// if perf row += 100
	// perf row dollar signs += 500
	// devil row -= 420
}