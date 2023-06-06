const {
  isDirectory,
  isFile,
  /* readDirectoryRecursively, */
  searchMd,
} = require("./lib/directory");

const { extractLinksFromFile } = require("./lib/file");
const { /* toAbsolute, */ isPathValid, isAbsolutePath } = require("./lib/path");

const MdLinks = (path, options) => new Promise((resolve, reject) => {
  console.log("HOLA AQUI ANDO");
  const absolute = isAbsolutePath(path);
  if (isPathValid(absolute)) {
    if (isFile(absolute)) {
      if (searchMd(absolute)) {
        const links = extractLinksFromFile(absolute);
        links.then((res) => {
          if (options.validate) {
            /* const validate = urlStatus(res); */
            /* validate.then((response) => { resolve(response); }); */
            console.log("validandoo....");
          } else {
            resolve(res);
          }
        });
      } else { console.error("La ruta ingresada no pertenece a un archivo .md"); }
    } else if (isDirectory(absolute)) {
      console.log("La ruta corresponde a un directorio, por favor ingresar la ruta de un archivo.");
    }
  } else {
    reject(new Error("La ruta ingresada no existe"));
  }
});

module.exports = {
  MdLinks,
};
