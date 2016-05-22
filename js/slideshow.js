//
// SlideShow class
//
var SlideShow = function(slides) {
  this._slides = (slides || []).map(function(el, idx) {
    return new Slide(el, idx);
  });
  var h = window.location.hash;
  try {
    this.current = h;
  } catch (e) { /* squeltch */ }
  this.current = (!this.current) ? "landing-slide" : this.current.replace('#', '');
  if (!query('#' + this.current)) {
    // if this happens is very likely that someone is coming from
    // a link with the old permalink format, i.e. #slide24
    alert('The format of the permalinks have recently changed. If you are coming ' +
           'here from an old external link it\'s very likely you will land to the wrong slide');
    this.current = "landing-slide";
  }
  var _t = this;
  doc.addEventListener('keydown',
      function(e) { _t.handleKeys(e); }, false);
  doc.addEventListener('touchstart',
      function(e) { _t.handleTouchStart(e); }, false);
  doc.addEventListener('touchend',
      function(e) { _t.handleTouchEnd(e); }, false);
  window.addEventListener('popstate',
      function(e) { if (e.state) { _t.go(e.state, true); } }, false);
  query('#left-init-key').addEventListener('click',
      function() { _t.next(); }, false);
  this._update();
  queryAll('#nav-prev, #nav-next').forEach(function(el) {
    el.addEventListener('click', _t.onNavClick.bind(_t), false);
  });
  queryAll('menu button').forEach(function(el) {
    el.addEventListener('click', _t.onCommandClick.bind(_t), false);
  });
};

SlideShow.prototype = {
  _presentationCounter: query('#presentation-counter'),
  _menuCounter: query('#slide-no'),
  _speakerNote: query('#speaker-note'),
  _help: query('#help'),
  _slides: [],
  _themes: queryAll('.theme'),
  _getCurrentIndex: function() {
    var me = this;
    var slideCount = null;
    queryAll('.slide').forEach(function(slide, i) {
      if (slide.id == me.current) {
        slideCount = i;
      }
    });
    return slideCount + 1;
  },
  _update: function(targetId, dontPush) {
    // in order to delay the time where the counter shows the slide number we check if
    // the slides are already loaded (so we show the loading... instead)
    // the technique to test visibility is taken from here
    // http://stackoverflow.com/questions/704758/how-to-check-if-an-element-is-really-visible-with-javascript
    var currentIndex = this._getCurrentIndex();

    if (targetId) {
      var savedIndex = currentIndex;
      this.current = targetId;
      currentIndex = this._getCurrentIndex();
      if (Math.abs(savedIndex - currentIndex) > 1) {
        // if the current switch is not "prev" or "next", we need clear
        // the state setting near the original slide
        for (var x = savedIndex; x < savedIndex + 7; x++) {
          if (this._slides[x-4]) {
            this._slides[x-4].setState(0);
          }
        }
      }
    }
    var docElem = document.documentElement;
    var elem = document.elementFromPoint( docElem.clientWidth / 2, docElem.clientHeight / 2);
    if (elem && elem.className != 'slides') {
      this._presentationCounter.textContent = currentIndex;
      if (this._menuCounter) {
        this._menuCounter.textContent = currentIndex;
      }
    }
    if (this._speakerNote) {
      this._speakerNote.innerHTML = this._slides[currentIndex - 1].getSpeakerNote();
    }
    if (history.pushState) {
      if (!dontPush) {
        history.pushState(this.current, 'Slide ' + this.current, '#' + this.current);
      }
    } else {
      window.location.hash = this.current;
    }
    for (var x = currentIndex; x < currentIndex + 7; x++) {
      if (this._slides[x-4]) {
        this._slides[x-4].setState(x-currentIndex);
      }
    }
  },

  current: 0,
  next: function() {
    if (!this._slides[this._getCurrentIndex() - 1].buildNext()) {
      var next = query('#' + this.current + ' + .slide');
      //this.current = (next) ? next.id : this.current;
      this._update((next) ? next.id : this.current);
    }
  },
  prev: function() {
    var prev = query('.slide:nth-child(' + (this._getCurrentIndex()) + ')');
    //this.current = (prev) ? prev.id : this.current;
    this._update((prev) ? prev.id : this.current);
  },
  go: function(slideId, dontPush) {
    //this.current = slideId;
    this._update(slideId, dontPush);
  },

  showNotes: function() {
    if (disableNotes) {
      return;
    }
    if (this._speakerNote) {
      this._speakerNote.style.display = 'block';
      this._speakerNote.classList.toggle('invisible');
    }
  },
  switch3D: function() {
    toggleClass(document.body, 'three-d');
  },
  toggleHightlight: function() {
    var link = query('#prettify-link');
    link.disabled = !(link.disabled);
    sessionStorage['highlightOn'] = !link.disabled;
  },
  changeTheme: function() {
    var sheetIndex = 0;
    while (this._themes[sheetIndex].disabled) {
      sheetIndex++;
    }
    this._themes[sheetIndex].disabled = true;
    var nextSheet = this._themes[(sheetIndex + 1) % this._themes.length];
    nextSheet.disabled = false;
    sessionStorage['theme'] = nextSheet.getAttribute('href').split('/').pop();
  },
  toggleHelp: function() {
    this._help.style.display = 'block';
    this._help.classList.toggle('invisible');
  },
  viewSource: function() {
    window.open("view-source:" + window.location.href);
  },
  handleKeys: function(e) {
    if (/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable) {
      return;
    }
    switch (e.keyCode) {
      case 37:  // left arrow
        this.prev(); break;
      case 39:  // right arrow
      case 32:  // space
        this.next(); break;
      case 48:  // 0
        this.toggleHelp(); break;
      case 51:  // 3
        this.switch3D(); break;
      case 72:  // H
        this.toggleHightlight(); break;
      case 78:  // N
        this.showNotes(); break;
      case 83:  // S
        this.viewSource(); break;
      case 84:  // T
        this.changeTheme(); break;
    }
  },
  _touchStartX: 0,
  handleTouchStart: function(e) {
    this._touchStartX = e.touches[0].pageX;
  },
  handleTouchEnd: function(e) {
    var delta = this._touchStartX - e.changedTouches[0].pageX;
    var SWIPE_SIZE = 150;
    if (delta > SWIPE_SIZE) {
      this.next();
    } else if (delta< -SWIPE_SIZE) {
      this.prev();
    }
  },
  onNavClick: function(e) {
    if (e.target.id == "nav-prev") {
      this.prev();
    } else if (e.target.id = "nav-next") {
      this.next();
    }
  },
  onCommandClick: function(e) {
    var n = e.target.getAttribute('data-command');
    switch(n) {
    case 'toc':
      this._update("table-of-contents"); break;
    case 'resources':
      break;
    case 'notes':
      this.showNotes(); break;
    case 'source':
      this.viewSource(); break;
    case 'help':
      this.toggleHelp(); break;
    default:
      return;
    }
  }
};
