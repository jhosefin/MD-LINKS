#!/usr/bin/env node

const { MdLinks2 } = require("./index2");
const { stats, broken } = require("./lib/stats");

const inputArray = process.argv;
const path = inputArray[2];
const validate = inputArray.includes('--validate') || inputArray.includes('-v');
const valStats = inputArray.includes('--stats') || inputArray.includes('-s');
const help = inputArray.includes('--help');

if (inputArray.length <= 2) {
  console.log('Por favor, introduzca datos con el formato válido. Para solicitar ayuda utilizar el comando "--help"');
} else if (help) {
  console.log('La libreria md-links necesita ingresar una ruta absoluta o relativa de un archivo o directorio');
  console.log('para extraer las url y el texto de los links encontrados en los archivos ".md".');
  console.log('Utilizar el comando "--validate" o "-v" para saber su estatus http.');
  console.log('Utilizar el comando "--stats" o "-s" para contabilizar la cantidad total de links y links unicos encontrados en los archivos.');
  console.log('Utilizar la mezcla de ambos comandos para contabilizar cuántos links "rotos" existen.');
} else if (validate) {
  MdLinks2(path, { validate }).then((resValidateMd) => {
    if (valStats) {
      const brokenStats = broken(resValidateMd);
      console.log('Estadísticas de los enlaces:');
      console.log('Total:', brokenStats.total);
      console.log('Unique:', brokenStats.unique);
      console.log('Broken:', brokenStats.broken);
    } else {
      const responsed = resValidateMd.flat();
      console.log('Resultados de los enlaces validados:');
      responsed.forEach((link) => {
        console.log('Ruta:', link.file);
        console.log('URL:', link.href);
        console.log('Texto:', link.text);
        console.log('Estado:', link.status);
        console.log('OK:', link.ok);
        console.log('---');
      });
    }
  });
} else if (valStats) {
  MdLinks2(path, { validate: false }).then((resStatsMd) => {
    const statistics = stats(resStatsMd);
    console.log('Estadísticas de los enlaces:');
    console.log('Total:', statistics.total);
    console.log('Unique:', statistics.unique);
  });
} else if (inputArray.length === 3) {
  MdLinks2(path, { validate: false }).then((response) => {
    const responsed = response.flat();
    console.log('Resultados de los enlaces:');
    responsed.forEach((link) => {
      console.log('Ruta:', link.ruta);
      console.log('URL:', link.url);
      console.log('Texto:', link.text);
      console.log('---');
    });
  }).catch((error) => { console.log(error.message); });
} else {
  console.log('Por favor, introduzca datos con el formato válido. Para solicitar ayuda utilizar el comando "--help"');
}
