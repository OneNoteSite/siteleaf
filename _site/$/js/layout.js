function print(arg) { console.log(arg); }



(function(document){
	
	window.Layout = window.Layout || {};
	
	// DEFAULT CONSTANTS
	var BREAKPOINTS = ["Tiny", "Small", "Medium", "Medium-Half", "Large", "Large-Qtr-First", "Large-Half", "Large-Qtr-Last", "XLarge"],
			BREAKPOINTS_FOR_STACKING = ["Tiny", "Small", "Medium"];
			
  // Private Variables
  var baseFontSize, baseRowGroup, baseRowMargin;

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
		getCurrentBreakpoint();
		
		var images = document.getElementsByClassName("image");

		if (images.length < 1) return;
				
		if (!baseFontSize) updateBaseValues(getBaseFontSize());
		
		for ( var i = 0; i < images.length; i++ ) {
			var before,
					adjust,
					checkClass = "State-SizeCheck",
					image = images[i];
			
			image.classList.add(checkClass);
			
			before = Math.floor(image.getBoundingClientRect().height);
			adjust = (baseFontSize - (before % baseFontSize));
			if (adjust == baseFontSize) adjust = 0;
			image.style.height = before + adjust + "px";
			
			image.classList.remove(checkClass);
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
			var before, adjust, newHeight, section = sections[i];
			// Reset so we can inspect default height or return to vertical flow
			section.style.height = "auto";
			// Continue on reseting but don't change them
			if (!isValid) continue;
			before = Math.floor(section.getBoundingClientRect().height);
			adjust = (baseFontSize - (before % baseFontSize));
			if (adjust == baseFontSize) adjust = 0;
			newHeight = before + adjust + "px";
			section.style.height = newHeight;

			// Old Method using RowGroups			
			// adjust = (baseRowGroup - (before % baseRowGroup));
			// if (adjust == baseRowGroup) adjust = 0;			

		}
		
		// Only do this at a certain point. Probably below medium		
		// resizeImages();

	}
		
	function setupHeroToGrid(){
		
		var hero = document.getElementById("hero");

		if (!hero) return;
		
		function heroHeightToGrid() {
			var frame, adjust, height;
			
			hero.style.height    = "100vh";
			hero.style.maxHeight = "100vmin";
			
			frame  = hero.getBoundingClientRect();
			adjust = (frame.height % baseRowGroup);
			
			if (adjust > 0){
				height = (frame.height + (baseRowGroup - adjust)) + "px";
				hero.style.height    = height;
				hero.style.maxHeight = height;		
			}
		}
		
		function adjustHeroFromFontResizeEvent(event){
			updateBaseValues(event.detail.fontSize);
			heroHeightToGrid();
		}
		
		// Event Listeners
		window.addEventListener  ('resize',            heroHeightToGrid);
		window.addEventListener  ('orientationchange', heroHeightToGrid);
		window.addEventListener  ('fontResize', adjustHeroFromFontResizeEvent);		

		// Initializers
		updateBaseValues(getBaseFontSize());
		heroHeightToGrid();
	}
	
	function setupFontResizeEvents(){
		// Create and insert dom element
		var fontSizeEventEl = document.createElement('div');
		fontSizeEventEl.id = 'fontSizeEventElement';
		fontSizeEventEl.style.cssText = 'position:absolute; width:1px; height:6rem; -webkit-transition:height .0001s ease; transition:height .0001s ease; visibility:hidden;';
		document.body.insertBefore(fontSizeEventEl, document.body.firstChild);
		
		// Listen for animation events from height changes on rem adjustments
		fontSizeEventEl.addEventListener('transitionEnd',       callFontResizeEvent);
		fontSizeEventEl.addEventListener('webkitTransitionEnd', callFontResizeEvent);
		
		// function that files the event and includes the base font size
		function callFontResizeEvent(event){
			var fontResizeEvent = new CustomEvent('fontResize', { 'detail': { fontSize: getBaseFontSize() }});
			window.dispatchEvent(fontResizeEvent);
		}
	}

	function init() {
		// EVENT LISTENERS
		doc.addEventListener(loaded,			setupBreakpointObject );
		doc.addEventListener(loaded, 			setupFontResizeEvents );
		doc.addEventListener(loaded, 			setupHeroToGrid );
		doc.addEventListener(loaded, 			resizeSections  );
		win.addEventListener(resize, 			resizeSections );
		win.addEventListener(fontResize,  resizeSections );
		win.addEventListener(orientation, resizeSections );
	}

	var win = window,
			doc = document,
			loaded      = 'DOMContentLoaded',
			resize      = 'resize',
			orientation = 'orientationchange',
			fontResize  = 'fontResize';

	init();
  
})(document);