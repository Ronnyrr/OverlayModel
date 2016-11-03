const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./overlay-model.scss')
    .pipe(sass())
    .pipe(concat('overlayModel.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', function() {
    gulp.start('sass');
    gulp.watch('./*.scss', ['sass']);
});
