# Demo

The script `demo.js` shows how to add a custom Prism highlighter to a `notebookjs` instance so that the
resulting HTML will have colorized text. This is in contrast to the normal usage where the coloring takes place
in a browser via a Javascript hook.

```
% npm install
% cp nodebookjs.js node_modules/notebookjs/
% node demo.js
% open sample.html
```

This is a POC for my notebookjs [pull request](https://github.com/jsvine/notebookjs/pull/15).

You can also see more results at [my site](https://keystrokecountdown.com) -- see [Testing IPython](https://keystrokecountdown.com/articles/Testing%20IPython/testing-ipython.html)
