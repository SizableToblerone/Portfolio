/** JacobUI.js
Contents:
	JacobSwitch
	JacobFlipper
	JacobAggregateFlipper
	JacobDeck
	JacobCard
*/

class JacobSwitch
{
	/**
	* Constructor function for JacobSwitch objects, Jacob's custom.
	* @param {string} id ID of the DOM element to replace with a switch.
	* @param {collection} options Array of 2 strings, for the left and right text.
	*/
	constructor(id='', options=[])
	{
		this.options 			= options;

		this.e 						= document.createElement('div');
		this.e.id = id;
		this.e.classList.add('jacobSwitch');

		this.checkbox 	= document.createElement('input');
		this.checkbox.type = 'checkbox';
		this.e.appendChild(this.checkbox);


		let left = document.createElement('div');
		left.classList.add('l_left');
		left.innerHTML = this.options[0];
		this.e.appendChild(left);

		let switchSlide = document.createElement('div');
		switchSlide.classList.add('switchSlide');
		this.e.appendChild(switchSlide);

		let right = document.createElement('div');
		right.classList.add('l_right');
		right.innerHTML = this.options[1];
		this.e.appendChild(right);


		// change trigger
		this.checkbox.addEventListener('change',(event)=>	{
			return this.e.classList.toggle('checked');	});
		// keyboard controls
		this.checkbox.addEventListener('keydown',(event)=>
		{
			let k = event.keyCode;
			/* right if down, right, S, D, J, or L; left instead
			if also holding modifier.*/
			if(k==40 || k==39 || k==83 || k==68 || k==74 || k==76)
			{
				if (event.shiftKey || event.altKey || event.ctrlKey)
					return this.checkbox.checked = 0;
				return this.checkbox.checked = 1;
			}
			// left if up, left, W, A, H, or K
			if(k==38 || k==37 || k==87 || k==65 || k==72 || k==75)
			{
				if (event.shiftKey || event.altKey || event.ctrlKey)
					return this.checkbox.checked = 1;
				return this.checkbox.checked = 0;
			}

		});

		if(id == '')
		{
			console.trace('%cNo ID provided.', 'color:#f77');
			return this;
		}
		else if ($(`#${id}`) == null)
		{
			console.error(`No element with the ID #${id} exists.`);
			return this;
		}

		if( $(`#${id}`).classList.length )
			this.e.classList.add($(`#${id}`).classList);
		$(`#${id}`).replaceWith(this.e);
	}

	value() { return this.options[this.checkbox.checked*1]; }
}

class JacobNewSwitch
{
	/**
	* Constructor function for JacobSwitch objects, Jacob's custom UI element.
	* @param {string} id ID of the DOM element to replace with a switch.
	* @param {collection} options Array of 2 strings, for the left and right text.
	*/
	constructor(id='', options=[])
	{
		this.options 			= options;

		this.e 						= document.createElement('div');
		this.e.classList.add('jacobNewSwitch');

		this.checkbox 	= document.createElement('input');
		this.checkbox.type = 'checkbox';
		this.e.appendChild(this.checkbox);

		let switchSlide
		 = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		switchSlide.classList.add('newSwitchSlide');
		switchSlide.setAttribute('width', 200);
		switchSlide.setAttribute('height', 200);
		// switchSlide.setAttribute('viewBox', '-1 -16.5 18 18');
		switchSlide.setAttribute('viewBox', '0 0 16 16');

		switchSlide.innerHTML = `
			<path id=test stroke=black stroke-width=1px fill=none
			 d='
		 		M 								 8  1 \
		 		C 12  1		15  4		15  8 \
		 		C 15 12		12 15 	 8 15 \
		 		C  4 15 	 1 12 	 1  8 \
		 		C  1  4 	 4  1 	 8  1 \
		 		z'>
			</path>
		`;



		this.e.appendChild(switchSlide);

		// this.e.addEventListener('mousedown',()=>
		// {
		// 	// line
		// 	$('#test').setAttribute('d', '\
		// 	M 								8 8 \
		// 	C 12 8		15 8		15 8 \
		// 	C 15 8 	12 8		8 8 \
		// 	C 4 8 		1 8		1 8 \
		// 	C 1 8 		4 8			8 8 \
		// 	z')
		// });
		// this.e.addEventListener('mouseup',()=>
		// {
		// 	// line
		// 	$('#test').setAttribute('d', '\
		// 	 M 								 8  1 \
		// 	 C 12  1		15  4		15  8 \
		// 	 C 15 12		12 15 	 8 15 \
		// 	 C  4 15 	 1 12 	 1  8 \
		// 	 C  1  4 	 4  1 	 8  1 \
		// 	 z')
		// });

		// change trigger
		// this.checkbox.addEventListener('change',(event)=>
		// {
		// 	if (this.checkbox.checked)
		// 		return this.e.classList.add('checked');
		// 	return this.e.classList.remove('checked');
		// });
		// // keyboard controls
		// this.checkbox.addEventListener('keydown',(event)=>
		// {
		// 	let k = event.keyCode;
		// 	/* right if down, right, S, D, J, or L; left instead
		// 	if also holding modifier.*/
		// 	if(k==40 || k==39 || k==83 || k==68 || k==74 || k==76)
		// 	{
		// 		if (event.shiftKey || event.altKey || event.ctrlKey)
		// 			return this.checkbox.checked = 0;
		// 		return this.checkbox.checked = 1;
		// 	}
		// 	// left if up, left, W, A, H, or K
		// 	if(k==38 || k==37 || k==87 || k==65 || k==72 || k==75)
		// 	{
		// 		if (event.shiftKey || event.altKey || event.ctrlKey)
		// 			return this.checkbox.checked = 1;
		// 		return this.checkbox.checked = 0;
		// 	}
		//
		// });

		if(id != '') $(`#${id}`).replaceWith(this.e);
		// if(id != '') $(`#${id}`).replaceWith(switchSlide);
		this.e.id = id;
	}

