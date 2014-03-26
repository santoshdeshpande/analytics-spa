var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  haml = require('gulp-ruby-haml'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  embedlr = require('gulp-embedlr'),
  livereload = require('gulp-livereload'),
  lr = require('tiny-lr'),
  lrserver = lr(),
  fs = require('fs'),
  Q = require('q'),
  requirejs = require('requirejs'),
  ecstatic = require('ecstatic'),
  http = require('http'),
  express = require('express');

//////////////////////////////
//// Settings
//////////////////////////////
var livereloadport = 35729,
    serverport = 4000;


//////////////////////////////
//// Default
//////////////////////////////
//gulp.task('default', ['dist', 'watch', 'serve']);
gulp.task('default', ['dist', 'watch', 'serve']);

gulp.task('serve', function () {
  var app = express();
  app.configure(function(){
    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return next();
    });
    app.use(express.static(__dirname + '/dist'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.listen(serverport, function () {
    console.log('Started server on: ' + serverport);
    lrserver.listen(livereloadport, function () {
      console.log('Started livereload server on: ' + livereloadport);
    });
  });
});

gulp.task('dist', ['dist-clean'], function() {
  gulp.start('index', 'haml', 'assets', 'styles', 'fonts-foundation', 'glyphicons-bootstrap', 'lib', 'requirejs');
});
gulp.task('dist-clean', ['clean-html-assets', 'clean-styles', 'clean-lib']);

gulp.task('watch', function() {
  gulp.watch(['src/index-dist.html'], ['index', 'assets']);
  gulp.watch([
    'src/img*/**/*',
    'src/scripts*/**/modernizr*', 'src/scripts*/**/jquery*', 'src/scripts*/**/foundation*'
  ], ['assets']);
  gulp.watch(['src/partials*/**/*.haml'], ['haml']);
  gulp.watch(['src/styles/**/*'], ['styles']);
  gulp.watch(['src/scripts/main.js', 'src/scripts/app/**/*.js'], ['requirejs']);


  gulp.watch(['dist/styles/main.css'], ['styles-dist-vendor']);
  gulp.watch(['dist/scripts/main.js'], ['scripts-dist-vendor']);
});

//////////////////////////////
//// Vendor assets
//////////////////////////////
gulp.task('styles-dist-vendor', function () {
  return gulp
    .src(['src/styles/application.scss'])
    .pipe(sass())
    .pipe(concat('dejalytics.scss'))
    .pipe(gulp.dest('../vendor/assets/stylesheets/'))
    .pipe(notify({ message: 'Vendored dejalytics.scss' }));
});

gulp.task('scripts-dist-vendor', function () {
  return gulp
    .src('dist/scripts/main.js')
    .pipe(rename('dejalytics-spa.js'))
    .pipe(gulp.dest('../vendor/assets/javascripts/'))
    .pipe(notify({ message: 'Vendored dejalytics-spa.js' }));
});

//////////////////////////////
//// Static files
//////////////////////////////
gulp.task('clean-html-assets', function () {
  return gulp
    .src([
           'dist/**/*.html', 'dist/img/**/*',
           'dist/api/**/*',
           'dist/scripts/**/modernizr*',
           'dist/scripts/**/jquery*',
           'dist/scripts/**/foundation*'
         ], { read: false })
    .pipe(clean());
});

gulp.task('index', function () {
  return gulp
    .src(['src/index-dist.html'])
    .pipe(rename('index.html'))
    .pipe(embedlr())
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(lrserver))
    .pipe(notify({ message: 'Index html task complete' }));
});

gulp.task('haml', function () {
  return gulp
    .src(['src/partials*/**/*.haml'])
    .pipe(haml())
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(lrserver));
});

gulp.task('assets', function () {
  return gulp
    .src([
      'src/img*/**/*',
      'src/api*/**/*',
      'src/scripts*/**/modernizr*',
      'src/scripts*/**/jquery*',
      'src/scripts*/**/foundation*'
    ])
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(lrserver));
});

//////////////////////////////
//// Styles
//////////////////////////////
gulp.task('clean-styles', function () {
  return gulp
    .src(['dist/styles/**/*', 'dist/fonts/*'], { read: false })
    .pipe(clean());
});

gulp.task('styles', function () {
  return gulp.src(['src/styles/application.scss'])
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(livereload(lrserver))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('fonts-foundation', function () {
  return gulp.src([
      'src/styles/vendor/foundation-icons/*.eot',
      'src/styles/vendor/foundation-icons/*.svg',
      'src/styles/vendor/foundation-icons/*.ttf',
      'src/styles/vendor/foundation-icons/*.woff'
    ])
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('glyphicons-bootstrap', function () {
  return gulp.src([
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.eot',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.svg',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.ttf',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.woff'
    ])
    .pipe(gulp.dest('dist/fonts/'))
});


///////////////////////////////////////////////////
//// Add current requirejs lib to distribution
//// Package scripts for main.js (requirejs)
///////////////////////////////////////////////////
gulp.task('clean-lib', function () {
  return gulp
    .src(['dist/scripts/lib/requirejs*'], { read: false })
    .pipe(clean());
});

gulp.task('lib', function () {
  return gulp.src('src/scripts/lib/requirejs-*/require.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/lib'))
    .pipe(livereload(lrserver))
    .pipe(notify({ message: 'Lib task complete' }));
});

gulp.task('requirejs', function () {
  var deferred = Q.defer();
  var config = {};

  config.mainConfigFile = 'src/scripts/main.js';
  config.baseUrl = 'src/scripts/app';
  config.name = 'main';
  config.out = 'dist/scripts/main.js';
  config.optimize = 'none';

  requirejs.optimize(config, function (buildResponse) {
    deferred.resolve();
    lrserver.changed({ body: { files: buildResponse } });
  }, function (err) {
    console.error(err);
  });

  return deferred.promise;
});
