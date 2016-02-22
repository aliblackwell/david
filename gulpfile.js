var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');

require('es6-promise').polyfill();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('scenes-uglify', function(){
  return gulp.src('./www/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', concat('concat.js')))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('scenes-move', function () {
  return gulp.src('./www/scenes/**/*.html') // Get source files with gulp.src
    //.pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('dist/scenes')) // Outputs the file in the destination folder
})

gulp.task('projections-uglify', function(){
  return gulp.src('./www/projections/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/projections'))
});

gulp.task('projections-move', function () {
  return gulp.src('./www/projections/**/*.html') // Get source files with gulp.src
    //.pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('dist/projections')) // Outputs the file in the destination folder
})

gulp.task('dashboard-uglify', function(){
  return gulp.src('./www/dashboard/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/dashboard'))
});

gulp.task('dashboard-move', function () {
  return gulp.src('./www/dashboard/template.html') // Get source files with gulp.src
    //.pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('dist/dashboard')) // Outputs the file in the destination folder
})

gulp.task('general-images', function(){
  return gulp.src('./www/img/**/*.+(png|jpg|gif|svg|JPG)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

gulp.task('ion-fonts', function(){
  return gulp.src('./www/lib/ionic/fonts/ionicons.+(ttf|woff)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/lib/ionic/fonts'))
});

gulp.task('build-scenes', function(callback) {
  runSequence('general-images', 'ion-fonts', 'scenes-uglify', 'scenes-move');
})

gulp.task('build-projections', function(callback) {
  runSequence('projections-move','projections-uglify');
})

gulp.task('build-dashboard', function(callback) {
  runSequence('dashboard-uglify', 'dashboard-move');
})

gulp.task('build', function(callback) {
  runSequence('build-scenes', 'build-projections', 'build-dashboard');
})




