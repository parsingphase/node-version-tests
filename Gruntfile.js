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
        copy: {
            less: {
                files: [
                    {
                        // copy less files to a .../bootstrap directory which we can add to path as expected by styles.less
                        expand: true,
                        cwd: 'node_modules/bootstrap/less',
                        src: '**',
                        dest: 'built/tmp/less/bootstrap'
                    }
                ]
            }
        },
        less: {
            bootstrap: {
                options: {
                    sourceMap: true,
                    cleancss: false,
                    paths: [
                        'built/tmp/less', // bootstrap file base
                        'src/less'       // own less files
                    ]
                },
                files: [{
                    src: ['src/less/style.less'],
                    dest: 'built/less/built.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                preserveComments: false,
                // exportAll: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
                sourceMap: true
            },
            js: {
                files: [{
                    src: ['src/js/script.js', 'node_modules/angular/angular.js'],
                    dest: 'built/js/script.js'
                }]
            }
        },
        clean: {
            built: [
                // individual clean tasks can't assume these are completely un-needed
                'built'
            ]
        }

    });

    // List of NPM tasks on main project - not all used in testing
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bless');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // ///////////// tasks ///////////////

    grunt.registerTask(
        'default',
        'Test build',
        ['copy', 'imagemin:pix', 'less:bootstrap', 'uglify:js']
    );
};
