var
  open = require('open'),
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
  ftp = require('gulp-ftp');

var path = {
  names: ['base', 'methods', 'methods-date', 'templates', 'init'],
  output_name: 'jquery.' + pkg.name + '.js',
  output_name_min: 'jquery.' + pkg.name + '.min.js',
  dist_main: './dist/',
  dist_scripts: './dist/scripts/',
  dist_lib: './dist/scripts/lib/',
  dist_style: './dist/styles/',
  jade: ['./app/*.jade'],
  sass: ['./app/styles/*.sass', '!./app/styles/_*.sass'],
  coffee: function(){
    return this.names.map(function(element){
      return './app/scripts/' + element + '.coffee'
    });
  },
  example: ['./app/*.coffee'],
  assets: ['./app/vendor/**/*.*', './app/images/**/*.*']
}

gulp.task('jade', function() {
  gulp.src(path.jade)
    .pipe(jade({pretty: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.dist_main))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(path.sass)
    .pipe(sass({compass: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.dist_style))
    .pipe(connect.reload());
});

gulp.task('example', function() {
  gulp.src(path.example)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.dist_main))
    .pipe(connect.reload());
});

gulp.task('coffee', function() {
  gulp.src(path.coffee())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.dist_scripts))
    .pipe(concat(path.output_name))
    .pipe(gulp.dest(path.dist_main))
    .pipe(rename(path.output_name_min))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist_main))
    .pipe(connect.reload());
});

gulp.task('assets', function() {
  gulp.src(path.assets, {base: './app/'})
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function() {
  gulp.src(path.dist_main + '*', {read: false})
    .pipe(clean());
});

gulp.task('connect', function() {
  connect.server({
    host: '127.0.0.1',
    root: path.dist_main,
    livereload: true,
    middleware: function(connect, opt) {
      setTimeout(function(){
        open('http://' + opt.host + ':' + opt.port + '/');
      },1000);
      return [];
    }
  });
});

gulp.task('build', [
  'clean',
  'jade',
  'sass',
  'coffee',
  'example',
  'assets'
]);

gulp.task('watch',function(){
  gulp.watch(path.jade, ['jade']);
  gulp.watch(path.sass, ['sass']);
  gulp.watch(path.coffee(), ['coffee']);
  gulp.watch(path.example, ['example']);

});

// Hi-level tasks

// Default
gulp.task('default', ['build']);

// Server
gulp.task('server', ['build', 'connect', 'watch']);
