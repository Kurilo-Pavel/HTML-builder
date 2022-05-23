const fs = require('fs');
const path = require('node:path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathTemplate = path.join(__dirname, 'template.html');
const pathIndex = path.join(pathProjectDist, 'index.html');
const pathNewStyles = path.join(pathProjectDist, 'style.css');
const pathAssets = path.join(pathProjectDist, 'assets');
const pathComponent = path.join(__dirname, 'components');
const pathStyles = path.join(__dirname, 'styles');

fs.mkdir(pathProjectDist, {recursive: true}, (err) => {
  if (err) throw err;
});
(async () => {
  const index = await fs.promises.readFile(pathTemplate, 'utf-8');
  fs.promises.writeFile(pathIndex, index);
  const files = await fs.promises.readdir(pathComponent, {encoding: 'utf-8', withFileTypes: true});
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      const pathFileComponent = path.join(pathComponent, file.name);
      const component = await fs.promises.readFile(pathFileComponent, 'utf-8');
      const data = await fs.promises.readFile(pathIndex, 'utf-8');
      const addComponents = data.split(`{{${file.name.slice(0, file.name.lastIndexOf(path.extname(file.name)))}}}`).join(component);
      fs.promises.writeFile(pathIndex, addComponents);
    }
  }
})();

(async () => {
  fs.promises.writeFile(pathNewStyles, '');
  const filesStyle = await fs.promises.readdir(pathStyles, {encoding: 'utf-8', withFileTypes: true});
  for (let file of filesStyle) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const pathFileStyles = path.join(pathStyles, file.name);
      const styles = await fs.promises.readFile(pathFileStyles, 'utf-8');
      fs.promises.appendFile(pathNewStyles, styles);
    }
  }
})();

(async () => {
  const assets = await fs.promises.readdir(__dirname, {encoding: 'utf-8', withFileTypes: true});
  assets.forEach(folder => {
    if (folder.isDirectory() && folder.name === 'assets') {
      const pathThisFolder = path.join(__dirname, folder.name);
      verification(pathThisFolder, pathAssets);
    }
  });
})();

const verification = async (pathOldFolder, pathNewFolder) => {
  const folders = await fs.promises.readdir(pathOldFolder, {encoding: 'utf-8', withFileTypes: true});
  for (let folder of folders) {
    if (folder.isFile()) {
      const folderCopy = path.join(pathOldFolder, folder.name);
      await fs.promises.copyFile(folderCopy, path.join(pathNewFolder, folder.name));
    } else {
      const pathCreateFolder = path.join(pathNewFolder, folder.name);
      await fs.promises.mkdir(pathCreateFolder, {recursive: true});
      const pathFolder = path.join(pathOldFolder, folder.name);
      verification(pathFolder, pathCreateFolder);
    }
  }
};