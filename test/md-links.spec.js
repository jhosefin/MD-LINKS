const { MdLinks2 } = require('../src/index2');

describe('MdLinks2', () => {
  test('should return an array of links when validate option is not provided', () => {
    const path = './test-files'; // Ruta de prueba del directorio
    const options = {}; // Opciones vacías, no se realiza validación

    return expect(MdLinks2(path, options)).resolves.toEqual([
      // Aquí debes colocar los resultados esperados del directorio de prueba
      // Asegúrate de que coincidan con los resultados esperados
    ]);
  });

  test('should return an array of validated links when validate option is true', () => {
    const path = './test-files/good-links.md'; // Ruta de prueba del directorio
    const options = { validate: true }; // Opción de validación activada

    return expect(MdLinks2(path, options)).resolves.toEqual([
      // Aquí debes colocar los resultados esperados de los enlaces validados
      // Asegúrate de que coincidan con los resultados esperadoss
        {
            "file": "C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\good-links.md",
            "href": "https://github.com/jhosefin/AIEP-Repo-Proyectos",
            "ok": "ok",
            "status": 200,
            "text": "Repo Aiep 6",
        }
    ]);
  });

  test('should reject with an error for an invalid path', () => {
    const path = 'nonexistent/path'; // Ruta inexistente
    const options = {}; // Opciones vacías

    return expect(MdLinks2(path, options)).rejects.toThrow();
  });
});
