const axios = require('axios');
const { validateLinks } = require('./your-module');

jest.mock('axios');

describe('validateLinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should validate links and return results', () => {
    const links = [
      [
        {
          text: 'Repo Aiep 1',
          url: 'https://github.com/jhosefin/AIEP-Repo-Proyecto',
          ruta: 'C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\carpeta\\carpeta2\\archivoprueba.md',
        },
      ],
      [
        {
          text: 'Repo Aiep 2',
          url: 'https://github.com/jhosefin/AIEP-Repo-Proyectos',
          ruta: 'C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\carpeta\\carpeta2\\carpeta3\\otro.md',
        },
      ],
    ];

    const mockResponse = { status: 200 };
    axios.get.mockResolvedValue(mockResponse);

    return validateLinks(links).then((results) => {
      expect(results).toEqual([
        {
          href: 'https://github.com/jhosefin/AIEP-Repo-Proyecto',
          text: 'Repo Aiep 1',
          file: 'C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\carpeta\\carpeta2\\archivoprueba.md',
          status: 200,
          ok: 'ok',
        },
        {
          href: 'https://github.com/jhosefin/AIEP-Repo-Proyectos',
          text: 'Repo Aiep 2',
          file: 'C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\carpeta\\carpeta2\\carpeta3\\otro.md',
          status: 200,
          ok: 'ok',
        },
      ]);

      // Verificar que se llamó a axios.get con las URLs correspondientes
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('https://github.com/jhosefin/AIEP-Repo-Proyecto');
      expect(axios.get).toHaveBeenCalledWith('https://github.com/jhosefin/AIEP-Repo-Proyectos');
    });
  });
});
