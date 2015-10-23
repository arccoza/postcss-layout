var test = require('tape');
var tapSpec = require('tap-spec');
var postcss = require("postcss");
var plugin = require("..");


test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

var processor = postcss([plugin]);

var fixtures = {
	"@grid": { 
		"in": "@grid g12 { count: 12; gutter: 1em; }",
		"out": [
			"",// Empty string.
			{ "g12": { "count": "12", "gutter": "1em", "gutterH": "1em", "gutterV": null } }
		]
	},
	"grid": { 
		"in": ".test { layout: lines; grid: g12; }",
		"out": "".concat(".test { box-sizing: border-box; margin-right: -0.5em; margin-left: -0.5em; }\n",
			".test > * { box-sizing: border-box; display: inline-block; text-align: initial; }\n",
			".test:before { position: relative; content: \"\"; display: inline-block; width: 0; height: 100%; vertical-align: middle; }")
	},
	"grid undefined": { 
		"in": ".test { grid: g15; }",
		"out": postcss.CssSyntaxError
	},
	"grid span": { 
		"in": ".test { g12-span: 6; }",
		"out": ".test { margin-right: 0.5em; margin-left: 0.5em; width: calc(50% - 1em); }"
	},
	"grid span undefined": { 
		"in": ".test { g14-span: 3; }",
		"out": postcss.CssSyntaxError
	},
	"layout stack": { 
		"in": ".test { layout: stack; }",
		"out": ""
	}
}

//{ g12: { count: '12', gutter: '1em', gutterH: '1em', gutterV: null } }


test('@grid rule; define a grid', function(t) {
	t.plan(2);
	var lazy = processor.process(fixtures['@grid'].in);
	var css = lazy.css;
	var grids = lazy.result.grids;
	// console.log(grids);

	t.equal(css, fixtures["@grid"].out[0]);
	t.deepEqual(grids, fixtures["@grid"].out[1]);
});

test('grid property; use a grid', function(t) {
	t.plan(2);
	var lazy = processor.process(fixtures['grid'].in);
	var css = lazy.css;

	t.equal(css, fixtures["grid"].out);
	// console.log(css);

	lazy = processor.process(fixtures['grid undefined'].in);
	css = null;

	t.throws(function() { css = lazy.css; }, fixtures['grid undefined'].out);
});

test('span property; use grid span', function(t) {
	t.plan(2);
	var lazy = processor.process(fixtures['grid span'].in);
	var css = lazy.css;

	t.equal(css, fixtures["grid span"].out);
	// console.log(css);

	lazy = processor.process(fixtures['grid span undefined'].in);
	css = null;

	t.throws(function() { css = lazy.css; }, fixtures['grid span undefined'].out);
});