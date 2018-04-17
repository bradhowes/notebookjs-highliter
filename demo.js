"use strict";

var fs = require("fs");
var path = require("path");
var KatexFilter = require("notebookjs-katex");
var nb = require("notebookjs");
var Prism = require('prismjs');

var highlighter = function(code, lang) {
    if (typeof lang === 'undefined') {
        lang = 'markup';
    }

    if (!Prism.languages.hasOwnProperty(lang)) {
        try {
            require('prismjs/components/prism-' + lang + '.js');
        } catch (e) {
            console.warn('** failed to load Prism lang: ' + lang);
            Prism.languages[lang] = false;
        }
    }

    return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang]) : code;
};

nb.highlighter = function(text, pre, code, lang) {
    var language = lang || 'text';
    pre.className = 'language-' + language;
    if (typeof code != 'undefined') {
        code.className = 'language-' + language;
    }
    return highlighter(text, language);
};

var processFile = function(file) {
                
    // Convert IPython files into HTML. Handles math expressions - $...$ and $$...$$
    //
    var kf = new KatexFilter();
    var ipynb = JSON.parse(fs.readFileSync(file));

    kf.expandKatexInNotebook(ipynb);

    var blog = ipynb["metadata"]["blog"];
    if (typeof blog === "undefined") {
        console.log("** skipping IPython file", file, "-- missing 'blog' contents");
        return null;
    }

    // Parse the notebook and generate HTML from it
    //
    var notebook = nb.parse(ipynb);
    return notebook.render().outerHTML;
};

// Generate HTML page
//
var html = '<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><title>Demo</title><link rel="stylesheet" href="css/above.css"/></head><body class="post-template nav-closed"><div class="site-wrapper"><main class="content" role="main"><article class="post"><section class="post-content">';

html += processFile('testing-ipython.ipynb');

html += '</section></article></main></div></body><link rel="stylesheet" href="css/below.css"/><link rel="stylesheet" href="css/notebook.css"/><link rel="stylesheet" href="css/prism.css"/><link rel="stylesheet" href="css/merriweather.css"/><link rel="stylesheet" href="css/katex.css"/><link rel="stylesheet" href="css/font-awesome.css"/>';

fs.writeFileSync('sample.html', html);
