var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var Gaze = require('gaze').Gaze;

var gulpPath = '../';
var routers = require(gulpPath + 'routes');
var ext = '.js';

module.exports = function(proj, taskName, isDev, pathProject) {

    var proj = proj;
    var routerLess = (typeof isDev === 'undefined' || isDev === false)? routers.less.des : routers.less.dev;
    var pathProj = (typeof pathProject === 'undefined')? "" : pathProject;
    var taskName = path.basename(taskName, ext);

    var taskNameFull = "" + proj + "-" + taskName;
    var lessDevPath = pathProj + proj + "/" + routerLess;
    console.log(lessDevPath);
    
    var gaze = new Gaze(lessDevPath + "**/*.less");

    gulp.task(taskNameFull, function() {

        gaze.on('ready', function(watcher) { });

        gaze.on('changed', function(filepath) {
            gulp.start(taskNameFull + '-abstract');
        });

        gaze.on('added', function(filepath) {
            gulp.start(taskNameFull + '-abstract');
        });
    });

    gulp.task(taskNameFull + '-abstract', function(){
        gulp.src(lessDevPath + "style.less")
            .pipe(plumber())
            .pipe(less())
            .pipe(minifycss())
            .pipe(plumber.stop())
            .pipe(gulp.dest(lessDevPath))
            .pipe(livereload());
    });
};