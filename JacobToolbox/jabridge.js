/** jabridge.js
Script intended to "abridge" certain repetitive operations.
*/

/** Incomplete, from a tutorial I didn't finish watching. */
class ElementCollection extends Array {
}

/**
* Returns a single item retrieved by querySelector().
* @param {string} query Text to pass to querySelectorAll.
* @param {object} parent Object to call the method from.
* @return {collection} An ElementCollection containing the results of the query.
*/
function $(query, parent=document) {
	if(typeof query === 'string' || query instanceof String) {
		return parent.querySelector(query);
	}
}

/**
* Returns an ElementCollection containing each item retrieived with
* querySelectorAll.
* @param {string} query Text to pass to querySelectorAll.
* @param {object} parent Object to call the method from.
*/
function $$(query, parent=document) {
  if(typeof query === 'string' || query instanceof String) {
    return new ElementCollection(...parent.querySelectorAll(query));
  } else {
    return new ElementCollection(query);
  }
}

/**
* Returns the value of an HTML DOM element's CSS property.
* @param {string|object} element DOM object, or a string query for one.
* @param {object} property Property to retrieve.
*/
function $css(element, property, setValue=null, important=0) {
	if (typeof element === 'string' || element instanceof String)
		element = document.querySelector(element);
	if (!(setValue===null)) element.style.setProperty(
		property, setValue, important?'!important':undefined);
	return getComputedStyle(element).getPropertyValue(property);
}


/**
* Converts length units from a CSS property string into a different length unit,
* or strips the units and returns the raw value.
* @param {string} unconverted The value to convert.
* @param {string} targetUnit Target unit to return the string in.
* @param {bool} suffix If true, function returns the answer as a string that
* includes the unit label. If false, it strips the label from the number.
* @param {DOM element} e DOM element object from which to retrieve a font size.
* @return {string|number} The converted value.
*/
function cssReUnit(unconverted, targetUnit='px', suffix=1, e=':root'){
	const regGroups = unconverted.match( /(.*\d)(\D+$)/ ) ?? [0, unconverted, 'px'];
	const originalValue = 1*regGroups[1];
	const originalUnit = regGroups[2];
	// early-return trim.
	if (originalUnit == targetUnit || !targetUnit) return originalValue;

	const vw =
	Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const vh =
	Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

	const pxPer = {
		'px':1,
		'cm':96/2.54,
		'mm':96/.254,
		'in':96,
		'pt':96/72,
		'pc':16,
		'rem':cssReUnit($css(':root','font-size'),0),
		'em':cssReUnit($css(e,'font-size'),0),
		'vw':vw/100,
		'vh':vh/100,
		'vmin':Math.min(vw, vh),
		'vmax':Math.max(vw, vh)
		// '%':0,			// Relative to the parent element
		// 'ex':0,		// Relative to the x-height of the current font (rarely used)
		// 'ch':0,		// Relative to width of the "0" (zero)
		// https://www.w3schools.com/css/css_units.asp
	}

	const lengthInPx = originalValue * pxPer[originalUnit];
	return lengthInPx / pxPer[targetUnit]	+ (suffix ? targetUnit : 0);
}

/**
* Replays an animation.
* @param {DOM} element DOM element to (re)animate.
*/
async function animaTrigger(element) {
	await element.classList.add('replay');
	element.classList.remove('replay')
}


/**
An Execution Queue to have commands pushed to it in sequence, with delays,
which it will then excecute asyncronously until the queue is emptied.
*/
class ExeQueue extends Array {
	constructor(acceleration=0){
	  super();
		this.isDequeueing = false;
		this.acceleration = acceleration;
	}

	/**
	* Packages a command's execution time, function to run, and paramaters for
	* that function together as an object, enqueues that object, then begins
	* dequeueing the array if not already doing so. Originally intended for
	* chaining animations. @param func may be contained in an arrow function to
	* preserve cascade.
	* @param {number} duration Duration of the given command.
	* @param {function} func The function to be ran.
	* @param {string} parameters All further parameters are passed to the
	* funciton upon execution.
	* Examples of valid calls:
	* 	deckAnima.enqueue(500, console.log, 1);
	* 	deckAnima.enqueue(600, console.log);
	* 	deckAnima.enqueue(300, console.log, 1, 2);
	*/
	enqueue(duration=1000, func=console.log, ...parameters) {
		// enqueue
		this.push({duration, func, parameters});
		// start dequeueing ONLY if not dequeueing already
		if (!this.isDequeueing) {
			this.isDequeueing = true;
			this.chainDequeue();
		}
	}

	// Recursively executes and removes each package from the array.
	async chainDequeue() {
		// iterate accelleration
		this.acceleration++;
		// extract package
		let commandPackage = this.shift();
		// execute function
		if (!!commandPackage.parameters)
		commandPackage.func(...commandPackage.parameters);
		else commandPackage.func();
		//

		// wait duration before continueing to next element, or before closing loop
		await setTimeout( () => {
			// escape if array is empty
			if (this.length == 0) {
				this.acceleration = 0;
				return this.isDequeueing = false;
			}
			// continue to next package if array is NOT empty.
			return this.chainDequeue();
		}, commandPackage.duration);
	}
}


	/**
	* Converts a word into partial leetspeak, so as to create valid hex codes.
	* Some letters may take up multiple characters; Others may not have an
	* accurate translation at all. Codes with up to 6 letters will be solid
	* colors; 7th letters will control opacity.
	* @param {number} duration Duration of the given command.
	* @return {string} Hex code.
	*/
function wordToHex(word, includePound=false) {
	const charKeys = {
		'A':'A',
		'B':'B',
		'C':'C',
		'D':'D',
		'E':'E',
		'F':'F',
		'G':'6',
		'H':'',
		'I':'1',
		'J':'9',
		'K':'C',
		'L':'1',
		'M':'3',
		'N':'2',
		'O':'0',
		'P':'9',
		'Q':'0',
		'R':'2',
		'S':'5',
		'T':'7',
		'U':'0',
		'V':'F',
		'W':'3',
		'X':'5',
		'Y':'7',
		'Z':'2'
	}
	let hex = '';
	for (char of word.toUpperCase()) {
		hex += charKeys[char];
		if (hex.length>7) {
			console.log(`%c#${hex}`, `color: #${hex}`);
			console.log(`%c#${hex}`, `background-color: #${hex}`);
			return includePound ? `#${hex}` : hex;
		}
	}
	while (true) {
		if (hex.length==3 || hex.length==4 || hex.length ==6 || hex.length > 7){
			console.log(`%c#${hex}`, `color: #${hex}`);
			console.log(`%c#${hex}`, `background-color: #${hex}`);
			return includePound ? `#${hex}` : hex;
		}
		hex += hex[hex.length-1];
	}
}
// wordToHex('jacob');
// wordToHex('stasio');
// wordToHex('devin');
// wordToHex('Joe');
// wordToHex('noah');
// wordToHex('nick');
// wordToHex('zack');
// wordToHex('botler');
// wordToHex('anthony');
// wordToHex('bige');
