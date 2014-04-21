var
  pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  jade = require('gulp-jade'),
  sass = require('gulp-ruby-sass'),
  coffee = require('gulp-coffee'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),

  connect = require('gulp-connect')
  livereload = require('gulp-livereload'),
  ftp = require('gulp-ftp');

var path = {
  distrib: './dist',
  script_name: 'jquery.' + pkg.name + '.js',
  script_name_min: 'jquery.' + pkg.name + '.min.js',
  jade: ['./app/*.jade'],
  sass: ['./app/styles/*.sass','!./app/styles/_*.sass'],
  sass_dest: './dist/styles/',
  coffee: [
    {src: './app/scripts/*.coffee', dest: './dist/scripts/lib/'},
    {src: './app/*.coffee', dest: './dist/'}
  ],
  scripts: [
    './dist/scripts/lib/base.js',
    './dist/scripts/lib/methods.js',
    './dist/scripts/lib/methods-date.js',
    './dist/scripts/lib/templates.js',
    './dist/scripts/lib/init.js'
  ]
}

gulp.task('jade', function() {
  gulp.src(path.jade)
    .pipe(jade({pretty: true}))
    .on('error', gutil.log)
    .pipe(gulp.dest(path.distrib));
});

gulp.task('sass', function () {
  gulp.src(path.sass)
    .pipe(sass({compass: true}))
    .pipe(gulp.dest(path.sass_dest));
});

gulp.task('coffee', function() {
  var coffee_process = function(block){
    gulp.src(block.src)
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(gulp.dest(block.dest))
  }
  path.coffee.forEach(coffee_process)
});

gulp.task('build_js', function() {
  gulp.src(path.scripts)
    .pipe(concat(path.script_name))
    .pipe(gulp.dest(path.distrib))
    .pipe(rename(path.script_name_min))
    .pipe(uglify())
    .pipe(gulp.dest(path.distrib));
});

gulp.task('clean', function() {
  gulp.src(path.distrib, {read: false})
    .pipe(clean());
});

//gulp.task('http-server', function() {
//  connect()
//    .use(livereload())
//    .use(connect.static(path.distrib))
//    .listen('9000');
//  console.log('Server listening on http://localhost:9000');
//});

gulp.task('build_all', [
  //'clean',
  'jade',
  'sass',
  'coffee',
  'build_js'
]);

gulp.task('watch',function(){
  gulp.watch(path.jade, ['jade']);
  gulp.watch(path.sass, ['sass']);

  // Watch Coffee Files
  var sources = path.coffee.map(function(element){
    return element.src;
  });
  gulp.watch(sources, ['coffee', 'build_js']);
});

// Hi-level tasks

// Default
gulp.task('default', ['build_all']);

// Server
gulp.task('server', ['build_all', 'watch']);
