
(function(document){
	
	window.Video = window.Video || {};
	
	var VIDEO, HERO_TEXT;
		
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function checkVideoTimeForDisplay(event){
		if(VIDEO.currentTime < 1.3) {
			if(HERO_TEXT.style.visibility != "visible") HERO_TEXT.style.visibility = "visible";
		} else {
			if(HERO_TEXT.style.visibility != "hidden") HERO_TEXT.style.visibility = "hidden";
		}
	}
	
	function getVideoElement(){
		VIDEO     = doc.getElementsByTagName("video" )[0];
		HERO_TEXT = doc.getElementsByTagName("hgroup")[0];
		VIDEO.addEventListener('timeupdate', checkVideoTimeForDisplay, false);	

	}
	
	function init() {
		

		

		
		// EVENT LISTENERS
		
		
		doc.addEventListener( loaded, getVideoElement );
/*
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
*/
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	var win = window,
			doc = document,
			loaded = 'DOMContentLoaded';
			
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////

	//init();
  
})(document);