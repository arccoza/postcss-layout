## [1.2.0] - 2016-04-19
### Added
- `buffer` and `shift` span values, to move and space grid items.

## [1.1.1] - 2016-01-21
### Changed
- Fixed nested rule (@media) bug, by switching from using root to do inserts to the parent of the source rule.
eg. css.insertAfter -> parent.insertAfter.
- Fixed grid system bug in gutter value | unit regex extractor, 
regex did not account for floating point / decimal point values, eg. 3.2rem.

## [1.1.0] - 2015-11-16
### Added
- layout: flow, float based layout.
- Example in example/ dir.
- Demo at: http://arccoza.github.io/postcss-layout/

### Changed
- Refactored and tidied code with easy default styles.


## [1.0.2] - 2015-11-11
### Changed
- Fixed layout:lines white-space regression.

## [1.0.1] - 2015-10-26
### Changed
- PostCSS plugin requirements; added package.json keyword.
- PostCSS plugin requirements; changelog.
- PostCSS plugin requirements; output examples.

## [1.0.0] - 2015-10-26
### Changed
- Refactored index.js.

### Added
- Completed adding tests.
