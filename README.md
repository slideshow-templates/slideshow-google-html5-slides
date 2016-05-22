# Google HTML5 Rocks - Slide Show (S9) Template Pack  

## Live Preview

See [`slides.html5.html`](http://slideshow-templates.github.io/slideshow-google-html5-slides/slides.html5.html).


## What's Slide Show (S9)?

A Ruby gem that lets you create slide shows and author slides in plain text
using a wiki-style markup language that's easy-to-write and easy-to-read.
More [Slide Show (S9) Project Site »](http://slideshow-s9.github.io)

## Intro

Google's [HTML5 Rocks Slides](https://github.com/html5rocks/slides.html5rocks.com) code
bundled up into a Slide Show (S9) template pack (includes Moon, Sand and Sea Wave themes).

<!--
See the original [HTML5 Rocks](http://slides.html5rocks.com) slides in action.
   note: no longer available
-->

Note, the package is configured to use the following headers in `slides.html5.html`:

    title: Your Slide Show Title Here (e.g. HTML5)
    subtitle: Your Subtitle Here (e.g. Web Development to the next level)


## Try It Yourself - How To Use the Template Pack

If you want to try it yourself, install (fetch) the new template pack. Issue the command:

    $ slideshow install g5

Or as an alternative clone the template pack using `git`. Issue the commands:

    $ cd ~/.slideshow/templates
    $ git clone https://github.com/slideshow-templates/slideshow-google-html5-slides.git

To check if the new template got installed, use the `list` command:

    $ slideshow list

Listing something like:

    Installed templates include:
       g5.txt (~/.slideshow/templates/g5/g5.txt)

Now you're ready to use it using the `-t/--template` switch. Example:

    $ slideshow build tutorial -t g5

That's it.


## Questions? Comments?

Questions? Comments?
Send them along to the [wwwmake forum/mailing list](http://groups.google.com/group/wwwmake).
Thanks!
