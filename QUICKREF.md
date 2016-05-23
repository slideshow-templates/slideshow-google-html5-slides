# Quick Reference


## Usage - Slide Controls - Keyboard Shortcuts

- Use `←` (left arrow) and `→` (right arrow) to move around.
- Use `Ctrl/Command` and `+` or `-` to zoom in and out if slides don't fit.
- Use `s` to view page source.
- Use `t` to change the theme.
- Use `h` to toggle syntax highlight.
- Use `n` to toggle speaker notes.
- Use `3` to toggle 3D effect.
- Use `0` to toggle help.


## Themes

- Default   (in styles/default.css)
- Moon      (in styles/moon.css)
- Sand      (in styles/sand.css)
- Sea Wave  (in styles/sea_wave.css)



## Structure

Uses 900 x 700 (height x width) pixels for slide layouts.

- Allows (supports) only h1 in header (or just text).
- Allows (supports) only h2 in section (or just text).
- Use section="middle" to center slide e.g. used for "section" (divider) slides.
- Title slide (#title-slide) gets "styled" individually (e.g. using #title-slide hgroup h1 and #title-slide hgroup h2)



All wrapped in div containter w/ `#flex-container` e.g.

```
    <div id="flex-container">
     ...
      <div class="slides">
      ...
      </div>
    </div>
```

## Slides

### With Header

```
<div class="slide" id="table-of-contents">
  <header><h1>Agenda - Table of Contents</h1></header>
  <section>
    <ul id="toc-list">
    </ul>
  </section>
</div>
```


### Without Header

```
<div class="slide" id="landing-slide">
  <section class="middle">
    <p>This presentation is an HTML5 website</p>
    <p>Press <span id="left-init-key" class="key">&rarr;</span> key to advance.</p>
  </section>
</div>
```



### Extras

(Slide) Notes

```
<aside class="note">
  <section>
    Welcome! (This field is for speaker notes and commentary.)
  </section>
</aside>
```


Helpers

```
<nav id="helpers">
  <button title="Previous slide"         id="nav-prev" class="nav-prev">&#8701;</button>
  <button title="Jump to a random slide" id="slide-no">5</button>
  <button title="Next slide"             id="nav-next" class="nav-next">&#8702;</button>
  <menu>
    <button type="checkbox" data-command="toc" title="Table of Contents" class="toc">TOC</button>
    <!-- <button type="checkbox" data-command="resources" title="View Related Resources">&#9734;</button> -->
    <button type="checkbox" data-command="notes" title="View Slide Notes">&#9999;</button>
    <button type="checkbox" data-command="source" title="View slide source">&#8635;</button>
    <button type="checkbox" data-command="help" title="View Help">?</button>
  </menu>
</nav>
```

Loading...

```
<div id="presentation-counter">Loading...</div>
```
