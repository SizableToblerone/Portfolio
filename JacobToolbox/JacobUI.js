/** JacobUI.js
Contents:
	JacobSwitch
	JacobFlipper
	JacobDeck
	JacobCard
*/

/** jacobSwitch.js
*/

/**
* Creates an HTML element for a binary switch. To be used in conjunction with
* the "jacobSwitch.css" stylesheet.
* @param {string} id Id attribute of the HTML element.
* @param {string} left Text for the left-side label.
* @param {string} right Text for the left-side label.
* @param {string} width Width of the html element, including CSS units.
* @param {string} funk Any addtional HTML attributes, intended for onclick.
* Assigned to the checkbox.
* @param {string} backcolorL Color of the left label background.
* @param {string} textcolorL Color of the left label text.
* @param {string} backcolorR Color of the right label background, defaults to
* backcolorL.
* @param {string} textcolorR Color of the right label text, defaults to
* textcolorL.
* @return {string} The assembled string, to be assigned to an innerHTML value.
*/
// TODO: Convert to class
function createJacobSwitch(id='MISSING', left='left', right='right',
width='6.6rem', funk='', backcolorL='#fff', textcolorL='#000',
backcolorR=backcolorL, textcolorR=textcolorL) {
	$(`#${id}`).style = `--switchWidth: ${width};
	--backcolorL: ${backcolorL};
  --textcolorL: ${textcolorL};
  --backcolorR: ${backcolorR};
  --textcolorR: ${textcolorR};`

	return `
	<input type="checkbox" class="switchChBox" id="${id}ChBox" ${funk}>
  <div class="switchContainer" >
    <div class="l_left">${left}</div>
    <div class="switchSlide"></div>
    <div class="l_right"
		style:"color:${textcolorR}; backgroundColor:${backcolorR};">
		${right}</div>
  </div>
	`;
}


/**
* Scans the document for JacobSwitches, and parses them appropriately.
* @param {string} scanClass The CSS class to query with $$().
* @return {number} The number of elements found bearing the given class.
*/
function initJacobSwitches(scanClass='toJacobSwitch') {
	switches = $$(`.${scanClass}`);
	for (element in switches) {
		params = switches[element].innerHTML.split(", ");
		switches[element].innerHTML = createJacobSwitch(switches[element].id, params[0], params[1],
			params[2], params[3], params[4], params[5], params[6], params[7],
		params[8]);

		switches[element].classList.remove('toJacobSwitch');
		switches[element].classList.add('JacobSwitch');
	}

	return switches.length;
}


/**
* Constructor function for JacobFlipper objects.
* @param {string} id ID of the DOM element to make a flipper for.
* @param {string} width Width of the html element, including CSS units.
* @param {collection} options Collection of strings .
* @param {string} funk Any addtional HTML attributes, intended for onclick.
* @return {string} The assembled string, to be assigned to an innerHTML value.
*/
// class JacobFlipper extends HTMLDivElement {
// This code is a fucking nightmare. If you're trying to adjust it, you may
// be better off tossing it out and building your own version.
class JacobFlipper {
	constructor(id, options, width='6.6rem', color='#aaf'){
		this.options 				= options; // Collection of strings for the display.
		this.flippableDivs	= Array.apply(null, Array(3));
		this.textDivs				= Array.apply(null, Array(6)); // inside flippableDivs
		this.index 					= 0;	// used for next() and prev()
		this.degrees				= [-5, 0, 5];

		this.dom = document.createElement('div'); // dom element for the flipper
		this.dom.id = id;
		this.dom.classList.add('jacobFlipper');
		this.dom.style = `--switchWidth: ${width}; --backcolor: ${color};`;
		$(`#${id}`).replaceWith(this.dom); // put the JacobFlipper in the DOM



		this.flipperButton = document.createElement('input');
		this.flipperButton.type = 'button';
		this.flipperButton.name = `${id}`;
		this.flipperButton.value = `${options[0]}`;
		this.flipperButton.setAttribute('onclick', `${id}.next()`);
		this.dom.appendChild(this.flipperButton);

		for (let x = 0; x < 3; x++) {
			this.flippableDivs[x] = document.createElement('div');
			this.flippableDivs[x].classList.add('flippable');
			this.flippableDivs[x].style =`--flipperRotX: ${this.degrees[x]}deg;`
			this.dom.appendChild(this.flippableDivs[x]);

			this.textDivs[2*x] = 		document.createElement('div');
			this.textDivs[2*x+1] = 	document.createElement('div');
			this.textDivs[2*x].classList.add('flipFore');
			this.textDivs[2*x+1].classList.add('flipRear');
			this.flippableDivs[x].appendChild(this.textDivs[2*x]);
			this.flippableDivs[x].appendChild(this.textDivs[2*x+1]);
		}
		this.textDivs[0].innerHTML = options[0];
		this.textDivs[4].innerHTML = options[0];
		this.textDivs[4].style = `--tintcolor: #00000022`;
	}

