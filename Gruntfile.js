/*global require, module */
module.exports = function (grunt) {
    'use strict';
    
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        gruntConfig: {},
        pkg: grunt.file.readJSON('package.json'),
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {dest: './dist/artificial-intelligence.zip', src: ['./artificial-intelligence/**']},
                    {dest: './dist/conversations.zip', src: ['./conversations/**']},
                    {dest: './dist/objects.zip', src: ['./objects/**']},
                    {dest: './dist/scenes.zip', src: ['./scenes/**']}
                ]
            }
        },
        clean: {
            zip: ['dist']
        }
    });
    
    grunt.registerTask('default', ['compress']);
};