const fs = require("fs");
const path = require("path");

function extractLinksFromFile(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const lines = data.split('\n');
        const links = [];

        lines.forEach((line, lineNumber) => {
          let match;

          while ((match = linkRegex.exec(line)) !== null) {
            const text = match[1];
            const url = match[2];
            const ruta = filePath;
            const link = { text, url, ruta, line: lineNumber + 1 };
            links.push(link);
          }
        });

        resolve(links);
      }
    });
  });
}

module.exports = {
  extractLinksFromFile,
};
//dividimos esa cadena en líneas utilizando .split('\n'). 
//A continuación, iteramos sobre cada línea y buscamos los enlaces utilizando la expresión regular. 
//Finalmente, resolvemos la promesa con la matriz de enlaces.