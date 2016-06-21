var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');

gulp.task('styles', function() {
  gulp.src(['lib/**/*.scss', 'plugins/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe( postcss([ require('autoprefixer'), require('cssnano') ]) )
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  gulp.watch(['lib/**/*.scss', 'plugins/**/*.scss'], ['styles']);
});

gulp.task('default', ['styles', 'watch']);
