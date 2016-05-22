
  var doc = document;
  var disableBuilds = false;
  var disableNotes = false;

  var ctr = 0;
  var spaces = /\s+/, a1 = [''];

  var toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  };

  var byId = function(id) {
    if (typeof id == 'string') { return doc.getElementById(id); }
    return id;
  };

  var query = function(query, root) {
    return queryAll(query, root)[0];
  }

  var queryAll = function(query, root) {
    if (!query) { return []; }
    if (typeof query != 'string') { return toArray(query); }
    if (typeof root == 'string') {
      root = byId(root);
      if(!root){ return []; }
    }

    root = root || document;
    var rootIsDoc = (root.nodeType == 9);
    var doc = rootIsDoc ? root : (root.ownerDocument || document);

    // rewrite the query to be ID rooted
    if (!rootIsDoc || ('>~+'.indexOf(query.charAt(0)) >= 0)) {
      root.id = root.id || ('qUnique' + (ctr++));
      query = '#' + root.id + ' ' + query;
    }
    // don't choke on something like ".yada.yada >"
    if ('>~+'.indexOf(query.slice(-1)) >= 0) { query += ' *'; }
    return toArray(doc.querySelectorAll(query));
  };

  var strToArray = function(s) {
    if (typeof s == 'string' || s instanceof String) {
      if (s.indexOf(' ') < 0) {
        a1[0] = s;
        return a1;
      } else {
        return s.split(spaces);
      }
    }
    return s;
  };

  // Needed for browsers that don't support String.trim() (e.g. iPad)
  var trim = function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  var addClass = function(node, classStr) {
    classStr = strToArray(classStr);
    var cls = ' ' + node.className + ' ';
    for (var i = 0, len = classStr.length, c; i < len; ++i) {
      c = classStr[i];
      if (c && cls.indexOf(' ' + c + ' ') < 0) {
        cls += c + ' ';
      }
    }
    node.className = trim(cls);
  };

  var removeClass = function(node, classStr) {
    var cls;
    if (classStr !== undefined) {
      classStr = strToArray(classStr);
      cls = ' ' + node.className + ' ';
      for (var i = 0, len = classStr.length; i < len; ++i) {
        cls = cls.replace(' ' + classStr[i] + ' ', ' ');
      }
      cls = trim(cls);
    } else {
      cls = '';
    }
    if (node.className != cls) {
      node.className = cls;
    }
  };

  var toggleClass = function(node, classStr) {
    var cls = ' ' + node.className + ' ';
    if (cls.indexOf(' ' + trim(classStr) + ' ') >= 0) {
      removeClass(node, classStr);
    } else {
      addClass(node, classStr);
    }
  };


  // modernizr lite via https://gist.github.com/598008
  var testStyle = function(style) {

    var elem = document.createElement('div');
    var prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
    var bool;
    var bump = function(all, letter) {
          return letter.toUpperCase();
        };
    var prop;

    bool = style in elem.style;
    prop = style.replace(/^(.)/, bump).replace(/-([a-z])/ig, bump);

    for (var len = prefixes.length; len--; ){
      if (bool) {
        break;
      }
      bool = prefixes[len] + prop in elem.style;
    }

    document.documentElement.className += ' ' + (bool ? '' : 'no-') + style.replace(/-/g, '');
    return bool;
  };

  var canTransition = testStyle('transition');
