/*global require, module */
module.exports = function (grunt) {
    'use strict';
    
    grunt.initConfig({
        gruntConfig: {
            commitMessage: 'New Release Build: Incrementing Version number to <%= grunt.file.readJSON("bower.json").version %>',
            artificialIntelligence: grunt.file.readJSON('artificial-intelligence/bower.json'),
            conversations: grunt.file.readJSON('conversations/bower.json'),
            objects: grunt.file.readJSON('objects/bower.json'),
            scenes: grunt.file.readJSON('scenes/bower.json'),
            bower: grunt.file.readJSON('bower.json'),
            gitRemoteStream: 'firstdraft'
        },
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            version: {
                files: [{
                    expand: true, 
                    cwd: 'artificial-intelligence', 
                    src: ['./**'], 
                    dest: 'dist/artificial-intelligence/<%= gruntConfig.artificialIntelligence.version %>'
                }, {
                    expand: true,
                    cwd: 'conversations',
                    src: ['./**'],
                    dest: 'dist/conversations/<%= gruntConfig.conversations.version %>'
                }, {
                    expand: true,
                    cwd: 'objects',
                    src: ['./**'],
                    dest: 'dist/objects/<%= gruntConfig.objects.version %>'
                }, {
                    expand: true,
                    cwd: 'scenes',
                    src: ['./**'],
                    dest: 'dist/scenes/<%= gruntConfig.scenes.version %>'
                }]
            }
        },
        'json-minify': {
            dist: {
                options: {
                    transform: function (data, options) {
                        var fileObject = data ? JSON.parse(data) : {};
                        if (!fileObject.name || fileObject.name.indexOf('d-FRAG_') === -1) {
                            return JSON.stringify(fileObject);
                        }

                        return data;
                    }
                },
                files: 'dist/**/*.json'
            }
        },
        zip_directories: {
            dist: {
                files: [{
                    filter: 'isDirectory', 
                    expand: true, 
                    src: ['artificial-intelligence', 'conversations', 'objects', 'scenes'], 
                    dest: 'dist'
                }]
            },
            artificialIntelligence: {
                files: [{
                    filter: 'isDirectory', 
                    expand: true, 
                    src: ['dist/artificial-intelligence/<%= gruntConfig.artificialIntelligence.version %>'],
                    dest: '.'
                }]
            },
            conversations: {
                files: [{
                    filter: 'isDirectory',
                    expand: true,
                    src: ['dist/conversations/<%= gruntConfig.conversations.version %>'],
                    dest: '.'
                }]
            },
            objects: {
                files: [{
                    filter: 'isDirectory',
                    expand: true,
                    src: ['dist/objects/<%= gruntConfig.objects.version %>'],
                    dest: '.'
                }]
            },
            scenes: {
                files: [{
                    filter: 'isDirectory',
                    expand: true,
                    src: ['dist/scenes/<%= gruntConfig.scenes.version %>'],
                    dest: '.'
                }]
            }
        },
        clean: {
            zip: ['dist']
        },
        shell: {
            gitAddTest: {
                command: 'git add .'
            },
            gitCommitTest: {
                command: 'git commit -m "<%= gruntConfig.commitMessage %>"'
            },
            gitPushTest: {
                command: 'git push origin HEAD:<%= gruntConfig.gitRemoteStream %>'
            }
        },
        version: {
            project: {
                src: [
                    'artificial-intelligence/bower.json',
                    'conversations/bower.json',
                    'objects/bower.json',
                    'scenes/bower.json',
                    'package.json',
                    'bower.json'
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-zip-directories');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-sed');
    
    grunt.registerTask('zip', [
        'zip_directories:artificialIntelligence', 
        'zip_directories:conversations',
        'zip_directories:objects',
        'zip_directories:scenes'
    ]);
    grunt.registerTask('deploy', ['default', 'version:project:patch', 'shell']);
    grunt.registerTask('default', ['dist', 'minify', 'zip']);
    grunt.registerTask('minify', ['json-minify']);
    grunt.registerTask('dist', ['copy']);
};