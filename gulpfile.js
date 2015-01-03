var requireDir 		= require('require-dir');
var gulp 			= require('gulp');
var gulpPath		= './gulp-dev/';
var taskPath 		= gulpPath + 'tasks/';

var getDirOrFiles 	= require(gulpPath + 'getDirs');
var routers			= require(gulpPath + 'routes');
var projects 		= getDirOrFiles(taskPath, true);


/**
* Перебираем всё проекты, которые находятся в папке tasks
* т.е. в название папки - название проекта
* внутри папки с проектом сами tasks, которые просто инслудятся
* для выполнения
*/

var task = [];
for (var project in projects) {
	var path = taskPath + projects[project];
	requireDir(path, { recurse: true });

	// получаем массив тасков
	var files = getDirOrFiles(path);

	for(taskElement in files) {
		task.push("" + projects[project] + "-" + files[taskElement]);		
	}
}

//run task
gulp.task('default', task);
