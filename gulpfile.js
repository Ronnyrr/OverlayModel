const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  const src = [
    'scss/*.scss'
  ]

  return gulp.src(src)
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', function() {
    gulp.start('sass');
    gulp.watch('./*.scss', ['sass']);
});
