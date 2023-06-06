const fs = require("fs");
const path = require("path");

function extractLinksFromFile(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    fs.readFile(absolutePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match = linkRegex.exec(data);

        while (match !== null) {
          const text = match[1];
          const url = match[2];
          const ruta = absolutePath;
          links.push({ text, url, ruta });
          match = linkRegex.exec(data);
        }

        if (links.length === 0) {
          console.log("No se encontraron enlaces en el archivo");
        }

        resolve(links);
      }
    });
  });
}

module.exports = {
  extractLinksFromFile,
};
