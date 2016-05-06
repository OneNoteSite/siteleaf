/* Shoud set this up with a closure */

document.addEventListener("DOMContentLoaded", function() {

  var links = document.querySelectorAll("a.scroll"),
  		count = links.length,
			root  = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
			
  function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }

  while (count--) 
    links.item(count).addEventListener("click", function(e) {

      var startTime,
		      duration  = 900,
      		startPos  = root.scrollTop,
					endPos    = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top,
					maxScroll = root.scrollHeight - window.innerHeight,
					endScroll = startPos + endPos < maxScroll ? endPos : (maxScroll - startPos);
					
      function scroll(timestamp) {
        startTime = startTime || timestamp;
        var elapsed  = timestamp - startTime,
        		progress = easeInOutCubic(elapsed, startPos, endScroll, duration);
        root.scrollTop = progress;
        elapsed < duration && requestAnimationFrame(scroll);
      }   
      requestAnimationFrame(scroll);
      e.preventDefault();
    })
});
