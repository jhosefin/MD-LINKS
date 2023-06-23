# MD-Links

Esta libreria es una herramienta que usa Node.js, para leer y analizar archivos en formato Markdown, y asi verificar los links que contengan y reportar algunas estadísticas.

## Descripción 

La libreria md-links necesita ingresar una ruta absoluta o relativa de un archivo o directorio para extraer las url y el texto de los links encontrados en los archivos '.md'.
  Utilizar el comando '--validate' o '-v' para saber su estatus http.
  Utilizar el comando '--stats' o '-s' para contabilizar la cantidad total de links y links unicos encontrados en los archivos.
  Utilizar la mezcla de ambos comandos para contabilizar cuántos links 'rotos' existen.
<img src="diagrama.png">

## Instalación

Para instalar y utilizar MD-Links, sigue estos pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org) instalado en tu computadora.
2. Abre una terminal y navega hasta el directorio de tu proyecto.
3. Ejecuta el siguiente comando para instalar el módulo:

```bash
npm install md-links-jhosefin


