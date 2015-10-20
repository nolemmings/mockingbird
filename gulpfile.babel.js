import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';

gulp.task('serve', () => {
  nodemon({
    script: 'src/index.js',
  });

  // Make sure to quit if we get a SIGINT, if we subject this part,
  // nodemon will keep on running and eventually halt on errors.
  process.once('SIGINT', () => {
    process.exit(0);
  });
});

gulp.task('lint', () => {
  return gulp.src(['gulpfile.babel.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(['gulpfile.babel.js', 'src/**/*.js', 'test/**/*.js'], ['lint']);
});

gulp.task('default', ['watch', 'build']);
