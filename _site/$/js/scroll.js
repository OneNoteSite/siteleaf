/* Set this up with a closure */


document.addEventListener("DOMContentLoaded", function() {

  var links = document.querySelectorAll("a.scroll"),
  		count = links.length,
			root  = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
			
  function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b
    return c/2*((t-=2)*t*t + 2) + b
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
        startTime = startTime || timestamp
        var elapsed  = timestamp - startTime,
        		progress = easeInOutCubic(elapsed, startPos, endScroll, duration);
        root.scrollTop = progress
        elapsed < duration && requestAnimationFrame(scroll)
      }   
      requestAnimationFrame(scroll);
      e.preventDefault();
    })
});






/*
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = (() => {
    if ("scrollingElement" in document) return document.scrollingElement;
    const html = document.documentElement;
    const start = html.scrollTop;
    html.scrollTop = start + 1;
    const end = html.scrollTop;
    html.scrollTop = start;
    return end > start ? html : document.body;
  })();

  const ease = (duration, elapsed, start, end) =>
    Math.round(end * (-Math.pow(2, -10 * elapsed/duration) + 1) + start);

  const getCoordinates = hash => {
    const start = root.scrollTop;
    const delta = (() => {
      if (hash.length < 2) return -start;
      const target = document.querySelector(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      const max = root.scrollHeight - window.innerHeight;
      return start + top < max ? top : max - start;
    })();
    if (delta) return new Map([["start", start], ["delta", delta]]);
  };

  const scroll = link => {
    const hash = link.getAttribute("href");
    const coordinates = getCoordinates(hash);
    if (!coordinates) return;

    const tick = timestamp => {
      progress.set("elapsed", timestamp - start);
      root.scrollTop = ease(...progress.values(), ...coordinates.values());
      progress.get("elapsed") < progress.get("duration")
      ? requestAnimationFrame(tick)
      : complete(hash, coordinates);
    };

    const progress = new Map([["duration", 800]]);
    const start = performance.now();
    requestAnimationFrame(tick);
  };

  const complete = (hash, coordinates) => {
    history.pushState(null, null, hash);
    root.scrollTop = coordinates.get("start") + coordinates.get("delta");
  };

  const last = list => list.length - 1;

  const attachHandler = (links, index = last(links)) => {
    const link = links.item(index);
    link.addEventListener("click", event => {
      event.preventDefault();
      scroll(link);
    });
    if (index) return attachHandler(links, index - 1);
  };

  attachHandler(document.querySelectorAll("a.scroll"));
});
*/

