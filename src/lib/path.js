const fs = require("fs");
const path = require("path");

function isAbsolutePath(filePath) {
  return new Promise((resolve) => {
    resolve(path.isAbsolute(filePath));
  });
}

function isPathValid(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, (err) => {
      resolve(!err);
    });
  });
}

const toAbsolute = (route) => new Promise((resolve, reject) => {
  const absolutePath = path.resolve(route);
  fs.access(absolutePath, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(absolutePath);
    }
  });
});

module.exports = {
  toAbsolute,
  isPathValid,
  isAbsolutePath,
};
