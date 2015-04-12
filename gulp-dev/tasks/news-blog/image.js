var gulpPath = '../../';
var path = require('path');
var imageModule = require(gulpPath + 'extension/image');
var proj = path.basename(__dirname);
var taskName = path.basename(__filename);
// регистрируем таск 
// proj - имя проекта
// taskName - имя самого таска
// isDev - dev || des
imageModule(proj, taskName, false, ['.png', '.jpg'], '/home/st7art/projects/');
