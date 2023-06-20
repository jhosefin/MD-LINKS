const { toAbsolute, isPathValid, isAbsolutePath } = require("./lib/path");
const { readDirectoryRecursively } = require("./lib/directory");
const { extractLinksFromFile } = require("./lib/file");
const { validateLinks } = require("./lib/validate");

const ArrayFiles = (file) => new Promise((resolve, reject) => {
  const arrPathFiles = readDirectoryRecursively(file);
  const arrPromises = arrPathFiles.map((elem) => extractLinksFromFile(elem));

  Promise.all(arrPromises)
    .then((arrLinks) => {
      const ordenado = arrLinks.flat();
      resolve(ordenado);
    })
    .catch((error) => {
      reject(error);
    });
});

const MdLinks2 = (path, options) => new Promise((resolve, reject) => {
  if (isPathValid(path)) {
    const absolutePath = isAbsolutePath(path) ? path : toAbsolute(path);

    if (options === undefined || !options.validate) {
      ArrayFiles(absolutePath)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }

    if (options.validate === true) {
      ArrayFiles(absolutePath)
        .then((res) => validateLinks(res))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }
  } else {
    reject(new Error("error"));
  }
});

module.exports = {
  MdLinks2,
  ArrayFiles,
};
