var path = require('path');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var Gaze = require('gaze').Gaze;

var gulpPath = '../';
var routers = require(gulpPath + 'routes');
var ext = '.js';

module.exports = function(proj, taskName, isDev, fileType,  pathProject) {
    var proj = proj;
    var routerLess = (typeof isDev === 'undefined' || isDev === false)? routers.all.des : routers.all.dev;
    var pathProj = (typeof pathProject === 'undefined')? "" : pathProject;
    var taskName = path.basename(taskName, ext);
    var taskNameFull = "" + proj + "-" + taskName;
    var lessDevPath = pathProj + proj + "/" + routerLess;

    if (Array.isArray(fileType)) {
        for (prop in fileType) {
            fileType[prop] = lessDevPath + '**/*' + fileType[prop];
        }

        var gaze = new Gaze(fileType);
    } else {
        var gaze = new Gaze(lessDevPath + "**/*.*");    
    }
    
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
};

