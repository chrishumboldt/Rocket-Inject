module.exports = function(grunt) {
	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['watch']);

	// Other tasks
	grunt.registerTask('build', ['uglify']);

	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/injectplate.min.js': ['js/injectplate.js']
				}
			}
		},
		// Watch
		watch: {
			// HTML
			html: {
				files: ['*.html']
			},
			// Scripts
			scripts: {
				files: 'js/*.js',
				tasks: ['uglify']
			},
			// Live reload
			options: {
				livereload: true
			}
		}
	});
}