	next() {
		this.index += 1;
		// $('#index').innerHTML = this.index;
		// console.log(this.index);
		let nextValue = this.options[(this.index) % this.options.length];
		this.textDivs[this.getHiFace(this.index)].innerHTML = nextValue;
		this.textDivs[this.getLoFace(this.index)].innerHTML = nextValue;
		this.flipperButton.value = nextValue;

		for (let x in this.textDivs) this.textDivs[x].style = '--tintcolor: #00000011';
		this.textDivs[this.getHiFace(this.index - 1)].style = `--tintcolor: #000000aa`;
		this.textDivs[this.getLoFace(this.index)].style = `--tintcolor: #00000022`;


		this.degrees[(this.index + 0) % 3] -= 5;
		this.degrees[(this.index + 1) % 3] -= 5;
		this.degrees[(this.index + 2) % 3] -= 170; // card flipping down
		// this.textDivs[((this.index + 2) % 3)*2].style = `--tintcolor: #00000077`;
		// this.textDivs[((this.index + 2) % 3)*2+1].style = `--tintcolor: #00000011`;
		this.flippableDivs[0].style =`--flipperRotX: ${this.degrees[0]}deg;`;
		this.flippableDivs[1].style =`--flipperRotX: ${this.degrees[1]}deg;`;
		this.flippableDivs[2].style =`--flipperRotX: ${this.degrees[2]}deg;`;
		this.flippableDivs[2].style =`--flipperRotX: ${this.degrees[2]}deg;`;


		// console.log(`%c${this.dom.id}.index:	${this.index}`, 'color: #aaf');
		console.log(`%ctint index:	${((this.index + 2) % 3)*2}`, 'color: #aaf');
	}

	getHiFace(index) {
		switch (index % 6) {
			case 0:
				return 0;
			case 1:
				return 2;
			case 2:
				return 4;
			case 3:
				return 1;
			case 4:
				return 3;
			case 5:
				return 5;
		}
	}
	getLoFace(index) {
		switch (index % 6) {
			case 0:
				return 4;
			case 1:
				return 1;
			case 2:
				return 3;
			case 3:
				return 5;
			case 4:
				return 0;
			case 5:
				return 2;
		}
	}


	value() {
		return $(`#${this.id} input[type='button']`).value;
	}
}
// console.log(`${initJacobSwitches()} JacobSwitches found`);


/** jacobDeck.js
*/

class JacobDeck
{
/**
* Scans the given DOM element for text that can be parsed into jacobCards, then
* parses them appropriately.
* @param {string} deckId The id of the DOM element to turn into a jacobDeck.
* @param {number} deckPosX Value (px) to set as the stowed deck's left margin.
* @param {number} deckPosY Value (px) to set as the stowed deck's top margin.
* @param {number} displayPosX The display position's X-axis offset (px) from the
* stowed deck.
* @param {number} displayPosY The display position's Y-axis offset (px) from the
* stowed deck.
* @param {bool} replace whether to automatically replace the element of #deckId.
*/
	constructor(id)
	{
		this.e 							= document.createElement('div');
		this.e.classList.add('jacobDeck');
		this.cards					= [];
		this.cardPreviews		= []; // TODO: Implement.
		this.deckAnima			= new ExeQueue();
		let uncardedDivs		= $$(`#${id} > div`);
		setTimeout(()=>{
			this.deckPosX			= cssReUnit($css(this.e,'--deckPosX'),'px',0);
			this.deckPosY			= cssReUnit($css(this.e,'--deckPosY'),'px',0);
			this.displayPosX	= cssReUnit($css(this.e,'--displayPosX'),'px',0);
			this.displayPosY	= cssReUnit($css(this.e,'--displayPosY'),'px',0);
			this.cardThickness= cssReUnit($css(':root','--cardThickness'),'px',0);
			this.verticalModifier = (this.e.clientHeight / this.cards.length);
			console.log(this.e.clientHeight,this.cards.length);

			console.log(this.deckPosX,this.deckPosY,this.displayPosX,this.displayPosY, this.cardHeight);
		}, 10);

		// make a card for each div
		for (let card of uncardedDivs) {
			let jcard = new JacobCard( card, this, (this.cards.length) );
			this.cards.push(jcard);
			this.e.appendChild(jcard.e);
      jcard.e.addEventListener('click', ()=>{this.displayCard(jcard)},
       { once: true } );
		}
		// replace divs with their cards
		$(`#${id}`).replaceWith(this.e);
	}


