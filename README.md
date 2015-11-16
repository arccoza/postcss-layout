# postcss-layout [![Travis Build Status][travis-img]][travis]
[travis]:       https://travis-ci.org/arccoza/postcss-layout
[travis-img]:   https://img.shields.io/travis/arccoza/postcss-layout.svg
[demo]:         http://arccoza.github.io/postcss-layout/

A PostCSS plugin for some common CSS layout patterns and a Grid system. [Demo][demo]

The plugin provides three new properties and one @rule.

* The `layout` property in a rule makes the selected elements a container for child elements with a certain layout.
* The `@grid` @rule defines a grid.
* The `grid` property in a rule gives the selected elements a grid defined in `@grid`.
* The `[gridname]-span` property in a rule defines the width of child elements in a grid container.

The plugin uses CSS `calc` for the grid system. Layouts have been tested to work in ie9+.

See the [demo][demo] or the example in the `example/` directory for usage.

All layout elements are given `box-sizing: border-box;` by default.

## Install
`npm install postcss-layout --save-dev`

## Layouts
### stack
```css
.container {
  layout: stack [left|right|center][shrink];
}
```

Creates a container with a vertically stacked 'tower' of elements(items), using `display:block` 
or `display:table`, that can be optionally aligned left, right or center.
Another optional property value is `shrink` which causes a stacked element to shrink wrap its contents; 
it won't expand to fill its parent, instead make its width as small as possible to fit its contents.

#### Caveats
Firefox has [buggy](https://bugzilla.mozilla.org/show_bug.cgi?id=307866) table layout, and will ignore `min-height` or `min-width` on `shrink` / `display:table` elements(items).

#### Example
```css
/* Input. */
.container {
  layout: stack right shrink;
}

/* Output */
.container {
  box-sizing: border-box;
}
.container > * {
  box-sizing: border-box;
  display: table;
  margin-left: auto;
}
```

### lines
```css
.container {
  layout: lines [top|bottom|middle][left|right|center][nowrap];
}
```

Creates horizontally arranged child elements(items) in the container, using `display:inline-block`.
There are optional horizontal and vertical alignment property values.
Child elements in a `layout: lines` container will wrap when they are longer than the container width, 
unless `nowrap` is specified.
This layout sets `font-size:0` on the container to remove whitespace, then sets `font-size:initial` on 
child elements to reset `font-size`. Be aware of this as your font sizes may not be what you expect.

#### Caveats
Using the vertical align options automatically sets `nowrap`, you cannot vertically allign more than one line 
with `display:inline-block` and psuedo element technique. To vertically align multiline items use the layout 
demonstrated in the `example` directory, which uses two nested layouts, the first for vertical alignment, then 
horizontal alignment inside the vertically aligned element.

Grids cannot use `em` units for gutters with `layout:lines` because the container has `font-size:0` to 
deal with whitespace.

#### Example
```css
/* Input. */
.container {
  layout: lines bottom center;
}

/* Output. */
.container {
  text-align: center;
  box-sizing: border-box;
  font-size: 0;
}
.container > * {
  box-sizing: border-box;
  display: inline-block;
  text-align: initial;
  vertical-align: bottom;
  font-size: initial;
}
.container:before {
  position: relative;
  content: "";
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
```

### columns
```css
.container {
  layout: columns;
}
```

Creates horizontally arranged child elements(items), using `display:table` and `display:table-cell` 
that stretch in columns from the top to the bottom of the selected container elements, 
and horizontally fill their container.
*NOTE* the `.container` will have a width set of `100%` by default.

**Example**
```css
/* Input. */
.container {
  layout: columns;
}

/* Output */
.container {
  width: 100%;
  table-layout: fixed;
  display: table;
  box-sizing: border-box;
}
.container > * {
  box-sizing: border-box;
  display: table-cell;
}
```

### rows
```css
.container {
  layout: rows;
}
```

Creates vertically arranged child elements(items), using `display:table` and `display:table-row` 
that stretch in rows from the left to the right of the selected container elements, 
and vertically fill their container.
*NOTE* the `.container` will have a width set of `100%` by default.

**Example**
```css
/* Input. */
.container {
  layout: rows;
}

/* Output */
.container {
  width: 100%;
  table-layout: fixed;
  display: table;
  box-sizing: border-box;
}
.container > * {
  box-sizing: border-box;
  display: table-row;
}
```

## Grids

### Define a grid
```css
@grid GRID_NAME {
  count: NUMBER_OF_COLUMNS;
  [gutter: GUTTER_VALUE [VERTICAL_GUTTER_VALUE];]
}
```

Define a grid with name GRID_NAME (eg. g12), number of columns NUMBER_OF_COLUMNS (eg. 12), and optional gutter GUTTER_VALUE (eg. 10px). An optional VERTICAL_GUTTER_VALUE (eg. 15px) can be set, if set then the first GUTTER_VALUE becomes the horizontal gutter.

### Use a grid
```css
.container {
  layout: lines;
  grid: GRID_NAME;
}
```

Use the `grid` property in a container to set which defined grid you want to use.
You **must** set `layout:lines` or `layout:flow` or `layout:columns` on the container for the grid to work, currently the only layout values which respond to the `grid` and `span` properties. *NOTE* the `.container` will have negative margins if gutter was set, so it is recommended to place the grid `.container` in its own wrapper container.

```css
.child {
  GRID_NAME-span: 6;
}
```

Use the `GRID_NAME-span` property in a child to define its width relative to the container grid.

#### Caveats
As mentioned before, you cannot use `em` units for gutters in a `layout:lines` container.
You cannot use gutters with `layout:columns`, and the items will always stretch to fill remaining space.

#### Example
```css
/* Input. */
@grid g12 {
  count: 12;
  gutter: 10px;
}

.container {
  layout: lines;
  grid: g12;
}

.child {
  g12-span: 4;
}

/* Output. */
.container {
  box-sizing: border-box;
  margin-right: -0.5em;
  margin-left: -0.5em;
}
.container > * {
  box-sizing: border-box;
  display: inline-block;
  text-align: initial;
}
.container:before {
  position: relative;content: "";
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}

.child {
  margin-right: 0.5em;
  margin-left: 0.5em;
  width: calc(33.333333333333336% - 10px);
}
```
