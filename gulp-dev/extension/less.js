var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var Gaze = require('gaze').Gaze;
var plumber = require('gulp-plumber');

var gulpPath = '../';
var routers = require(gulpPath + 'routes');
var ext = '.js';

module.exports = function(proj, taskName, isDev) {

    var proj = proj;
    var routerLess = (typeof isDev === 'undefined' || isDev === false)? routers.less.des : routers.less.dev;
    var taskName = path.basename(taskName, ext);

    var taskNameFull = "" + proj + "-" + taskName;
    var lessDevPath = proj + "/" + routerLess;

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
    // TODO: попробовать запустить оба лайврелоада
    gulp.task(taskNameFull + '-abstract', function(){
        gulp.src(lessDevPath + "style.less")
            .pipe(plumber())
            .pipe(less())
            .pipe(minifycss())
            .pipe(gulp.dest(lessDevPath))
            .pipe(livereload());
    });
};
