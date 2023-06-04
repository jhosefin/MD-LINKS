/* const fs = require("fs");
const path = require("path");

const filePath = "primer-reto.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);

  const extension = path.extname(filePath);
  if (extension) {
    console.log(extension);
  } else {
    console.log("No se encontró la extensión del archivo.");
  }
}); */

const fs = require("fs");
const path = require("path");

// verificando si es absoluta

function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

const absolutePath1 = "/path/to/file.txt";
const relativePath1 = "./path/to/file.txt";

console.log(isAbsolutePath(absolutePath1)); // true
console.log(isAbsolutePath(relativePath1)); // false

// Leer un archivo y mostrar su contenido en la consola
fs.readFile("src/primer-reto.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

// Obtener la extensión de un archivo
const fileExtension = path.extname("src/primer-reto.txt");
console.log(fileExtension);

// Obtener el contenido de un directorio
const directoryPath = path.join(__dirname, "../test-files");
console.log("aqui el join");
console.log(directoryPath);
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("errorsote");
    console.error(err);
    return;
  }

  console.log(files);
});

// Unir dos rutas
const basePath = "../test-files/carpeta/carpeta2/";
const subPath = "./archivo0.js";
const joinedPath = path.join(basePath, subPath);
console.log(joinedPath);

// Crear una promesa
const readFilePromise = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

readFilePromise("src/primer-reto.txt")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

function extractLinksFromFile(filePath) {
  const absolutePath8 = path.resolve(filePath);
  const markdownContent = fs.readFileSync(absolutePath8, "utf8");
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  const match = linkRegex.exec(markdownContent);

  if (match !== null) {
    const text = match[1];
    const url = match[2];
    const ruta = absolutePath8;
    links.push({ text, url, ruta });
  } else {
    console.log("no hay link");
  }

  console.log(links);
}

const otrofilePath = path.join(__dirname, "../test-files/good-links.md");
extractLinksFromFile(otrofilePath);

function readDirectoryRecursively(directorioPath) {
  console.log("leyendo el directorio");
  const absolutePath = path.resolve(directorioPath);
  const files = fs.readdirSync(absolutePath);

  files.forEach((file) => {
    const filePath = path.join(absolutePath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(filePath) === ".md") {
      console.log(filePath);// Imprimir la ruta del archivo con extensión .md
      extractLinksFromFile(filePath);
    } else if (stat.isDirectory()) {
      readDirectoryRecursively(filePath); // Llamada recursiva para explorar el subdirectorio
    }
  });
}
const testFilesPath = path.join(__dirname, "../test-files");
readDirectoryRecursively(testFilesPath);

// es valida o no el path
function isPathValid(patho) {
  try {
    fs.accessSync(patho);
    return true;
  } catch (error) {
    return false;
  }
}

const filePath = "test-files/combined-links.md";
const isPathValido = isPathValid(filePath);
console.log(`El path ${filePath} es válido: ${isPathValido}`);
