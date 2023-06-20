const axios = require("axios");
const { MdLinks2, ArrayFiles } = require("../src/index");

jest.mock("axios");

describe("ArrayFiles", () => {
  test("debe retornar un array de links", () => {
    const file = "test-files/good-links.md";
    const link = [
      {
        line: 1,
        ruta: "test-files/good-links.md",
        text: "Repo Aiep 6",
        url: "https://github.com/jhosefin/AIEP-Repo-Proyectos",
      },
    ];
    return expect(ArrayFiles(file)).resolves.toEqual(link);
  });
});

describe("MdLinks2", () => {
  test("debería resolver correctamente sin opción de validación", () => {
    const path = "test-files/good-links.md";
    const options = { validate: false };
    const link = [
      {
        line: 1,
        ruta: "test-files/good-links.md",
        text: "Repo Aiep 6",
        url: "https://github.com/jhosefin/AIEP-Repo-Proyectos",
      },
    ];
    return expect(MdLinks2(path, options)).resolves.toEqual(link);
  });

  test("debería resolver correctamente con opción de validación", () => {
    const path = "test-files/good-links.md";
    const options = { validate: true };

    // Mock de Axios para simular la respuesta de la solicitud HTTP
    axios.get.mockResolvedValueOnce({ status: 200 });
    const link = [
      {
        file: "test-files/good-links.md",
        href: "https://github.com/jhosefin/AIEP-Repo-Proyectos",
        line: 1,
        ok: "ok",
        status: 200,
        text: "Repo Aiep 6",
      },
    ];
    return expect(MdLinks2(path, options)).resolves.toEqual(link);
  });

  test("debería rechazar la promesa si el path es inválido", () => {
    const path = "invalid-path";
    const options = { validate: undefined };

    return expect(MdLinks2(path, options)).rejects.toThrow();
  });
});
