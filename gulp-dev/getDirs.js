var fs = require('fs');
var path = require('path');
var ext = '.js';

/**
* получаем массив дирикторий или массив файлов
* по умолчанию, получаем массив файлов
*/
module.exports = function(rootDir, isDir) {
	var files = fs.readdirSync(rootDir);
	var dirs = [];
	var fileResult = [];
	
	isDir = (typeof isDir === 'undefined' || isDir === false)? false : isDir;
	
	for(var file in files) {
		
		if (files[file] != '.') {
			var filePath = "" + rootDir + "/" + files[file] + "";
			var stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				dirs.push(files[file]);
			} else if (stat.isFile() && !isDir) {
				fileResult.push(path.basename(files[file], ext));
			}
		}
	}

	/* если isDir == true, то возвращаем массив с дирикториями,
	 * иначе возвращаем файлы
	*/
	dirs = (isDir)? dirs : fileResult;
	return dirs;
}
