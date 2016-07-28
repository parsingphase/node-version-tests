module.exports = function (grunt) {

    // all paths relative to directory of this file

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        imagemin: {
            pix: {
                files: [
                    {
                        expand: true,
                        src: ['src/img/*.{png,jpg,gif,svg}'],
                        dest: 'built/img/'
                    }
                ]
            }
        },
        clean: {
            built: [
                // individual clean tasks can't assume these are completely un-needed
                'built'
            ]
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bless');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // ///////////// v3 tasks ///////////////

    grunt.registerTask(
        'default',
        'Test build',
        ['imagemin:pix']
    );
};
