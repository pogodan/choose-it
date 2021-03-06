module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.initConfig({

        jshint: {
            files: [
                'Gruntfile.js',
                'src/js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            dist: ['dist']
        },

        sass: {
            build: {
                files: {
                    'src/css/choose-it.css': 'src/css/choose-it.sass'
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'dist/choose-it.min.css': 'src/css/choose-it.css'
                }
            },

            demo: {
                files: {
                    '_gh-pages/demo.min.css': [
                        'src/css/choose-it.css',
                        'demo/demo.css'
                    ]
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    '_gh-pages/index.html': 'demo/index.html'
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                files: {
                    '_gh-pages/index.html': '_gh-pages/index.html'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/choose-it.min.js': 'src/js/choose-it.js'
                }
            },
            demo: {
                files: {
                    '_gh-pages/demo.min.js': [
                        'src/js/choose-it.js'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*', 'demo/**/*'],
                tasks: ['build']
            }
        },

        notify: {
            done: {
                options: {
                    title: 'Build Complete',
                    message: 'Alll done... refresh for changes!'
                }
            }
        }

    });

    /* Build process...

    - Lint JS
    - Clean old build
    - Process css 
    - Process scripts 
    - Process demo */

    grunt.registerTask('build', [
        'jshint',
        'clean', 
        'sass',
        'cssmin:build',
        'uglify:build',
        'demo',
        'notify:done'
    ]);

    grunt.registerTask('demo', [
        'processhtml',
        'htmlmin',
        'cssmin:demo',
        'uglify:demo'
    ]);

    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'watch']);

};
