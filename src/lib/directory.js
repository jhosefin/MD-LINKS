const fs = require("fs");
const path = require("path");

function isFile(filePath) {
  return new Promise((resolve) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats.isFile());
      }
    });
  });
}

function isDirectory(dirPath) {
  return new Promise((resolve) => {
    fs.stat(dirPath, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
}

// leyendo paths del directorio de manera sincrona
function readDirectoryRecursively(directorioPath) {
  let arrayPathFiles = [];

  if (isFile(directorioPath)) {
    arrayPathFiles.push(directorioPath);
  } else {
    const files = fs.readdirSync(directorioPath);
    files.forEach((file) => {
      const filePath = path.join(directorioPath, file);
      arrayPathFiles = arrayPathFiles.concat(readDirectoryRecursively(filePath));
    });
  }
  return arrayPathFiles;
}

// estrayendo archivos con extensión .md

function searchMd(file) {
  return path.extname(file) === ".md";
}

module.exports = {
  isDirectory,
  isFile,
  readDirectoryRecursively,
  searchMd,
};
