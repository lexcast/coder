module.exports = function(grunt) {

grunt.initConfig({
    bower: {
        dev: {
            dest: 'vendor/',
            options: {
                expand: true,
                packageSpecific: {
                    'devicon': {
                        files: [
                            "fonts/*",
                            "devicon.css",
                            "devicon.json",
                            "!gulpfile.js"
                        ]
                    }
                }
            }
        }
    },
    nodewebkit: {
        options: {
            platforms: ['linux64'],
            buildDir: './builds',
        },
        src: [
            './package.json',
            './LICENSE',
            './index.html',
            './resources/*',
            './css/*',
            './js/*',
            './vendor/**/*',
        ]
      },
});

grunt.loadNpmTasks('grunt-bower');
grunt.loadNpmTasks('grunt-node-webkit-builder');

grunt.registerTask('default', ['bower']);
grunt.registerTask('build', ['nodewebkit']);

};
