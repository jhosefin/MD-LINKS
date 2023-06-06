const fs = require("fs");

const carpetaPath = "carpeta";

try {
  const archivos = fs.readdirSync(carpetaPath);
  archivos.forEach((archivo) => {
    console.log(archivo);
  });
} catch (err) {
  console.error(err);
}
