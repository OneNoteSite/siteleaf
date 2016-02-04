(function(document){
	
	window.Utils = window.Utils || {};

	function resizeWindow(){
		if(json.resize){
			var screenWidth = 1232;
			window.resizeTo(screenWidth, screen.availHeight);
			setTimeout( function(){ window.moveTo((screen.availWidth - screenWidth)/2,0);}, 1000);			
		}
	}
	
	resizeWindow();

})(document);

