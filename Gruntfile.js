module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      css: {
        src: [
          './static/css/*'
        ],
        dest : './tmp/css/sdt.css'
    },
      js : {
        src : [
          './static/js/*'
        ],
        dest : './tmp/js/sdt.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'tmp/js/sdt.js',
        dest: 'release/static/js/sdt-<%= pkg.version %>.min.js'
      }
    },

    cssmin: {

      minify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        expand: true,
        cwd: './tmp/css/',
        src: ['*.css'],
        dest: './release/static/css/',
        ext: '-<%= pkg.version %>.min.css'
      }

    },

    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          collapseWhitespace: true
        },
        files: {
          './release/sdt.html': './tmp/sdt_es.html',
          './release/sdt_en.html': './tmp/sdt_en.html'
        }
      }
    },

    watch: {
      scripts: {
        files: ['./static/js/*.js', './static/css/*.css', './templates/*.html'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },

    template_runner: {

      folder: {
        options: {
          locales: ['en', 'es'],
          directory: 'locales'
        },
        files: {
          'tmp/sdt.html': ['tmp/sdt.html']
        }
      }

    },

    'string-replace': {
      version: {
        files: {
          './tmp/sdt.html': './templates/save_the_date.html'
        },
        options: {
          replacements: [
            {
              pattern: /{{STATIC_VERSION}}/g,
              replacement: function() { return grunt.config.get('pkg').version; }
            }
          ]
        }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['static/img/*'], dest: 'release/', filter: 'isFile'},
          {expand: true, src: ['static/fonts/*'], dest: 'release/', filter: 'isFile'}
        ]
      }
    },

    clean: ["./tmp/"]

  });

  // Load needed plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-template-runner');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Define the tasks
  grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'string-replace', 'template_runner', 'htmlmin', 'copy', 'clean']);
  grunt.registerTask('locale', ['template_runner']);
  grunt.registerTask('replace', ['string-replace']);
  grunt.registerTask('default', ['build']);

};
