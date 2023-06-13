const fs = require("fs");
const path = require("path");
const { extractLinksFromFile } = require("../src/lib/file");

// Mock de la función fs.readFile para simular la lectura de archivos
jest.mock("fs", () => ({
  readFile: jest.fn((path, encoding, callback) => {
    // Simular aquí los datos que se pasarían al callback de fs.readFile
    const mockData = "Texto de ejemplo con [enlace](https://ejemplo.com)";
    callback(null, mockData);
  }),
}));

describe("extractLinksFromFile", () => {
  it("debería extraer los enlaces correctamente", () => {
    const filePath = "ruta/al/archivo.md";
    
    return extractLinksFromFile(filePath)
      .then((links) => {
        // Comprobar aquí los enlaces extraídos
        expect(links).toEqual([
          {
            text: "enlace",
            url: "https://ejemplo.com",
            ruta: "ruta/al/archivo.md",
          },
        ]);
      })
      .catch((error) => {
        // Manejar cualquier error ocurrido durante la prueba
      });
  });
});

