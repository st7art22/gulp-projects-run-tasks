var path = require('path');
var gulp = require('gulp');
var livereload = require('gulp-livereload');

var watch = require('gulp-watch');

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
    var watchPath = '';

    if (Array.isArray(fileType)) {
        for (prop in fileType) {
            fileType[prop] = lessDevPath + '**/*' + fileType[prop];
        }

        watchPath = fileType;
    } else {
        watchPath = lessDevPath + "**/*.*";
    }
    
    livereload.listen();


    gulp.task(taskNameFull, function() {
        watch(watchPath, function(event, filePath) {
            livereload.changed(filePath);
        });
    });
};

