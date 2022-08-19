// AACharacterSheet.js
/* add stylesheet */
var element = document.createElement("link");
element.setAttribute("rel", "stylesheet");
element.setAttribute("type", "text/css");
element.setAttribute("href", "./stylesheets/AACharacterSheet.css");
document.getElementsByTagName("head")[0].appendChild(element);


/* custom context menu */
const contextMenu = $("#contextMenu");
// replace default right-click menu
document.oncontextmenu = rightClick;
function rightClick(e) {
  e.preventDefault();
	contextMenu.classList.toggle('visible');
	// dont move if closing
	if (!contextMenu.classList.contains('visible')) return;
	// continue if opening:

	// move menu to mouse
	contextMenu.style.left = e.pageX + "px";
	contextMenu.style.top = e.pageY + "px";

	numOptions = 0; // TODO
	offset= 150  - ( 20 * numOptions );
	$('#contextMenuSVG').setAttribute("viewBox", `0 ${offset} 67 158`);
	$('#contextBackSVG').setAttribute("viewBox", `0 ${offset} 67 158`);

}
document.body.addEventListener('click', ()=> {
	if (contextMenu.classList.contains('visible'))
		contextMenu.classList.toggle('visible');
});



var doodlepath = '';
function doodle() {
	let path = $('#doodles path');
	document.body.classList.toggle('doodling');
	// $('#doodles')
	document.body.addEventListener('mousedown', (e)=> {
		doodlepath += ` M ${e.pageX},${e.pageY}`;
		path.setAttribute("d", doodlepath);
		console.log(path);
		document.body.addEventListener('mousemove', (e)=> {
			doodlepath += ` L ${e.pageX},${e.pageY}`;
			path.setAttribute("d", doodlepath);
		});
		document.body.addEventListener('mouseup', (e)=> {
			document.body.removeEventListener('mousemove', (e)=> {
				doodlepath += ` L ${e.pageX},${e.pageY}`;
				path.setAttribute("d", doodlepath);
			}, {once:true});
		});
	});
}
