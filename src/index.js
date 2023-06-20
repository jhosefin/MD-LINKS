const { toAbsolute, isPathValid, isAbsolutePath } = require("./lib/path");
const { readDirectoryRecursively } = require("./lib/directory");
const { extractLinksFromFile } = require("./lib/file");
const { validateLinks } = require("./lib/validate");

const ArrayFiles = (file) => {
    return new Promise((resolve, reject) => {
        const arrPathFiles = readDirectoryRecursively(file);
        const arrPromises = arrPathFiles.map(elem => extractLinksFromFile(elem));
        
        Promise.all(arrPromises)
            .then((arrLinks) => {
                const ordenado = arrLinks.flat();
                resolve(ordenado);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const MdLinks2 = (path, options) => {
    return new Promise((resolve, reject) => {
        if(isPathValid(path)) {
            const absolutePath = isAbsolutePath(path) ? path : toAbsolute(path)
            .catch((error) => reject(error));
            if(options === undefined || !options.validate){
                return ArrayFiles(absolutePath)
                .then(response => resolve(response))
                .catch(err => reject(err))
            }
            if(options.validate === true){
                return ArrayFiles(absolutePath)
                .then((res) => {
                    validateLinks(res)
                        .then(resp => resolve(resp));
                })
                .catch(err => reject(err))
            }

        }else {
            reject(error)
        }
    });
};

module.exports = {
  MdLinks2,
  ArrayFiles,
};