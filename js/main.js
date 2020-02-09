/* * * * * * * * * * * * * CONSTANTS * * * * * * * * * * * * */

const heel, cherries, devil, plug, dollar = '';

/* * * * * * * * * * APP'S STATE VARIABLES * * * * * * * * * */

let cash, tkns;
let spinResults = [];

/* * * * * * * * * CASHED ELEMENT REFERENCES * * * * * * * * */



/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */

document.querySelector('button').addEventListener('click', initialize);

let section = document.querySelector('section')
section.addEventListener('click', (evt) => {
    
    if(tkns >= 1) {
        
        spin(evt);
    } 
    else {
        
        // cash = prompt(insufficient funds, input amount);
        tkns = tkns + (cash * 0.05);
        // update element on page
        // waiting for user to click again
    }
});

/* * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * */

initialize();

// GAME IS STARTED

function initialize (){

	// cash = prompt for cash amount;
	tkns = cash / 0.05;
	tokens.innerText = tkns;
}

// SPIN IS CLICKED 

function spin(evt) {
	
	tkns -= 1;
	tokens.innerText = tkns;

	spinResults = [null, null, null, null, null];
	// randomizer to fill in spinResults
	// display images
	render(spinResults);
}

function render() { // is being passed an array 

	// iterate to find or filter number of times each element occurs and return results like in array lab
	
	
	if (slot === 'dollar') {
		
		matchCount = 0;
		// loop to find number of matches and update count
		tkns = tkns + 5 + (5 * match);

		// remove element from array
	}

	else { // (slot !== 'dollar')
		
		matchCOunt = 0;
		// loop to find number of matches and update count
		// remove element from array
		tkns = tkns + 1 + match;
	}
}