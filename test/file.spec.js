const { extractLinksFromFile } = require("../src/lib/file");

describe("extractLinksFromFile", () => {
  test("should extract links from file", () => {
    const filePath = "./test-files/good-links.md";
    const expectedLinks = [
      { text: "Repo Aiep 6", url: "https://github.com/jhosefin/AIEP-Repo-Proyectos", ruta: "C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\good-links.md" },
    ];
    return expect(extractLinksFromFile(filePath)).resolves.toEqual(expectedLinks);
  });

  test("should resolve with empty array for file without links", () => {
    const filePath = "./test-files/carpeta/este.md";
    return expect(extractLinksFromFile(filePath)).resolves.toEqual([]);
  });

  test("should reject with error for invalid file", () => {
    const filePath = "nonexistent/file.md";
    return expect(extractLinksFromFile(filePath)).rejects.toThrow();
  });
});
