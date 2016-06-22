#AngularJS Lesson

A lesson on magical AngularJS (1.x)!

##Table of Contents:
 - [Explanation](#Explanation)
 - [Parts](#Parts)
 - [Author](#Author)

##Explanation:
This is a relatively simple lesson on beginning AngularJS (version 1.x). There are three parts which are outlined below, but you should generally look at all of them to get a sense of how the parts fit together.
For those more advanced peeps, I've elected not to use either bower<sup>1</sup> or gulp/grunt<sup>2</sup> here, as while they make your http load times happier, I want to keep this demostration as Angular-focused as possible.
The demonstration is focused, as I hint at above, on Angular 1, *not* Angular 2 (which is a whole different beast!).

##Parts:
The demo consists of three files: the example, the template, and 'anatomy'.

 - **Example**: This file (index.html) contains four example divs. The first is an old, non-JS div, and is generally speaking not interactive. The second is a vanilla JS div. It gets the job done, but with a lot of lines! The third div does the same thing as the second, but uses AngularJS (and thus fewer lines!). Finally, the fourth div is an example of angular in action

 - **Template**: This file (template.html) is a relatively bare-bones Angular app. Note that for this file, the JS is actually inline (generally a bad idea!). A good 'study' idea might be to examine this file and see how all the components fit together.

 - **Anatomy**: This file (anato.html) shows the code and explanation for some of the essential AngularJS components, such as modules, controllers, factories, and directives. Take a look at each of the components and see how they interact with each other.

 ##Author:
 This demonstration was designed and written by me, [David Newman](https://github.com/newms34) 

<sup>1</sup><small> Bower allows you to load extraneous JS files on the front end. It's particularly nice because it includes some very popular libraries (like Angular and jQuery). Furthermore, it allows you to have more of a single-point-of-failure: if your browser can't load the AngularJS file, it likely won't be able to load anything else either!</small><br/>
<sup>2</sup><small>Gulp and Grunt allow you to take a bunch of files and 'compress' them into one file. They also allow you to do cool things like compiling SASS (variables in CSS!) or minify your code (less bandwidth)!</small>