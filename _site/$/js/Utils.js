(function(document){
	
	window.Utils = window.Utils || {};
	
	////////////////////////////////////////////////////////////////////////////////
	// Inspired by http://jrdn.io/3l112v443q0O
	////////////////////////////////////////////////////////////////////////////////	
	
	figureImages = [];

	function $id(id) { return document.getElementById(id); }
	
	function getAllSectionFigureImages() { return document.querySelectorAll("section > figure > img"); }
	
	function Output(msg) { var m = $id("messages"); m.innerHTML = msg + m.innerHTML; }
	
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
	
	// initialize
	
	function Init() {	
		if (!window.File || !window.FileList || !window.FileReader){ return; } // Check for support before we continue
	
		var fileselect = $id("fileselect");
	
		appendCSS();
		
		figureImages = Array.from( getAllSectionFigureImages() );
		
		//console.log(figureImages);
		
		var xhr = new XMLHttpRequest();
		if (!xhr.upload){ return; }
		
		console.log("XHR2 is available");
		
		for (var index = 0; index < figureImages.length; index++ ){ // file drop areas
			var image = figureImages[index];
			image.addEventListener("dragover",  FileDragHover,     false);
			image.addEventListener("dragleave", FileDragHover,     false);
			image.addEventListener("drop",      FileSelectHandler, false);			
		}
	}
	
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "dragover" : "");
	}
	

	function FileSelectHandler(e) {
		console.log(e);
		FileDragHover(e);
		var files = e.target.files || e.dataTransfer.files;
		for (var i = 0, f; f = files[i]; i++) { ParseFile(f,e.target); }
	}
	
	function ParseFile(file, image) {
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) { image.src = e.target.result; }
			reader.readAsDataURL(file);
		}
	}
	////////////////////////////////////////////////////////////////////////////////
	// Initialize 
	document.addEventListener('DOMContentLoaded', Init);

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
