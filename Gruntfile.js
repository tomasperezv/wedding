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
        src: 'tmp/bundle.js',
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
          './release/std.html': './html/save_the_date.html'
        }
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

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'htmlmin', 'clean']);

};
