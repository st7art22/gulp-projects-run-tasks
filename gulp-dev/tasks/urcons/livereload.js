var gulpPath = '../../';
var path = require('path');
var liveReloadModule = require(gulpPath + 'extension/livereload');
var proj = path.basename(__dirname);
var taskName = path.basename(__filename);

// регистрируем таск 
// proj - имя проекта
// taskName - имя самого таска
// isDev - dev || des
liveReloadModule(proj, taskName, false);
