# postcss-layout [![Travis Build Status][travis-img]][travis]
[travis]:       https://travis-ci.org/arccoza/postcss-layout
[travis-img]:   https://img.shields.io/travis/arccoza/postcss-layout.svg

A PostCSS plugin for some common CSS layout patterns and a Grid system.

The plugin provides three new properties and one @rule.

* The `layout` property in a rule makes the selected elements a container for child elements with a certain layout.
* The `@grid` @rule defines a grid.
* The `grid` property in a rule gives the selected elements a grid defined in `@grid`.
* The `[gridname]-span` property in a rule defines the width of child elements in a grid container.

The plugin uses CSS `calc` in places. Layouts have been tested to work in ie9+.

All layout elements are given `box-sizing: border-box;` by default.

## Layouts
### stack
```css
.container {
  layout: stack [left|right|center][shrink];
}
```

Creates a container with a vertically stacked 'tower' of elements, that can be optionally aligned left, right or center.
Another optional property value is `shrink` which causes a stacked element to shrink wrap its contents; 
it won't expand to fill its parent, instead make its width as small as possible to fit its contents.

**Example**
```css
.container {
  layout: stack right shrink;
}
```

### lines
```css
.container {
  layout: lines [top|bottom|middle][left|right|center];
}
```

Creates horizontally arranged child elements in the container elements selected by the rule.
There are optional horizontal and vertical alignment property values.
Child elements in a `layout: lines' container can wrap when they are longer than the container width.

**Example**
```css
.container {
  layout: lines bottom center;
}
```

### columns
```css
.container {
  layout: columns;
}
```

Creates horizontally arranged child elements that stretch in columns from the top to the bottom 
of the selected container elements, and horizontally fill their container.
*NOTE* the `.container` will have a width set of `100%` by default.

## Grids

### Define a grid
```css
@grid GRID_NAME {
  count: NUMBER_OF_COLUMNS;
  [gutter: GUTTER_VALUE [VERTICAL_GUTTER_VALUE];]
}
```

Define a grid with name GRID_NAME (eg. g12), number of columns NUMBER_OF_COLUMNS (eg. 12), and optional gutter GUTTER_VALUE (eg. 1em). An optional VERTICAL_GUTTER_VALUE (eg. 0.5em) can be set, if set then the first GUTTER_VALUE becomes the horizontal gutter.

### Use a grid
```css
.container {
  layout: lines;
  grid: GRID_NAME;
}
```

Use the `grid` property in a container to set which defined grid you want to use.
You **must** set `layout: lines` on the container for the grid to work, currently the only layout value which responds to the `grid` setting. *NOTE* the `.container` will have negative margins if gutter was set, so it is recommended to place the grid `.container` in its own wrapper container.

```css
.child {
  GRID_NAME-span: 6;
}
```

Use the `GRID_NAME-span` property in a child to define its width relative to the container grid.

**Example**
```css
@grid g12 {
  count: 12;
  gutter: 1em;
}

.container {
  layout: lines;
  grid: g12;
}

.child {
  g12-span: 4;
}
```
