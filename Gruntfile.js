/*global require, module */
module.exports = function (grunt) {
    'use strict';
    
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        gruntConfig: {},
        pkg: grunt.file.readJSON('package.json'),
        zip_directories: {
            dist: {
                files: [{filter: 'isDirectory', expand: true, src: ['artificial-intelligence', 'conversations', 'objects', 'scenes'], dest: 'dist'}]
            }
        },
        clean: {
            zip: ['dist']
        }
    });
    
    grunt.registerTask('default', ['zip_directories:dist']);
};