	value() { return this.options[this.checkbox.checked*1]; }
}

class JacobFlipper
{
	/**
	* Constructor function for JacobFlipper objects.
	* @param {string} id ID of the DOM element to replace with a flipper.
	* @param {collection} options Strings to display as selections.
	* @param {HexGradient} colors A HexGradient object to be used to color the
	* backgrounds for each option. No gradient if left blank.
	*/
	constructor(id='', options=[], colors)
	{
		this.options 				= options; // Collection of strings for the display.
		this.flippableDivs	= Array.apply(null, Array(3));
		this.textDivs				= Array.apply(null, Array(6)); // inside flippableDivs
		this.index 					= 666*options.length;	// used for next() and prev()
		this.degrees				= [-5, 0, 5];
		this.isInput = options.length > 0;
		this.colors = colors;

		// dom element for the flipper
		this.e = document.createElement('div');
		this.e.id = id;
		this.e.classList.add('jacobFlipper');

		if (this.isInput)
		{
			this.inputEvent = new Event("input");
			// assemble button and its control listeners
			this.flipperButton = document.createElement('input');
			this.flipperButton.type = 'button';
			this.flipperButton.name = `${id}`;
			// this.flipperButton.value = `${options[0]}`;

			// next() on left click; prev() instead if also holding modifier
			this.flipperButton.addEventListener('mouseup',(event)=>
			{
				if(!event.button){
					if (event.shiftKey || event.altKey || event.ctrlKey)
						return this.prev();
					return this.next();
				}
			});

			// prev() on right click
			this.flipperButton.addEventListener('contextmenu',(event)=>
			{
				event.preventDefault();
				this.prev();
			});

			// set keyboard controls
			// keycodes:
			// https://newbedev.com/javascript-js-keydown-codes-code-example
			this.flipperButton.addEventListener('keydown',(event)=>
			{
				let k = event.keyCode;
				/* next() if spacebar, enter, down, right, S, D, J, or L; prev() instead
				if also holding modifier.*/
				if(k==32 || k==13 || k==40 || k==39 || k==83 || k==68 || k==74 || k==76)
				{
					if (event.shiftKey || event.altKey || event.ctrlKey)
						return this.prev();
					return this.next();
				}
				// prev() if up, left, W, A, H, or K
				if(k==38 || k==37 || k==87 || k==65 || k==72 || k==75)
				{
					if (event.shiftKey || event.altKey || event.ctrlKey)
						return this.next();
					return this.prev();
				}

			});
			this.e.appendChild(this.flipperButton);
		}
		else
		{
			this.flipperButton = document.createElement('div');
			this.flipperButton.name = `${id}`;
		}

		// create divs to be 3D transformed
		for (let x = 0; x < 3; x++) {
			this.flippableDivs[x] = document.createElement('div');
			this.flippableDivs[x].classList.add('flippable');
			this.flippableDivs[x].style =`--flipperRotX: ${this.degrees[x]}deg;`
			this.e.appendChild(this.flippableDivs[x]);

			this.textDivs[2*x] = 		document.createElement('div');
			this.textDivs[2*x+1] = 	document.createElement('div');
			this.textDivs[2*x].classList.add('flipFore');
			this.textDivs[2*x+1].classList.add('flipRear');
			this.flippableDivs[x].appendChild(this.textDivs[2*x]);
			this.flippableDivs[x].appendChild(this.textDivs[2*x+1]);
		}
		// this.textDivs[0].innerHTML = options[0];
		// this.textDivs[4].innerHTML = options[0];
		this.textDivs[0].innerHTML = '-';
		this.textDivs[4].innerHTML = '-';
		this.textDivs[4].style = `--tintcolor: #0002`;



		if(id=='')
			// console.trace('%cNo ID provided.', 'color:#f77');
			return this;
		if ($(`#${id}`)==null) {
			console.error(`No element with the ID #${id} exists.`);
			return this;
		}

		if( $(`#${id}`).classList.length )
			this.e.classList.add($(`#${id}`).classList);

		$(`#${id}`).replaceWith(this.e); // put the JacobFlipper in the DOM

		this.prev();
		this.next();
		if (options.length==0) this.next('0');
	}

