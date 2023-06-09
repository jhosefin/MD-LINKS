const {
  isDirectory,
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
      console.log("La ruta ingresada no existe");
      return;
    }

    const absolutePath = isAbsolutePath(path) ? path : toAbsolute(path);
    if (!absolutePath) {
      console.log("No se pudo convertir la ruta a absoluta");
      return;
    }

    if (isFile(absolutePath)) {
      if (searchMd(absolutePath)) {
        extractLinksFromFile(absolutePath)
          .then((links) => {
            if (options && options.validate) {
              validateLinks(links)
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((error) => {
                  console.error("Error al validar los enlaces:", error);
                  reject(error);
                });
            } else {
              resolve(links);
            }
          })
          .catch((error) => {
            console.error("Error al extraer los enlaces del archivo:", error);
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
                console.log("entrando a validar")
                console.log(validatedLinks)
                resolve(validatedLinks)})
              .catch((error) => {
                console.error("Error al validar los enlaces:", error);
                reject(error);
              });
          } else {
            resolve(links);
          }
        })
        .catch((error) => {
          console.error("Error al extraer los enlaces de los archivos:", error);
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
