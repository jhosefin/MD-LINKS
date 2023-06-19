const {
  isFile,
  readDirectoryRecursively,
  searchMd,
} = require("./lib/directory");
const { extractLinksFromFile } = require("./lib/file");
const { toAbsolute, isPathValid, isAbsolutePath } = require("./lib/path");
const { validateLinks } = require("./lib/validate")

const MdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!isPathValid(path)) {
      reject(error);
    }

    const absolutePath = isAbsolutePath(path) ? path : toAbsolute(path);
    if (!absolutePath) {
      reject(error);
    }

    if (isFile(absolutePath)) {
      if (searchMd(absolutePath)) {
        extractLinksFromFile(absolutePath)
          .then((links) => {
            if (options && options.validate) {
              validateLinks(links)
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((error) => {
                  reject(error);
                });
            } else {
              resolve(links);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        console.error("La ruta no tiene archivo .md");
      }
    } else if (isDirectory(absolutePath)) {
      const filePaths = readDirectoryRecursively(absolutePath);
      const promises = filePaths.map((file) => {
        if (searchMd(file)) {
          return extractLinksFromFile(file);
        }
        return Promise.resolve([]);
      });
      Promise.all(promises)
        .then((linksArrays) => {
          const links = linksArrays.flat();
          if (options && options.validate) {
            validateLinks(links)
              .then((validatedLinks) => {
                resolve(validatedLinks)})
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(links);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      console.error("La ruta no es un archivo ni un directorio");
    }
  });
};

module.exports = {
  MdLinks,
};
