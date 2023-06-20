const axios = require("axios");
const { validateLinks } = require("../src/lib/validate");

jest.mock("axios");

describe("validateLinks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should validate links and return results", () => {
    const links = [
      {
        text: "Repo Aiep 1",
        url: "https://github.com/jhosefin/AIEP-Repo-Proyecto",
        ruta: "test-files\\carpeta\\carpeta2\\archivoprueba.md",
      },
      {
        text: "Repo Aiep 2",
        url: "https://github.com/jhosefin/AIEP-Repo-Proyectos",
        ruta: "test-files\\carpeta\\carpeta2\\carpeta3\\otro.md",
      },
    ];

    const mockResponse1 = { status: 200 };
    const mockResponse2 = { response: { status: 404 } };
    axios.get.mockResolvedValueOnce(mockResponse1).mockRejectedValueOnce(mockResponse2);

    return validateLinks(links).then((results) => {
      expect(results).toEqual([
        {
          href: "https://github.com/jhosefin/AIEP-Repo-Proyecto",
          text: "Repo Aiep 1",
          file: "test-files\\carpeta\\carpeta2\\archivoprueba.md",
          status: 200,
          ok: "ok",
        },
        {
          href: "https://github.com/jhosefin/AIEP-Repo-Proyectos",
          text: "Repo Aiep 2",
          file: "test-files\\carpeta\\carpeta2\\carpeta3\\otro.md",
          status: 404,
          ok: "fail",
        },
      ]);

      // Verificar que se llamó a axios.get con las URLs correspondientes
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith("https://github.com/jhosefin/AIEP-Repo-Proyecto");
      expect(axios.get).toHaveBeenCalledWith("https://github.com/jhosefin/AIEP-Repo-Proyectos");
    });
  });
});
