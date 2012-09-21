
# Changes to Original Templates

## io2011

- source repo online @ http://code.google.com/p/html5slides

- retrieved on 21/Sep/2012

Copied Files from -> to:

    trunk/template/index.html          ->  io2011/slides.html.erb
    trunk/styles.css                   ->  io2011/styles.css.erb
    trunk/slides.js                    ->  io2011/js/slides.js
    trunk/pretty.js                    ->  io2011/js/pretty.js
    
    trunk/images/colorbar.png          ->  io2011/images/colorbar.png
    trunk/images/google-logo-small.png ->  io2011/images/google-logo-small.png
    trunk/images/google-logo.png       ->  io2011/images/google-logo.png
    trunk/images/googleio-logo.png     ->  io2011/images/googleio-logo.png
    
    trunk/template/images/example-cat.jpg   -> io2011/images/example-cat.jpg
    trunk/template/images/example-graph.jpg -> io2011/images/example-graph.jpg


### slides.html.erb Changes

Change

    <script src='http://html5slides.googlecode.com/svn/trunk/slides.js'></script>

to

    <script src='js/slides.js'></script>


Change

    <title>Presentation</title>

to

    <title><%= @headers['title'] %></title>


### js/slides.js Changes

Change

    var PERMANENT_URL_PREFIX = 'http://html5slides.googlecode.com/svn/trunk/';

TBD