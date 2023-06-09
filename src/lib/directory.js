const fs = require("fs");
const path = require("path");

function isFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.isFile();
  } catch (error) {
    console.log(error);
    return false;
  }
}

function isDirectory(dirPath) {
  try {
    const stats = fs.statSync(dirPath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

// leyendo paths del directorio de manera sincrona
function readDirectoryRecursively(directorioPath) {
  if (isFile(directorioPath)) {
    if (searchMd(directorioPath)) {
      return [directorioPath];
    }
    return [];
  } else {
    const files = fs.readdirSync(directorioPath);
    let arrayPathFiles = [];
    files.forEach((file) => {
      const filePath = path.join(directorioPath, file);
      arrayPathFiles = arrayPathFiles.concat(readDirectoryRecursively(filePath));
    });
    return arrayPathFiles;
  }
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
