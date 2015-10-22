var gulp = require('gulp');
var tape = require('gulp-tape');


var files = ['index.js', './test/*.js', 'gulpfile.js'];

gulp.task('test', function () {
    return gulp.src('test/*.js')
	    .pipe(tape());
});

gulp.task('default', ['test']);

gulp.task('watch', function () {
    gulp.watch(files, ['test']);
});
