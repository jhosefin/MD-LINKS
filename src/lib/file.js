const fs = require("fs");
const path = require("path");

function extractLinksFromFile(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    fs.readFile(absolutePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        //esta expresión regular se utiliza para encontrar y extraer enlaces que siguen el formato [texto](URL) dentro de un texto.
        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const links = [];
        let match = linkRegex.exec(data);

        while (match !== null) {
          const text = match[1];
          const url = match[2];
          const ruta = absolutePath;
          links.push({ text, url, ruta });
          match = linkRegex.exec(data);
        }
        resolve(links);
      }
    });
  });
}

module.exports = {
  extractLinksFromFile,
};
