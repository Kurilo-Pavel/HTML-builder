const fs = require('fs');
const path = require('node:path');

const pathStyle = path.join(__dirname, 'styles');
const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathStyle, {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
  if (err) throw err;
  fs.writeFile(pathBundle, '', (err) => {
    if (err) throw err;
  });
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const pathFile = path.join(pathStyle, file.name);
      fs.readFile(pathFile, (err, data) => {
        if (err) throw err;

        fs.appendFile(pathBundle, data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});
