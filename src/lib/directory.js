const fs = require("fs");
const path = require("path");

// Verifica si la ruta es un archivo
function isFile(filePath) {
  try {
    // Esta función devuelve un objeto que contiene información sobre el archivo, como tamaño, permisos, etc.
    const stats = fs.statSync(filePath);
    // Para ello, utilizamos el método `stats.isFile()`, que devuelve `true` si es un archivo regular, y `false` en caso contrario.
    return stats.isFile();
  } catch (error) {
    // Devolvemos `false` para indicar que el archivo no existe o no es accesible.
    return false;
  }
}


// Lee los archivos y directorios de forma recursiva en el directorio dado
function readDirectoryRecursively(directorioPath) {
  if (isFile(directorioPath)) {
    // Si la ruta es un archivo y tiene extensión .md, lo devuelve en un array
    if (searchMd(directorioPath)) {
      return [directorioPath];
    }
    return [];
  } else {
    // Utilizamos la función `fs.readdirSync` para obtener los contenidos de un directorio de forma síncrona.
// Esta función toma como argumento la ruta del directorio y devuelve un array con los nombres de los archivos y directorios contenidos en él.
// Si ocurre algún error durante la lectura del directorio, se lanzará una excepción.
    const files = fs.readdirSync(directorioPath);
    let arrayPathFiles = [];
    files.forEach((file) => {
      // Utilizamos la función `path.join` para unir el directorio base (`directorioPath`) con el nombre del archivo o directorio (`file`) y obtener la ruta completa del archivo o directorio.
      const filePath = path.join(directorioPath, file);
      // Llama recursivamente a la función para leer subdirectorios y concatena los resultados
      arrayPathFiles = arrayPathFiles.concat(readDirectoryRecursively(filePath));
    });
    return arrayPathFiles;
  }
}

// Verifica si el archivo tiene extensión .md
function searchMd(file) {
  return path.extname(file) === ".md";
}

module.exports = {
  readDirectoryRecursively,
};
