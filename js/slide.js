//
// Slide class
//

var Slide = function(node, idx) {
  this._node = node;
  var note = query('.note > section', node);
  if (this._speakerNote) {
    this._speakerNote = note ? note.innerHTML : '';
  }
  if (idx >= 0) {
    this._count = idx + 1;
  }
  if (this._node) {
    addClass(this._node, 'slide distant-slide');
  }
  this._makeCounter();
  this._makeBuildList();
};

Slide.prototype = {
  _node: null,
  _count: 0,
  _buildList: [],
  _visited: false,
  _currentState: '',
  _states: [ 'distant-slide', 'far-past',
             'past', 'current', 'future',
             'far-future', 'distant-slide' ],
  setState: function(state) {
    if (typeof state != 'string') {
      state = this._states[state];
    }
    if (state == 'current' && !this._visited) {
      this._visited = true;
      this._makeBuildList();
    }
    removeClass(this._node, this._states);
    addClass(this._node, state);
    this._currentState = state;

    // delay first auto run. Really wish this were in CSS.
    /*
    this._runAutos();
    */
    var _t = this;
    setTimeout(function(){ _t._runAutos(); } , 400);

    if (state == 'current') {
      this._onLoad();
    } else {
      this._onUnload();
    }
  },
  _onLoad: function() {
    this._fireEvent('onload');
    this._showFrames();
  },
  _onUnload: function() {
    this._fireEvent('onunload');
    this._hideFrames();
  },
  _fireEvent: function(name) {
    var eventSrc = this._node.getAttribute(name);
    if (eventSrc) {
      eventSrc = '(function() { ' + eventSrc + ' })';
      var fn = eval(eventSrc);
      fn.call(this._node);
    }
  },
  _showFrames: function() {
    var frames = queryAll('iframe', this._node);
    function show() {
      frames.forEach(function(el) {
        var _src = el.getAttribute('_src');
        if (_src && _src.length) {
          el.src = _src;
        }
      });
    }
    setTimeout(show, 0);
  },
  _hideFrames: function() {
    var frames = queryAll('iframe', this._node);
    function hide() {
      frames.forEach(function(el) {
        var _src = el.getAttribute('_src');
        if (_src && _src.length) {
          el.src = '';
        }
      });
    }
    setTimeout(hide, 250);
  },
  _makeCounter: function() {
    if(!this._count || !this._node) { return; }
    var c = doc.createElement('span');
    c.className = 'counter';
    this._node.appendChild(c);
  },
  _makeBuildList: function() {
    this._buildList = [];
    if (disableBuilds) { return; }
    if (this._node) {
      this._buildList = queryAll('[data-build] > *', this._node);
    }
    this._buildList.forEach(function(el) {
      addClass(el, 'to-build');
    });
  },
  _runAutos: function() {
    if (this._currentState != 'current') {
      return;
    }
    // find the next auto, slice it out of the list, and run it
    var idx = -1;
    this._buildList.some(function(n, i) {
      if (n.hasAttribute('data-auto')) {
        idx = i;
        return true;
      }
      return false;
    });
    if (idx >= 0) {
      var elem = this._buildList.splice(idx, 1)[0];

      var _t = this;
      if (canTransition) {
        var l = function(evt) {
          elem.parentNode.removeEventListener('webkitTransitionEnd', l, false);
          elem.parentNode.removeEventListener('transitionend', l, false);  // moz
          elem.parentNode.removeEventListener('oTransitionEnd', l, false);
          _t._runAutos();
        };
        elem.parentNode.addEventListener('webkitTransitionEnd', l, false);
        elem.parentNode.addEventListener('transitionend', l, false);
        elem.parentNode.addEventListener('oTransitionEnd', l, false);
        removeClass(elem, 'to-build');
      } else {
        setTimeout(function() {
          removeClass(elem, 'to-build');
          _t._runAutos();
        }, 400);
      }
    }
  },
  getSpeakerNote: function() {
    return this._speakerNote;
  },
  buildNext: function() {
    if (!this._buildList.length) {
      return false;
    }
    removeClass(this._buildList.shift(), 'to-build');
    return true;
  },
};
