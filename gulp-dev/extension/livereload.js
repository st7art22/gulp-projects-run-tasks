var path = require('path');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var Gaze = require('gaze').Gaze;

var gulpPath = '../';
var routers = require(gulpPath + 'routes');
var ext = '.js';

module.exports = function(proj, taskName, isDev) {
    var proj = proj;
    var routerLess = (typeof isDev === 'undefined' || isDev === false)? routers.all.des : routers.all.dev;
    var taskName = path.basename(taskName, ext);
    var taskNameFull = "" + proj + "-" + taskName;
    var lessDevPath = proj + "/" + routerLess;
  
    //TODO: сделать поизвольный набор файлов для слежения, а лучше массив
    var gaze = new Gaze([lessDevPath + "**/*.php", lessDevPath + "**/*.html"]);
    livereload.listen();

    gulp.task(taskNameFull, function() {

        gaze.on('changed', function(filePath) {
        	livereload.changed(filePath);
        	console.log(taskNameFull + ' task done');
        });

        gaze.on('added', function(filePath) {
        	livereload.changed(filePath);
        	console.log(taskNameFull + ' task done');
        });
    });
}