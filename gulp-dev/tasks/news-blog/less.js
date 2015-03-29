var gulpPath = '../../';
var path = require('path');
var lessModule = require(gulpPath + 'extension/less');
var proj = path.basename(__dirname);
var taskName = path.basename(__filename);

// регистрируем таск 
// proj - имя проекта
// taskName - имя самого таска
// isDev - dev || des
lessModule(proj, taskName, false, '/home/st7art/projects/');
