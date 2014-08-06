var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  haml = require('gulp-ruby-haml'),
  watch = require('gulp-watch'),
  ngHtml2Js = require('gulp-ng-html2js'),
  cleanhtml = require('gulp-cleanhtml'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  rimraf = require('gulp-rimraf'),
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
  http = require('http'),
  errorhandler = require('errorhandler'),
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
gulp.task('default', ['lint','dist', 'watch', 'serve']);

gulp.task('serve', function () {
  var json = '';

  var app = express();
  app.get('/api/v1/*', function (req, res) {
    switch (true) {
      case (!!req.url.match(/fact_tables$/)):
        json = '/fact_tables.json';
        break;
      case (!!req.url.match(/augurs$/)):
        json = '/augurs.json';
        break;
      case (!!req.url.match(/augurs\/.+$/)):
        json = '/augur.json';
        break;
      case (!!req.url.match(/habitats$/)):
        json = '/habitats.json';
        break;
      case (!!req.url.match(/habitats\/.+$/)):
        json = '/habitat.json';
        break;
    }

    // console.log('-API- %s %s %s', req.method, req.url, json);
    res.sendfile(__dirname + '/src' + req.url + json)
  });

  app.use('/scripts', express.static(__dirname + '/src/scripts'));

  app.use(express.static(__dirname + '/dist'));
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
  app.listen(serverport, function () {
    console.log('Started server on: ' + serverport);
    console.log("server started on http://localhost:"+serverport);
    lrserver.listen(livereloadport, function () {
      console.log('Started livereload server on: ' + livereloadport);
    });
  });
});

gulp.task('build', ['styles', 'requirejs'], function () {
  gulp.start('styles-dist-vendor', 'scripts-dist-vendor');
});

gulp.task('dist', ['clean-styles'], function () {
  gulp.start('index', 'haml-build', 'styles');
});

gulp.task('watch', function () {
  gulp.watch(['src/index-dist.html'], ['index']);
  gulp.src(['src/partials*/**/*.haml'], { read: false }).
        pipe(watch()).
        pipe(haml()).
        pipe(gulp.dest('dist/')).
        pipe(livereload(lrserver));

  gulp.watch(['src/styles/**/*'], ['styles']);
  gulp.watch(['src/scripts/main.js', 'src/scripts/app/**/*.js'], function(){
    livereload(lrserver).changed('from-js-watch-task')
  });
});

gulp.task('lint', function() {
    return gulp.src('src/scripts/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch-rails', function () {
  gulp.watch(['src/scripts/main.js', 'src/scripts/app/**/*.js', 'src/partials*/**/*.haml'], ['requirejs']);
  gulp.watch(['dist/scripts/main.js'], ['scripts-dist-vendor']);

  gulp.watch(['src/styles/**/*'], ['styles']);
  gulp.watch(['dist/styles/main.css'], ['styles-dist-vendor']);
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
gulp.task('index', function () {
  return gulp
    .src(['src/index-dist.html'])
    .pipe(rename('index.html'))
    .pipe(embedlr())
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(lrserver))
    .pipe(notify({ message: 'Index html task complete' }));
});

gulp.task('haml-build', function () {
  return gulp
    .src(['src/partials*/**/*.haml'])
    .pipe(haml())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Haml task complete' }));
});

gulp.task('templates', ['haml-build'], function () {
  return gulp
    .src(['dist/partials*/**/*.html'])
    .pipe(cleanhtml())
    .pipe(ngHtml2Js({moduleName: 'dejalyticsPartials'}))
    .pipe(concat('partials-tpls.min.js'))
    .pipe(gulp.dest('src/scripts/app/'))
    .pipe(notify({ message: 'Templates task complete' }));
});

//////////////////////////////
//// Styles
//////////////////////////////
gulp.task('clean-styles', function () {
  return gulp
    .src(['dist/styles/**/*', 'dist/fonts/*'], { read: false })
    .pipe(rimraf());
});

gulp.task('styles', ['glyphicons-bootstrap'], function () {
  return gulp.src(['src/styles/application.scss'])
//    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(livereload(lrserver))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('glyphicons-bootstrap', ['glyphicons-bootstrap-fonts', 'dejalytics-icons'], function () {
  return gulp.src(['src/styles/vendor/bootstrap-glyphicons-3.0.0/bootstrap-glyphicons.css'])
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('glyphicons-bootstrap-fonts', function () {
  return gulp.src([
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.eot',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.svg',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.ttf',
      'src/styles/vendor/bootstrap-glyphicons-3.0.0/*.woff'
    ])
    .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('dejalytics-icons', ['dejalytics-icon-fonts'], function () {
  return gulp.src(['src/styles/vendor/dejalytics-icon-fonts-1.0.0/dejalytics-icon-fonts.css'])
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('dejalytics-icon-fonts', function () {
  return gulp.src([
      'src/styles/vendor/dejalytics-icon-fonts-1.0.0/*.eot',
      'src/styles/vendor/dejalytics-icon-fonts-1.0.0/*.svg',
      'src/styles/vendor/dejalytics-icon-fonts-1.0.0/*.ttf',
      'src/styles/vendor/dejalytics-icon-fonts-1.0.0/*.woff'
    ])
    .pipe(gulp.dest('dist/fonts/'))
});


///////////////////////////////////////////////////
//// Add current requirejs lib to distribution
//// Package scripts for main.js (requirejs)
///////////////////////////////////////////////////
gulp.task('requirejs', ['templates'], function () {
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
