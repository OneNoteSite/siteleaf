
(function(document){
	
	window.Layout = window.Layout || {};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var BREAKPOINTS = ["Tiny", "Small", "Medium", "Medium-Half", "Large", "Large-Qtr-First", "Large-Half", "Large-Qtr-Last", "XLarge"],
			BREAKPOINTS_FOR_STACKING = ["Tiny", "Small", "Medium"],
			NAV_HIDDEN = "hidden";
			
  // Private Variables
  var baseFontSize, baseRowGroup, baseRowMargin;
	var HTML, BODY, NAV, HERO, IMAGES, SECTIONS;

	// Public Variables
  Layout.breakpoint = {};
  Layout.hero = {};
  Layout.nav = {};
  // Layout.sections = {};
  // Layout.images = {};
  
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
  
  function gatherLayoutElements() {
		HTML     = doc.getElementsByTagName("html")[0];
		BODY     = doc.body;
		NAV      = doc.querySelector("body > header.sticky");
		MAIN		 = doc.querySelector("body > main");
		HERO     = doc.querySelector("body > main > header:first-child");
		IMAGES   = MAIN.getElementsByClassName("image");
		SECTIONS = MAIN.getElementsByTagName("section");
		// console.log(HTML, BODY, NAV, MAIN, HERO, IMAGES, SECTIONS);
  }
  
  function setupBreakpointObject() {
	  // Fix - Current breakpoint
	  Layout.breakpoint.list     = BREAKPOINTS;
	  Layout.breakpoint.current  = Layout.breakpoint.list[0];
	  Layout.breakpoint.vertical = BREAKPOINTS_FOR_STACKING;
	  Layout.hero.height         = null;
	  Layout.nav.height          = null;
  }
	
	function getCurrentBreakpoint() {
		var bp = window.getComputedStyle(HTML,':before').getPropertyValue('content');
		Layout.breakpoint.current = bp;
		return Layout.breakpoint.current;
	}
	
	function updateBaseValues(size){
		baseFontSize  = size;
		baseRowGroup  = size * 6;
		baseRowMargin = size * 2;
	}
	
	function getBaseFontSize() {
		var size = window.getComputedStyle(HTML).getPropertyValue("font-size"),
				unit = (size.replace("px","") * 1);
		return unit;
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function resizeImages(){

		if (IMAGES.length < 1) return;
		
		if (!baseFontSize) updateBaseValues(getBaseFontSize());
		
		for ( var i = 0; i < IMAGES.length; i++ ) {
			
			var before, adjust;
			var cls = "State-SizeCheck",
					img = IMAGES[i];
					
			if( Layout.breakpoint.vertical.indexOf(Layout.breakpoint.current) < 0) {
				img.style.height = "auto";
				// Fix - Should just continue.
				// continue;
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
		
		if (SECTIONS.length < 1) return;
		
		var current = getCurrentBreakpoint(),
				invalid = Layout.breakpoint.vertical,
				isValid = !(invalid.indexOf(current) > -1);
		
		if (!baseFontSize) updateBaseValues(getBaseFontSize());


		for ( var i = 0; i < SECTIONS.length; i++ ) {
			
			var before, adjust;
			var section = SECTIONS[i];		

			section.style.height = "auto"; 			// Reset so we can inspect default height or return to vertical flow
			
			if (!isValid) continue;							// Continue on reseting but don't change them
			
			before = Math.floor(section.getBoundingClientRect().height);
			adjust = baseFontSize - (before % baseFontSize);
			
			if (adjust == baseFontSize) adjust = 0;
			
			section.style.height = before + adjust + "px";
		}
		resizeImages();
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
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
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function handleNavWithScrollPosition(){
		var isHidden = NAV.classList.contains(NAV_HIDDEN);
		if (Layout.hero.height/1.75 >= BODY.scrollTop) {
			if (isHidden) return;
			NAV.classList.add(NAV_HIDDEN);
		} else {
			if(!isHidden) return;
			NAV.classList.remove(NAV_HIDDEN);
		}
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function heroHeightToGrid() {

		var adjust, height;
		var before = Math.floor(BODY.getBoundingClientRect().width * 0.5625);
		
		HERO.style.height = "auto";
		adjust = baseFontSize - (before % baseFontSize);

		if (adjust == baseFontSize) adjust = 0;
		
		height = before + adjust + "px";
		
		// Fix - Need to make sure we set minHeight on the smaller sizes
		// if( Layout.breakpoint.vertical.indexOf(Layout.breakpoint.current) < 0) {
				
		HERO.style.minHeight = height;
		HERO.style.height = height;
		
		Layout.hero.height = HERO.getBoundingClientRect().height;
	}
	
	function adjustHeroFromFontResizeEvent(event){
		updateBaseValues(event.detail.fontSize);
		heroHeightToGrid();
	}
	
	function setupHeroToGrid(){
		if (!HERO) return;	
		updateBaseValues(getBaseFontSize());
		heroHeightToGrid();
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function init() {
		
		// EVENT LISTENERS
		doc.addEventListener( loaded, gatherLayoutElements  );
		doc.addEventListener( loaded, setupBreakpointObject );
		doc.addEventListener( loaded, setupFontResizeEvents );
		doc.addEventListener( loaded, setupHeroToGrid );
		doc.addEventListener( loaded, resizeSections  );
		doc.addEventListener( loaded, handleNavWithScrollPosition );

		
		win.addEventListener( resize, heroHeightToGrid );
		doc.addEventListener( resize, handleNavWithScrollPosition );
		setTimeout(function(){ win.addEventListener(resize, resizeSections); }, 2000); 
		
		win.addEventListener( fontResize,  resizeSections );
		win.addEventListener( fontResize,  adjustHeroFromFontResizeEvent );
		win.addEventListener( fontResize,  handleNavWithScrollPosition );
		
		
		win.addEventListener( orientation, resizeSections   );
		win.addEventListener( orientation, heroHeightToGrid );
		win.addEventListener( orientation, handleNavWithScrollPosition );
		
		doc.addEventListener(scroll, handleNavWithScrollPosition);
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	var win = window,
			doc = document,
			loaded      = 'DOMContentLoaded',
			resize      = 'resize',
			scroll      = 'scroll',
			orientation = 'orientationchange',
			fontResize  = 'fontResize';
			
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	init();
  
})(document);