/* Gruntfile for nomod

 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {

                files: [
                    'src/nomod.js'
                ],

                tasks: ['concat', 'uglify'],

                options: {

                    spawn:false,
                    event:['all']
                }
            }
        },


        clean: [ "build/**/*", "dist/**/*"],


        concat : {
            options : {
                separator: ';',
                sourceMap :true
            },
            dist : {
                src  : [
                    'src/nomod.js',
                ],
                dest : 'build/nomod.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - */\n',
                sourceMap : true,
                sourceMapIncludeSources : true,
                sourceMapIn: 'build/nomod.js.map'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/nomod.min.js'
            }
        },

        karma: {
            nomod: {
                configFile: 'test/test-browser-karma-nomod/karma-nomod.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', [ 'concat', 'uglify']);

};
