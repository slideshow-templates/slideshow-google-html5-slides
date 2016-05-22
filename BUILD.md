# Build Notes

## Changes

modifications for s9 template pack:

  o removed offline manifest
  o removed disclaimer; it's just a prototype anyway
  o removed google analytics script code
  o removed google maps script code
  o removed all slides

  o in js/utils.js changed line 541pp queryAll('.transitionSlide')

     - looks for h1 (not h2) and doesn't include img (icon)

  o in styles/commons.css commented out rules for li and bullets

   li {
    list-style: none;
    padding: 10px 0;
   }
   .bullets {
  font-size: 40px;
  }
  .bullets li::before {
    content: '· ';
  }


## Some more (simple) modernizations

Use HTML5  (no XHTML e.g. /> etc.)


## js/excss.js

Moved css preprocessor to attic (try to convert/use sass/scss - why? why not?)

## js/utils.js

Remove bind polyfill e.g.

```
// bind polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var fSlice = Array.prototype.slice,
        aArgs = fSlice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || window,
                               aArgs.concat(fSlice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```
