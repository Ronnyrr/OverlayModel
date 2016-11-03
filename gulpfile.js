const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./fonts'))
})

gulp.task('default', function() {
    gulp.start('sass');
    gulp.start('fonts');
    gulp.watch('./scss/*.scss', ['sass']);
});