	/**
	* Animates a card to the display position.
	* @param {} card Id of the card to display.
	*/
	displayCard(card)
	{
		// stow displayed card(s)
		this.stowAll();

		// animate this card to the displayed position
		// let verticalModifier = (this.e.clientHeight / this.cards.length) * card.i;
		// let verticalModifier = this.cardThickness * card.i;
		// console.log('verticalModifier', verticalModifier);

		card.cardAnima.enqueue(500,()=> { // console.log('pull out card');
			card.e.style = `
				transition-duration: 500ms;
				transition-timing-function: ease-in;
				--xPos: calc( -1 * var(--peekDistance) - var(--cardWidth));
				`;
		});
		card.cardAnima.enqueue(1010,()=> { // console.log('pull out card');
			card.e.style = `
			--xPos: calc( -1 * var(--peekDistance) - var(--cardWidth));
				transition-property: transform, offset;
				transition-delay: 300ms, 0ms;
				transition-duration: 700ms, 1000ms;
				transition-timing-function:
				cubic-bezier(.4,0,.8,.2),	cubic-bezier(.42,.84,.61,.11);


				offset-path: path('M 0,0 C -84,120 -300,320 \
				${this.displayPosX},${this.displayPosY} Z');
				offset-distance: 54%;

				transform:
				scale(1)
				translateY(calc( var(--yPos) - ${this.verticalModifier*card.i}px ));
				`;
		});
	}

	stowAll() {
		for (let i in this.cards)
		if (this.cards[i].e.style.offsetDistance == '54%')
		{
			let card = this.cards[i];
			let verticalModifier = (this.e.clientHeight / this.cards.length) * i;

			card.cardAnima.enqueue(1300,()=> {
				card.e.style = `
					transition-property: transform, offset;
					transition-delay: 0ms, 600ms;
					transition-duration: 300ms, 700ms;
					transition-timing-function:
					ease-in,	cubic-bezier(.17,.84,.44,1);

					transform:;

					offset-path: path('M 0,0 C -84,120 -300,320 \
					${this.displayPosX},${this.displayPosY-verticalModifier} Z');
					offset-distance: 100%;`;
			});
			card.cardAnima.enqueue(100,()=> {
				card.e.style = ``;
				card.e.addEventListener('click', ()=>{ this.displayCard(card) },
				{ once: true } );
			});

		}
	}

	/**
	* Optional. Adds card previews, to appear beside the deck when hovering over a card.
	* @param {} card Id of the card to display.
	*/
	addPreview(preview, index=cardPreviews.length)
	{
		cardPreviews[index] = preview;
	}

	previewCard() {}

}

class JacobCard
{
/**
* Converts the given DOM element into a 3d card. To be used in conjunction with
* the "jacobDeck.css" stylesheet.
* @param {string} element HTML DOM element to be parsed into a card.
* @param {JacobDeck} parent Parent deck.
* @param {number} index This card's index in its parent's *.cards* array.
*/
	constructor(element, parent, index)
	{
		// create DOM element for card
		this.deck = parent;
		this.e = document.createElement('div');
		this.e.id = element.id;
		this.e.classList = element.classList;
		this.e.classList.add('jacobCard');
		this.faces = [];
		this.cardAnima = new ExeQueue();
		this.i = index;
		this.title =
		element.querySelector('p.title') || document.createElement('p');

		// add 6 face divs to card
		for (let f = 0; f < 6; f++) {
			this.faces[f] = document.createElement('div');
			this.e.appendChild(this.faces[f]);
		}
		// style face divs,  add content to front div
		this.faces[0].classList.add('front');
		this.faces[0].innerHTML = element.innerHTML;
		this.faces[1].classList.add('rear');
		this.faces[2].classList.add('left');
		this.faces[2].appendChild(this.title);
		this.faces[3].classList.add('right');
		this.faces[4].classList.add('top');
		this.faces[5].classList.add('bottom');
	}

	/**
	* Animates this card to the display position.
	*/
	display()
	{
		// stow previous displayed card
		this.deck.stowAll();

		// animate this card to the displayed position
		this.cardAnima.enqueue(1000,()=>{ this.e.classList.add('displayPull'); });
		this.cardAnima.enqueue(1000,()=>
		{
			this.e.classList.add('displaying');
			this.e.classList.add('displayCenter');
			this.e.classList.remove('displayPull');
		});
		this.cardAnima.enqueue(1000,()=>
		{
			this.e.classList.add('displayed');
			this.e.classList.remove('displayCenter') ;
		});
	}
}