	/**
	* Swaps input flipper to the next option. Default paramater is used for
	* clicked inputs; Paramater is only to be passed in for non-input flippers.
	*/
	next(nextValue=null)
	{
		this.index += 1;
		let size = this.options.length;
		if (nextValue==null)
		 nextValue = this.options[(this.index) % size];
		let hiFace = this.textDivs[this.getHiFace(this.index)];
		let loFace = this.textDivs[this.getLoFace(this.index)];
		hiFace.innerHTML = nextValue;
		loFace.innerHTML = nextValue;
		if (this.isInput) this.flipperButton.value = nextValue;
		// this.selectable.innerHTML = nextValue;
		this.value = nextValue;

			for (let x in this.textDivs) this.textDivs[x].style =
			 `--tintcolor: #00000005; background-color:
			  ${this.colors?.getColor(this.index % size / size)}`;
			this.textDivs[this.getHiFace(this.index - 1)].style =
			 `--tintcolor: #0002;	background-color:
			  ${this.colors?.getColor((this.index-1) % size / size)}`;
			this.textDivs[this.getLoFace(this.index)].style =
			 `--tintcolor: #00000015; background-color:
			 ${this.colors?.getColor(this.index % size / size)}`

		this.degrees[(this.index + 0) % 3] -= 5;
		this.degrees[(this.index + 1) % 3] -= 5;
		this.degrees[(this.index + 2) % 3] -= 170; // card flipping down
		this.flippableDivs[0].style =`--flipperRotX: ${this.degrees[0]}deg;`;
		this.flippableDivs[1].style =`--flipperRotX: ${this.degrees[1]}deg;`;
		this.flippableDivs[2].style =`--flipperRotX: ${this.degrees[2]}deg;`;

		this.inputEvent ? this.flipperButton.dispatchEvent(this.inputEvent):0;
	}
	/* Swaps input flipper to the previous option. */
	prev(nextValue=null)
	{
		this.index -= 1;
		let size = this.options.length;
		if (nextValue==null)
		 nextValue = this.options[(this.index) % size];
		this.textDivs[this.getHiFace(this.index)].innerHTML = nextValue;
		this.textDivs[this.getLoFace(this.index)].innerHTML = nextValue;
		if (this.isInput) this.flipperButton.value = nextValue;
		// this.selectable.innerHTML = nextValue;
		this.value = nextValue;

			for (let x in this.textDivs) this.textDivs[x].style =
				`--tintcolor: #00000005; background-color:
			  ${this.colors?.getColor(this.index % size / size)}`;
			this.textDivs[this.getHiFace(this.index - 1)].style =
				`--tintcolor: #0002;	background-color:
			  ${this.colors?.getColor((this.index-1) % size / size)}`;
			this.textDivs[this.getLoFace(this.index)].style =
				`--tintcolor: #00000015; background-color:
			 ${this.colors?.getColor(this.index % size / size)}`;


		this.degrees[(this.index + 0) % 3] += 170; // card flipping up
		this.degrees[(this.index + 1) % 3] += 5;
		this.degrees[(this.index + 2) % 3] += 5;
		this.flippableDivs[0].style =`--flipperRotX: ${this.degrees[0]}deg;`;
		this.flippableDivs[1].style =`--flipperRotX: ${this.degrees[1]}deg;`;
		this.flippableDivs[2].style =`--flipperRotX: ${this.degrees[2]}deg;`;

		// console.log(`%ctint index:	${((this.index + 2) % 3)*2}`, 'color: #aaf');
		// console.log(this.degrees);
		// console.log(this.index, this.getHiFace(this.index), this.getLoFace(this.index));

		this.inputEvent ? this.flipperButton.dispatchEvent(this.inputEvent):0;
	}

