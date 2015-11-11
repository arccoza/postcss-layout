var test = require('tape');
var tapSpec = require('tap-spec');
var postcss = require("postcss");
var plugin = require("..");


test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

var opts = {};
var processor = postcss([plugin(opts)]);

var tests = {
  "@grid": { 
    "in": "@grid g12 { count: 12; gutter: 1em; }",
    "out": [
      "",// Empty string.
      { "g12": { "count": "12", "gutter": "1em", "gutterH": "1em", "gutterV": null } }
    ]
  },
  "grid": [ 
    {
      "msg": "use grid",
      "chk": "equal",
      "in": ".test { layout: lines; grid: g12; }",
      "out": "".concat(".test { font-size: 0; box-sizing: border-box; margin-right: -0.5em; margin-left: -0.5em; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "grid undefined",
      "chk": "throws",
      "in": ".test { grid: g15; }",
      "out": postcss.CssSyntaxError
    },
    {
      "msg": "use span",
      "chk": "equal",
      "in": ".test { g12-span: 6; }",
      "out": ".test { margin-right: 0.5em; margin-left: 0.5em; width: calc(50% - 1em); }"
    },
    {
      "msg": "grid span undefined",
      "chk": "throws",
      "in": ".test { g14-span: 3; }",
      "out": postcss.CssSyntaxError
    }
  ],
  "layout": [
    {
      "msg": "stack",
      "chk": "equal",
      "in": ".test { layout: stack; }",
      "out": "".concat(".test { box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: block; margin-left: auto; margin-right: auto; }")
    },
    {
      "msg": "stack shrink",
      "chk": "equal",
      "in": ".test { layout: stack shrink; }",
      "out": "".concat(".test { box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: table; margin-left: auto; margin-right: auto; }")
    },
    {
      "msg": "stack center",
      "chk": "equal",
      "in": ".test { layout: stack center; }",
      "out": "".concat(".test { box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: block; margin-left: auto; margin-right: auto; }")
    },
    {
      "msg": "stack left",
      "chk": "equal",
      "in": ".test { layout: stack left; }",
      "out": "".concat(".test { box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: block; margin-right: auto; }")
    },
    {
      "msg": "stack right",
      "chk": "equal",
      "in": ".test { layout: stack right; }",
      "out": "".concat(".test { box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: block; margin-left: auto; }")
    },
    {
      "msg": "lines",
      "chk": "equal",
      "in": ".test { layout: lines; }",
      "out": "".concat(".test { font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines left",
      "chk": "equal",
      "in": ".test { layout: lines left; }",
      "out": "".concat(".test { text-align: left; font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines center",
      "chk": "equal",
      "in": ".test { layout: lines center; }",
      "out": "".concat(".test { text-align: center; font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines right",
      "chk": "equal",
      "in": ".test { layout: lines right; }",
      "out": "".concat(".test { text-align: right; font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines top",
      "chk": "equal",
      "in": ".test { layout: lines top; }",
      "out": "".concat(".test { font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; vertical-align: top; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines middle",
      "chk": "equal",
      "in": ".test { layout: lines middle; }",
      "out": "".concat(".test { font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; vertical-align: middle; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines bottom",
      "chk": "equal",
      "in": ".test { layout: lines bottom; }",
      "out": "".concat(".test { font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; vertical-align: bottom; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "lines top left",
      "chk": "equal",
      "in": ".test { layout: lines top left; }",
      "out": "".concat(".test { text-align: left; font-size: 0; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: inline-block; text-align: initial; font-size: initial; vertical-align: top; }\n",
        ".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
    },
    {
      "msg": "columns",
      "chk": "equal",
      "in": ".test { layout: columns; }",
      "out": "".concat(".test { width: 100%; table-layout: fixed; display: table; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: table-cell; }")
    },
    {
      "msg": "rows",
      "chk": "equal",
      "in": ".test { layout: rows; }",
      "out": "".concat(".test { width: 100%; table-layout: fixed; display: table; box-sizing: border-box; }\n",
        ".test > * { box-sizing: border-box; display: table-row; }")
    },
    {
      "msg": "unknown layout",
      "chk": "throws",
      "in": ".test { layout: spastic colon; }",
      "out": postcss.CssSyntaxError
    }
  ]
}

// var q = processor.process('@grid g12 {count: 12; gutter: 1em;} .container {layout: lines; grid: g12;} .child {g12-span: 4;}');
// console.log(q.css);

test('@grid rule; define a grid', function(t) {
  t.plan(2);
  var lazy = processor.process(tests['@grid'].in);
  var css = lazy.css;
  var grids = opts._grids;
  // console.log(opts._grids);

  t.equal(css, tests["@grid"].out[0]);
  t.deepEqual(grids, tests["@grid"].out[1]);
});

test('use grid and span properties', function(t) {
  t.plan(tests['grid'].length);
  var lazy = null;
  var css = null;
  var fix = null;

  for (var i = 0; i < tests['grid'].length; i++) {
    fix = tests['grid'][i];
    lazy = processor.process(fix.in);
    
    if(fix.chk == 'throws')
      t.throws(function() { css = lazy.css; }, fix.out);
    else
      t[fix.chk](lazy.css, fix.out);
  };
});

test('use layout property', function(t) {
  t.plan(tests['layout'].length);
  var lazy = null;
  var css = null;
  var fix = null;

  for (var i = 0; i < tests['layout'].length; i++) {
    fix = tests['layout'][i];
    lazy = processor.process(fix.in);
    
    if(fix.chk == 'throws')
      t.throws(function() { css = lazy.css; }, fix.out);
    else
      t[fix.chk](lazy.css, fix.out);

    // console.log(lazy.css);
  };
});