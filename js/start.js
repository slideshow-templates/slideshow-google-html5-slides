// todo:
//  change start.js to config.js or setup.js or slides.js or something - why? why not?
//
// use order
// 1. utils.js
// 2. slide.js
// 3. slideshow.js
// 4. start.js



// load highlight setting from session storage, if available.
// session storage can only store strings so we have to assume type coercion
// for the boolean logic here
query('#prettify-link').disabled = !(sessionStorage['highlightOn'] == 'true');

// disable style theme stylesheets
var linkEls = queryAll('link.theme');
var stylesheetPath = sessionStorage['theme'] || 'styles/default.css';
linkEls.forEach(function(stylesheet) {
  stylesheet.disabled = !(stylesheet.href.indexOf(stylesheetPath) != -1);
});

// Initialize
var li_array = [];
var transitionSlides = queryAll('.transitionSlide').forEach(function(el) {
  var h1 = query('h1', el);
  if (!h1) {
    return;
  }
  li_array.push( ['<li><a data-hash="', el.id, '">',
                  query('h1', el).textContent, '</a></li>'].join('')
               );
});

query('#toc-list').innerHTML = li_array.join('');

var slideshow = new SlideShow(queryAll('.slide'));

document.addEventListener('DOMContentLoaded', function() {
  query('.slides').style.display = 'block';
}, false);

queryAll('#toc-list li a').forEach(function(el) {
    el.onclick = function() { slideshow.go(el.dataset['hash']); };
});

queryAll('pre').forEach(function(el) {
  addClass(el, 'prettyprint');
});
