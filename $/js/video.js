
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

<script>
				// To do Add Mute
				// Add Play Click to kick off video
				// Decide if video should play in place
				// Scroll to pause
				
	      var tag       = document.createElement('script'),
	      		script    = document.getElementsByTagName('script')[0],
	      		content   = document.querySelector("main > header .content"),
	      		video     = document.querySelector("main > header .video"  ),
	      		volume    = document.querySelector("main > header .volume" ),
	      		isMuted   = true,
	      		isDone    = false,
	      		isPlaying = false,
	      		player, duration, endDuration, endTitleDuration;
	      		
	      // Load the IFrame Player API code asynchronously
	      tag.src = "//www.youtube.com/iframe_api";
	      script.parentNode.insertBefore(tag, script);
	      
				if (volume.addEventListener) {
				  volume.addEventListener('click', toggleMute, false);
				  video.addEventListener('click', toggleVideo, false);
				} else if (volume.attachEvent) {
				  volume.attachEvent('onclick', toggleMute);
				  video.attachEvent('onclick', toggleVideo);
				}
	
				// Setup Object and Events
	      function onYouTubeIframeAPIReady() {
	        player = new YT.Player('player', {
	          events: {
	            'onStateChange': onPlayerStateChange,
	            'onReady': onPlayerReady,
	            'onError': onPlayerError
	          }
	        });
		      // console.log("onYouTubeIframeAPIReady");
	      }

	      function toggleMute(forceMute){
		      if(isMuted && forceMute != true){
			      isMuted = false;
			      volume.classList.add("volumeOn");
			      player.unMute();
		      } else {
			      isMuted = true;
			      volume.classList.remove("volumeOn");
			      player.mute();
		      }
	      }
	
	      function onPlayerReady(event) {
		      toggleMute(true);
		      //playVideo();
	      }
	      
	      function onPlayerStateChange(event) {
					if (event.data == YT.PlayerState.PLAYING) {
						setTimeout(function(){ showVideo();}, 250);
						startTimersFromCurrentTime();
						
						// Check the duration and make sure to pause it 
						// before it ends
					}
					if(event.data == YT.PlayerState.ENDED) {
						content.classList.remove("hidden");
					}
	      }
	      
	      function startTimersFromCurrentTime(){
		      // Here check time first before we alter Duration
		      duration             = player.getDuration();
		      durationEndTitle     = (duration - 3.0) * 1000;
		      durationEndControl   = (duration - 5.0) * 1000;
		      durationEndStopVideo = (duration - 1.0) * 1000;
		      // Add a Set Interval here instead of Timeout since we can pause the video.
					setTimeout(function(){ showContent();  }, durationEndTitle     );
					setTimeout(function(){ hideControls(); }, durationEndControl   );
					setTimeout(function(){ endVideo();     }, durationEndStopVideo );
	      }
	      
	      function showVideo(){
		      video.classList.add("visible");
					hideContent();
		    }

	      function showContent(){
		      hideControls();
		      content.classList.remove("hidden");
		    }
		    
	      function hideContent(){
		      showControls();
		      content.classList.add("hidden");
		    }
		    
		    function showControls(){
					volume.classList.add("visible");
		    }
		    
		    function hideControls(){
					volume.classList.remove("visible");
		    }
		    
	      function playVideo() {
		      isPlaying = true;
		      player.playVideo();
		    }
	      
	      function pauseVideo() {
		      isPlaying = false;
		      player.pauseVideo();
		    }
	      
	      function endVideo() {
		      isDone = true;
		      pauseVideo();
		    }
		    
		    function toggleVideo(){
			    // Play
			    if(isPlaying){
				    pauseVideo();
			    }else if(!isDone){
				    playVideo();
			    }else{
				    replayVideo();
			    }
		    }

	      function replayVideo() {
		      player.seekTo(.5);
		      playVideo();
	      }
	      
	      function stopVideo() {
		      player.stopVideo();
		    }
	      
	      function onPlayerError(event){ console.error("ERROR", event); }
	      
	    </script>