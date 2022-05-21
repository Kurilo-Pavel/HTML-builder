const fs = require('fs');
const path = require('node:path');
const filePath = path.join(__dirname, 'secret-folder');
fs.readdir(filePath, {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathStat = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(pathStat, (err, stats) => {
        if (err) throw err;
        console.log(file.name.slice(0, file.name.lastIndexOf(path.extname(file.name))) +
          ' - ' + path.extname(file.name).slice(1) + ' - ' + stats.size/1024+' Кб');
      });
    }
  });
});