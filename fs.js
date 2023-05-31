const fs = require("fs");
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
});
