# MD-Links

Esta libreria es una herramienta que usa Node.js, para leer y analizar archivos en formato Markdown, y asi verificar los links que contengan y reportar algunas estadísticas.

## Descripción 

 

<img src="diagrama.png">

## Uso
* `md-links --help`

Se imprime las instrucciones para el uso:
```La libreria md-links necesita ingresar una ruta absoluta o relativa de un archivo o directorio
para extraer las url y el texto de los links encontrados en los archivos '.md'.

* Utilizar el comando '--validate' o '-v' para saber su estatus http.
* Utilizar el comando '--stats' o '-s' para contabilizar la cantidad total de links y links unicos encontrados en los archivos.
* Utilizar la mezcla de ambos comandos para contabilizar cuántos links 'rotos' existen.
```

* `md-links <path>`

Se imprime la información de los link encontrados:
```
$ md-links ./some/example.md
---
Linea: 1
Ruta: ./some/example.md
URL: https://algun/link/ejemplo
Texto: Algun link
```
* `md-links <path> -v`

Se imprime la validación de los link con su status:
```
Linea: 1
Ruta: ./some/example.md
URL: https://algun/link/ejemplo
Texto: Algun link
Estado: 404
Mensaje: fail
```

* `md-links <path> -s`

Se imprime la estadistica de los link encontrados:
```
Estadísticas de los enlaces:
Total: 6
Unicos: 2
```

* `md-links <path> -v -s`

Se imprime la estadistica y los link que estan rotos:
```
Estadísticas de los enlaces:
Total: 6
Unicos: 2
Rotos: 3
```

## Instalación

Para instalar y utilizar MD-Links, sigue estos pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org) instalado en tu computadora.
2. Abre una terminal y navega hasta el directorio de tu proyecto.
3. Ejecuta el siguiente comando para instalar el módulo:

```bash
npm install md-links-jhosefin
or with github
npm install jhosefin/md-links

