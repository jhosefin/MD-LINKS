const { MdLinks2, ArrayFiles } = require('../src/index');
const axios = require('axios');

jest.mock('axios');

describe('ArrayFiles', () => {
  test('debe retornar un array de links', () => {
    const file = 'test-files/good-links.md';
    return ArrayFiles(file)
      .then((result) => {
        expect(result).toEqual([
            {
              "line": 1,
              "ruta": "test-files/good-links.md",
              "text": "Repo Aiep 6",
              "url": "https://github.com/jhosefin/AIEP-Repo-Proyectos"
            }
        ]);
      })
      .catch(error => {
        return expect(ArrayFiles(file)).rejects.toEqual(error);
      });
  });
});

describe('MdLinks2', () => {
  test('debería resolver correctamente sin opción de validación', () => {
    const path = 'test-files/good-links.md';
    const options = { validate: false };

    return MdLinks2(path, options)
      .then(result => {
        expect(result).toEqual([
          {
            "line": 1,
            "ruta": "test-files/good-links.md",
            "text": "Repo Aiep 6",
            "url": "https://github.com/jhosefin/AIEP-Repo-Proyectos"
          }
        ]);
      })
      .catch(error => {
        return expect(MdLinks2(path, options)).rejects.toEqual(error);
      });
  });

  test('debería resolver correctamente con opción de validación', () => {
    const path = 'test-files/good-links.md';
    const options = { validate: true };

    // Mock de Axios para simular la respuesta de la solicitud HTTP
    axios.get.mockResolvedValueOnce({ status: 200 });

    return MdLinks2(path, options)
      .then(result => {
        expect(result).toEqual([
          {
            "file": "test-files/good-links.md",
            "href": "https://github.com/jhosefin/AIEP-Repo-Proyectos",
            "line": 1,
            "ok": "ok",
            "status": 200,
            "text": "Repo Aiep 6"
          }
        ]);
      })
      .catch(error => {
        return expect(MdLinks2(path, options)).rejects.toEqual(error);
      });
  });

  test('debería rechazar la promesa si el path es inválido', () => {
    const path = 'invalid-path';
    const options = { validate: undefined };

    return MdLinks2(path, options)
      .then(result => {
        // Si la promesa se resuelve, la prueba debería fallar
        throw new Error('La promesa debería haber sido rechazada');
      })
      .catch(error => {
        // Realiza las comprobaciones correspondientes en el error
        return expect(MdLinks2(path, options)).rejects.toEqual(error);
      });
  });
});
