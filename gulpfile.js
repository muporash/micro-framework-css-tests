/**
* REQUIREMENTS
*/
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync');
var useref          = require('gulp-useref');

/**
* DOSSIERS DEV
*/
var pathsDev = {
  // SCSS
  scssSrc:          'app/assets/scss/**/*.scss',
  scssDest:         'app/assets/css'
}
/**
* DOSSIERS PROD
*/
var pathsProd = {
  // SCSS
  scssDest:         'public/assets/css',
  publicHTML:       'public/*.html',
  publicJS:         'public/assets/js/**/*.js'
}

/**
* TACHES
*/
gulp.task('scssDev', function() {
  return gulp.src(pathsDev.scssSrc)
    .pipe(sass())
    .pipe(gulp.dest(pathsDev.scssDest))
})

gulp.task('scssProd', function() {
  return gulp.src(pathsDev.scssSrc)
    .pipe(sass())
    .pipe(gulp.dest(pathsProd.scssDest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  })
})

/**
* AUTO COMPILATION EN DEV.
*/
gulp.task('watch', ['browserSync', 'scssProd'], function() {
  gulp.watch(pathsDev.scssSrc,      ['scssProd']);
  gulp.watch(pathsProd.publicHTML,  browserSync.reload);
  gulp.watch(pathsProd.publicJS,    browserSync.reload);
})
