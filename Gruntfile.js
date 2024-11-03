module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Example task to clean build directory
    clean: {
      build: ['dist']
    },

    // Copy task - copies files to dist directory
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              '**',
              '!node_modules/**',
              '!dist/**',
              '!test/**',
              '!.github/**',
              '!.git/**'
            ],
            dest: 'dist/'
          }
        ]
      }
    },

    // Optional: Add JS minification
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.js', '!node_modules/**'],
          dest: 'dist'
        }]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['clean', 'copy', 'uglify']);
};