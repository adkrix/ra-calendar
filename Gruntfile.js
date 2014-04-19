/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  var ftp = grunt.file.readJSON('.ftppass');


  grunt.initConfig({
    meta: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        'compass': true
      },
      dist: {
        files: {
          'dist/styles/main.css': 'app/styles/main.sass',
          'dist/styles/example.css': 'app/styles/example.sass'
        }
      }
    },

    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'dist/scripts/lib/base.js': ['app/scripts/base.coffee'],
          'dist/scripts/lib/methods.js': ['app/scripts/methods.coffee'],
          'dist/scripts/lib/methods-date.js': ['app/scripts/methods-date.coffee'],
          'dist/scripts/lib/templates.js': ['app/scripts/templates.coffee'],
          'dist/scripts/lib/init.js': ['app/scripts/init.coffee'],
          'dist/example.js': ['app/example.coffee']
        }
      }
    },

    concat: {
      // replace template variables (<%= %>), IN PLACE
      variables: {
        options: {
          process: true // replace
        },
        expand: true,
        cwd: 'dist/scripts/lib/',
        src: [ '*.js'],
        dest: 'dist/scripts/lib/'
      },
      archive:{
        options: {
          separator: ';;',
          banner: "/*\n  file: jquery.<%= meta.name %>.js\n  version: <%= meta.version %> \n */"+
            "\n$(function() {\n'use strict';\n\n",
          footer: "\n});",
          process: function(src, filepath) {
            src = src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            src = "\n// Source: " + filepath + "\n" + src;
            return src;
          }
        },
        src: [
          'dist/scripts/lib/base.js',
          'dist/scripts/lib/methods.js',
          'dist/scripts/lib/methods-date.js',
          'dist/scripts/lib/templates.js',
          'dist/scripts/lib/init.js'
        ],
        dest: 'dist/scripts/jquery.<%= meta.name %>.js'
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          "dist/index.html": "app/index.jade"
        }
      }
    },

    copy: {
      dist:{
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app/',
            dest: 'dist/',
            src: [
              'vendor/*/*.js',
              'images/*.png',
              '*.{ico,txt}',
              '*.html',
              'fonts/*'
            ]
          }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! jquery.<%= meta.name %>.js <%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n'
      },
      dist: {
        files: {
          'dist/scripts/jquery.<%= meta.name %>.min.js': ['<%= concat.archive.dest %>']
        }
      }
    },

    watch: {
      sass: {
        files: ['app/styles/*'],
        tasks: 'sass'
      },
      coffee: {
        files: ['app/*.coffee','app/scripts/*.coffee'],
        tasks: ['coffee','concat:variables', 'concat:archive', 'uglify']
      },
      jade: {
        files: ['app/*.jade'],
        tasks: 'jade:compile'
      },
      copy: {
        files: ['app/*.html', 'app/images/*.png'],
        tasks: 'copy'
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: ftp.host,
          authKey: 'key'
        },
        src: 'dist/',
        dest: ftp.dest,
        exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db']
      }
    }
  });

  // Load necessary plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('build', [
    'sass',
    'coffee',
    'concat:variables',
    'concat:archive',
    'uglify',
    'jade:compile',
    'copy:dist'
  ]);


  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('server', [
    'build',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftp-deploy'
  ]);

};

