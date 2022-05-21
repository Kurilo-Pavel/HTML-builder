const fs = require('fs');
const path = require('node:path');

const pathParentFile = path.join(__dirname);
const pathNewFile = path.join(__dirname, 'files-copy');
const pathFile = path.join(__dirname, 'files');

fs.readdir(pathParentFile, 'utf-8', (err, files) => {
  if (err) throw err;
  if (files.some(file => file === 'files-copy')) {
    fs.rm(pathNewFile,{ recursive: true, force: true },(err)=>{
      if(err) throw err;
      addDirection();
    });
  } else {addDirection();}
});

function addDirection() {
  fs.mkdir(pathNewFile, {recursive: true}, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFile, 'utf-8', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const pathOldFile = path.join(__dirname, 'files', file);
      const pathNewFile = path.join(__dirname, 'files-copy', file);
      fs.copyFile(pathOldFile, pathNewFile, (err) => {
        if (err) throw err;
      });
    });
  });
}