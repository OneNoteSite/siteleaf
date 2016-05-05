(function(document){

////////////////////////////////////////////////////////////////////////////////
// Inspired by http://jrdn.io/3l112v443q0O
////////////////////////////////////////////////////////////////////////////////
	
	window.Utils = window.Utils || {};

	figureImages = [];
	
	////////////////////////////////////////////////////////////////////////////////
	
	function allFigureImages() { return document.querySelectorAll("section > figure > img"); }
	
	////////////////////////////////////////////////////////////////////////////////
	
	function init() {
		if (!window.File || !window.FileList || !window.FileReader) return;
		appendCSS();
		figureImages = Array.from( allFigureImages() );
		var xhr = new XMLHttpRequest();
		if (!xhr.upload){ return; }
		
		for (var i = 0; i < figureImages.length; i++ ){ // file drop areas
			var image = figureImages[i];
			image.addEventListener("dragover",  FileDragHover,     false);
			image.addEventListener("dragleave", FileDragHover,     false);
			image.addEventListener("drop",      FileSelectHandler, false);			
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////	
	
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "dragover" : "");
	}

	function FileSelectHandler(e) {
		FileDragHover(e);
		var files = e.target.files || e.dataTransfer.files;
		for (var i = 0, f; f = files[i]; i++) { ParseFile(f,e.target); }
	}
	
	////////////////////////////////////////////////////////////////////////////////	
	
	function ParseFile(file, image) {
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) { image.src = e.target.result; }
			reader.readAsDataURL(file);
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////	
	
	function appendCSS(){
	  var css    = document.createElement('style'),
		    styles = ".dragover { box-sizing: border-box; border: 2px dashed black; }";
		css.type = 'text/css';
		if (css.styleSheet){
			css.styleSheet.cssText = styles;
	  } else {
		  css.appendChild(document.createTextNode(styles));
		}
		document.getElementsByTagName("head")[0].appendChild(css);
	}
	
	////////////////////////////////////////////////////////////////////////////////
	// Initialize 
	////////////////////////////////////////////////////////////////////////////////
	
	document.addEventListener('DOMContentLoaded', init);
	
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

})(document);


	/*
	function resizeWindow(){
		if(json.resize){
			var screenWidth = 1232;
			window.resizeTo(screenWidth, screen.availHeight);
			setTimeout( function(){ window.moveTo((screen.availWidth - screenWidth)/2,0);}, 1000);			
		}
	}
	
	resizeWindow();
	*/
