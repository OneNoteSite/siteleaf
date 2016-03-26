(function(document){
	
	window.Utils = window.Utils || {};
	
	function displaySize(){
		var style,
				id      = "SizeNav",
				sizeNav = document.getElementById(id);
		
		if (!sizeNav){
			// Add Element to the page
			sizeNav = doc.createElement("small");
			sizeNav.id = id;
			style = {
				"position": "fixed",
				 "z-index": "1000",
				     "top": "50%",
				    "left": "50%",
			"text-align": "center",
			"background": "rgba(0,0,0,.5)",
				   "color": "rgba(255,255,255,1)",
				 "padding": ".5rem 0rem 1rem 0rem",
	 "border-radius": "1rem",
				   "width": "6rem",
				  "height": "3.25rem",
			"box-sizing": "border-box",
				  "margin": "-1.625rem 0 0 -3rem",
				 "opacity": 1,
			"transition": "opacity .25s ease"
			}
			for (var prop in style){ sizeNav.style[prop] = style[prop]; }
			doc.body.appendChild(sizeNav);
		}
		
		if(timerID){ clearTimeout(timerID); }
		
		sizeNav.style.opacity = "1";
		
		timerID = setTimeout(function(){ sizeNav.style.opacity = "0"; }, 2000);
		
		// Update the value
		sizeNav.innerHTML = doc.body.getBoundingClientRect().width;
	}
	
	function init(){
		if (json.grid == false) return;
		doc.addEventListener(loaded, displaySize );
		win.addEventListener(resize, displaySize );		
	}
	
	var win = window,
			doc = document,
			loaded      = 'DOMContentLoaded',
			resize      = 'resize',
			timerID     = false;
			
	init();

})(document);