/*
function print(arg) { 
	//return;
	console.log(arg);
}
*/

(function(document){
	
	window.Layout = window.Layout || {};
	
	// DEFAULT CONSTANTS
	var BREAKPOINTS = ["Tiny", "Small", "Medium", "Medium-Half", "Large", "Large-Qtr-First", "Large-Half", "Large-Qtr-Last", "XLarge"],
			BREAKPOINTS_FOR_STACKING = ["Tiny", "Small", "Medium"];
			
  // Private Variables
  var baseFontSize, baseRowGroup, baseRowMargin;
	var HERO, IMAGES;

	// Public Variables
  Layout.breakpoint = {};
	
  
  function setupBreakpointObject() {
	  Layout.breakpoint.list     = BREAKPOINTS;
	  Layout.breakpoint.current  = Layout.breakpoint.list[0];
	  Layout.breakpoint.vertical = BREAKPOINTS_FOR_STACKING;
  }
	
	function updateBaseValues(size){
		baseFontSize  = size;
		baseRowGroup  = size * 6;
		baseRowMargin = size * 2;
	}
	
	function getBaseFontSize() {
		var el   = document.getElementsByTagName("html")[0],
		    size = window.getComputedStyle(el).getPropertyValue("font-size"),
				unit = (size.replace("px","") * 1);
		return unit;
	}
	
	function getCurrentBreakpoint() {
		var htmlTag = document.getElementsByTagName("html")[0];
		var bp = window.getComputedStyle(htmlTag,':before').getPropertyValue('content');
		Layout.breakpoint.current = bp;
		return Layout.breakpoint.current;
	}
	
	function resizeImages(){
		//getCurrentBreakpoint();
	
		var images = document.getElementsByClassName("image");
		
		if (images.length < 1) return;
		if (!baseFontSize) updateBaseValues(getBaseFontSize());
		
		for ( var i = 0; i < images.length; i++ ) {
			var before, adjust;
			var cls = "State-SizeCheck",
					img = images[i];
			if( Layout.breakpoint.vertical.indexOf(Layout.breakpoint.current) < 0) {
				img.style.height = "auto";
			} else {
				img.classList.add(cls);				
				before = Math.floor(img.getBoundingClientRect().height);
				adjust = (baseFontSize - (before % baseFontSize));
				if (adjust == baseFontSize) adjust = 0;
				img.style.height = before + adjust + "px";
				img.classList.remove(cls);
			}
		}
	}
	
	function resizeSections() {
		
		var sections = document.body.getElementsByTagName("section");
		
		if (sections.length < 1) return;
		
		var current = getCurrentBreakpoint(),
				invalid = Layout.breakpoint.vertical,
				isValid = !(invalid.indexOf(current) > -1);
		
		if (!baseFontSize) updateBaseValues(getBaseFontSize());


		for ( var i = 0; i < sections.length; i++ ) {
			var before, adjust, newHeight;
			var section = sections[i];
					
			// Reset so we can inspect default height or return to vertical flow
			section.style.height = "auto";
			// Continue on reseting but don't change them
			if (!isValid) continue;
			
			before = Math.floor(section.getBoundingClientRect().height);
			adjust = (baseFontSize - (before % baseFontSize));
			
			if (adjust == baseFontSize) adjust = 0;
			newHeight = before + adjust + "px";
			section.style.height = newHeight;

		}
		
		resizeImages();
	}
	
	function heroHeightToGrid() {
		var adjust, height;
		var before = Math.floor(document.body.getBoundingClientRect().width * 0.5625);
		HERO.style.height = "auto";
		adjust = baseFontSize - (before % baseFontSize);

		if (adjust == baseFontSize) adjust = 0;
		
		height = before + adjust + "px";
// 		HERO.style.height    = height;
		HERO.style.minHeight = height;
	}
	
	function adjustHeroFromFontResizeEvent(event){
		updateBaseValues(event.detail.fontSize);
		heroHeightToGrid();
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
		
	function setupHeroToGrid(){
		HERO = doc.querySelector("main > header:first-child");
		if (!HERO) return;	
		updateBaseValues(getBaseFontSize());
		heroHeightToGrid();
	}
	
	function setupFontResizeEvents(){
		// Create and insert dom element
		var fontSizeEventEl = document.createElement('div');
		fontSizeEventEl.id  = 'fontSizeEventElement';
		fontSizeEventEl.style.cssText = 'position:absolute; width:1px; height:6rem; -webkit-transition:height .0001s ease; transition:height .0001s ease; visibility:hidden;';
		document.body.insertBefore(fontSizeEventEl, document.body.firstChild);
		
		// Listen for animation events from height changes on rem adjustments
		fontSizeEventEl.addEventListener('transitionEnd',       callFontResizeEvent);
		fontSizeEventEl.addEventListener('webkitTransitionEnd', callFontResizeEvent);
		
		// function that files the event and includes the base font size
		function callFontResizeEvent(event){
			var fontResizeEvent = new CustomEvent('fontResize', { 'detail': { fontSize: getBaseFontSize() }});
			window.dispatchEvent( fontResizeEvent );
		}
	}

	function init() {
		
		// EVENT LISTENERS
		doc.addEventListener( loaded,			 setupBreakpointObject );
		doc.addEventListener( loaded, 		 setupFontResizeEvents );
		doc.addEventListener( loaded, 		 setupHeroToGrid );
		doc.addEventListener( loaded, 		 resizeSections  );

		
		win.addEventListener( resize, 		 heroHeightToGrid );
		setTimeout(function(){win.addEventListener( resize, resizeSections);}, 2000); 
		
		win.addEventListener( fontResize,  resizeSections );
		win.addEventListener( fontResize,  adjustHeroFromFontResizeEvent );
		
		win.addEventListener( orientation, resizeSections   );
		win.addEventListener( orientation, heroHeightToGrid );
	}

	var win = window,
			doc = document,
			loaded      = 'DOMContentLoaded',
			resize      = 'resize',
			orientation = 'orientationchange',
			fontResize  = 'fontResize';

	init();
  
})(document);


// Old Method using RowGroups			
// adjust = (baseRowGroup - (before % baseRowGroup));
// if (adjust == baseRowGroup) adjust = 0;