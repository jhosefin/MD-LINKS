#!/usr/bin/env node

const { MdLinks2 } = require("./index");
const { stats, broken } = require("./lib/stats");
var clc = require("cli-color");

const inputArray = process.argv;
const path = inputArray[2];
const validate = inputArray.includes("--validate") || inputArray.includes("-v");
const valStats = inputArray.includes("--stats") || inputArray.includes("-s");
const help = inputArray.includes("--help");

if (inputArray.length <= 2) {
  console.log(clc.blueBright.bold.bgWhite.underline("\nPor favor, introduzca datos con el formato válido. Para solicitar ayuda utilizar el comando '--help' despues de md-links"));
} else if (help) {
  console.log(clc.blue.bold("\nLa libreria md-links necesita ingresar una ruta absoluta o relativa de un archivo o directorio"));
  console.log(clc.blue.bold("para extraer las url y el texto de los links encontrados en los archivos '.md'..\n"));
  console.log("Utilizar el comando "+ clc.yellow.bold("'--validate' o '-v'") + "para saber su estatus http.");
  console.log("Utilizar el comando "+ clc.yellow.bold("'--stats' o '-s'") + "para contabilizar la cantidad total de links y links unicos encontrados en los archivos.");
  console.log("Utilizar la mezcla de ambos comandos para contabilizar cuántos links 'rotos' existen.");
} else if (validate) {
  MdLinks2(path, { validate: true }).then((resValidateMd) => {
    if (valStats) {
      const brokenStats = broken(resValidateMd);
      console.log(clc.blueBright.bold("\nEstadísticas de los enlaces:"));
      console.log(clc.bold("Total:"), brokenStats.total);
      console.log(clc.bold("Unicos:"), brokenStats.unique);
      console.log(clc.bold("Rotos:"), brokenStats.broken);
    } else {
      const responsed = resValidateMd.flat();
      console.log(clc.blueBright.bold("\nResultados de los enlaces validados:"));
      responsed.forEach((link) => {
        console.log(clc.bold("Linea:"), link.line);
        console.log(clc.bold("Ruta:"), link.file);
        console.log(clc.bold("URL:"), link.href);
        console.log(clc.bold("Texto:"), link.text);
        console.log(clc.bold("Estado:"), link.status);
        console.log(clc.bold("Mensaje:"), link.ok);
        console.log(clc.blue.bold("---"));
      });
    }
  });
} else if (valStats) {
  MdLinks2(path, { validate: false }).then((resStatsMd) => {
    const statistics = stats(resStatsMd);
    console.log(clc.blueBright.bold("\nEstadísticas de los enlaces:"));
    console.log(clc.bold("Total:"), statistics.total);
    console.log(clc.bold("Unicos:"), statistics.unique);
  });
} else if (inputArray.length === 3) {
  MdLinks2(path, { validate: false }).then((response) => {
    console.log(clc.blueBright.bold("\nResultados de los enlaces:"));
    response.forEach((link) => {
      console.log(clc.bold("Linea:"), link.line);
      console.log(clc.bold("Ruta:"), link.ruta);
      console.log(clc.bold("URL:"), link.url);
      console.log(clc.bold("Texto:"), link.text);
      console.log(clc.green.bold("---"));
    });
  }).catch((error) => {
    console.error(clc.redBright.bold.bgWhite.underline("\nSe produjo un error durante la ejecución verifica la ruta:"));
    console.log(error.message);
  });
} else {
  console.log(clc.blueBright.bold.bgWhite.underline("\nPor favor, introduzca datos con el formato válido. Para solicitar ayuda utilizar el comando '--help'"));
}
