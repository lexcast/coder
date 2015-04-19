module.exports = function(grunt) {

grunt.initConfig({
    bower: {
        dev: {
            dest: 'vendor/',
            options: {
                expand: true
            }
        }
    }
});

grunt.loadNpmTasks('grunt-bower');

grunt.registerTask('default', ['bower']);

};
