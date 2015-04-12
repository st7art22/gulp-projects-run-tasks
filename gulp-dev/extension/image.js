var path = require('path');
var gulp = require('gulp');
var pngquant = require('imagemin-pngquant');
var optipng = require('imagemin-optipng');

var watch = require('gulp-watch');

var gulpPath = '../';
var routers = require(gulpPath + 'routes');
var ext = '.js';

module.exports = function(proj, taskName, isDev, fileType,  pathProject) {
    var proj = proj;
    var router = (typeof isDev === 'undefined' || isDev === false)? routers.img.des : routers.img.dev;
    var pathProj = (typeof pathProject === 'undefined')? "" : pathProject;
    var taskName = path.basename(taskName, ext);
    var taskNameFull = "" + proj + "-" + taskName;
    var devPath = pathProj + proj + "/" + router;
    var watchPath = '';
    var start = false;

    if (Array.isArray(fileType)) {
        for (prop in fileType) {
            fileType[prop] = devPath + '**/*' + fileType[prop];
        }

        watchPath = fileType;
    } else {
        watchPath = devPath + "**/*.png";
    }

    gulp.task(taskNameFull, function() {
        gulp.watch(watchPath, [taskNameFull + '-abstract']);
        //gulp.start(taskNameFull + '-abstract');
    });

    gulp.task(taskNameFull + '-abstract' , function () {
        return gulp.src(watchPath)
                //.pipe(pngquant({quality: '90-100', speed: 4})())
                .pipe(optipng({optimizationLevel: 3})())
                .pipe(gulp.dest(devPath))
                ;
        //start = false;
    });
        

};

