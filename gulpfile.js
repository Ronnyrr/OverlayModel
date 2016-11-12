const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('nodemon', (cb) => { //[ 'babel' ]
  const nodemon = require('nodemon');

  nodemon({
    script: './server.js',
    watch: ['./js', './css']
  })
  .once('start', cb)
  .on('start', () => {
    gutil.log(`${c.cyan('nodemon')}: started`);
  })
  .on('restart', (files) => {
    gutil.log(`${c.cyan('nodemon')}: ${c.yellow(files[0].replace(__dirname + '/', ''))} changed - restarting`);
  })
});

gulp.task('default', function() {
    gulp.start('sass');
    gulp.start('nodemon');

    gulp.watch('./scss/*.scss', ['sass']);
});