	getHiFace(index)
	{
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
	getLoFace(index)
	{
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
}

class JacobAggregateFlipper
{
	/**
	* Data display box composed of JacobFlippers, intended for numerical displays.
	* @param {string} id The id of the DOM element to replace with an answer box.
	* @param {number} length Number of flippers to make.
	*/
	constructor(id, length)
	{
			this.e = document.createElement('div');
			this.e.id = id;
			this.flippers = [];

			for (let i=0; i < length; i++)
			{
				this.flippers[this.flippers.length] = new JacobFlipper();
				this.e.appendChild(this.flippers[this.flippers.length-1].e);
			}

		this.selectable = document.createElement('div');
		this.selectable.innerHTML = '0';
		this.selectable.classList.add('selectable');
		this.e.appendChild(this.selectable);

		if( $(`#${id}`).classList.length )
			this.e.classList = ($(`#${id}`).classList);
		$(`#${id}`).replaceWith(this.e); // put the JacobAggregateFlipper in the DOM
		this.display('');
		this.e.classList.add('jacobAggregateFlipper');
	}

	/**
	* Displays the passed number in the box.
	* @param {string} id The id of the DOM element to replace with an answer box.
	* @param {number} wholeDigits Number of digits to the left of the decimal.
	* @param {number} fractionalDigits Number of digits to the right of the decimal.
	*/
	display(disp)
	{
		disp = '                                    '+disp.toString();
		let fl = this.flippers.length-1;

		for (let i=0; i <= fl; i++) {
			if (this.flippers[fl-i].value != disp[disp.length-1-i])
				this.flippers[fl-i].next(disp[disp.length-1-i]);
		}

		this.selectable.innerHTML = disp;
	}
}


/** jacobDeck.js
*/

class JacobDeck
{
/**
* Scans the given DOM element for text that can be parsed into jacobCards, then
* parses them appropriately. This class is a DISASTER when the user mash-clicks
* cards. I have tried so many ways to fix it.
* @param {string} deckId The id of the DOM element to turn into a jacobDeck.
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
			this.verticalModifier = (this.e.clientHeight / this.cards.length);
		}, 10);

		// make a card for each div
		for (let card of uncardedDivs) {
			let jcard = new JacobCard( card, this, (this.cards.length) );
			this.cards.push(jcard);
			this.e.appendChild(jcard.e);
      jcard.e.addEventListener('click', ()=>{this.displayCard(jcard)},
       { once: true } );
		}

		this.e.classList.add($(`#${id}`).classList);
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
		let displayPosX	= cssReUnit($css(this.e,'--displayPosX'),'px',0);
		let displayPosY	= cssReUnit($css(this.e,'--displayPosY'),'px',0);
		let mobileVertMult	= $css(this.e,'--mobileVertMult');
		card.cardAnima.enqueue(500,()=> { // console.log('pull out card');
			$css(card.e, 'transition-duration', '500ms');
			$css(card.e, 'transition-timing-function', 'ease-in');
			$css(card.e, '--xPos', 'calc( -1 * var(--peekDistance) - var(--cardWidth))');
		});
		card.cardAnima.enqueue(1010,()=> { // console.log('pull out card');
			$css(card.e, 'transition-property', 'transform, offset');
			$css(card.e, 'transition-delay', '300ms, 0ms');
			$css(card.e, 'transition-duration', '700ms, 1000ms');
			$css(card.e, 'transition-timing-function', 'cubic-bezier(.4,0,.8,.2),	cubic-bezier(.42,.84,.61,.11)');

			$css(card.e, 'offset-path', `path('M 0,0 C -84,120 -300,320 \
			${displayPosX},${displayPosY} Z')`);
			$css(card.e, 'offset-distance', '54%');
			$css(card.e, 'transform', `scale(1)
			translateY(calc( var(--yPos) - ${this.verticalModifier*card.i*mobileVertMult}px ))`);
		});
	}

	stowAll() {
		for (let i in this.cards){
			let card = this.cards[i];

			// skip non-applicable cards
			let offsetDistance = $css(card.e, 'offset-distance');
			offsetDistance = offsetDistance.substr(0,offsetDistance.length-1)*1;
			if (offsetDistance > 54 || offsetDistance == 0) continue;

				card.cardAnima.enqueue(1300,()=> {
					$css(card.e, '--xPos', '0');
					$css(card.e, 'transition-delay', '0ms, 600ms');
					$css(card.e, 'transition-duration', '300ms, 700ms');
					$css(card.e, 'transition-timing-function', 'ease-in,	cubic-bezier(.17,.84,.44,1)');

					$css(card.e, 'transform', '');
					$css(card.e, 'offset-distance', '100%');
				});
				card.cardAnima.enqueue(100,()=> {
					card.cardAnima.length = 0; // clears the queue;
					card.cardAnima = new ExeQueue(); // clears the queue;
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
