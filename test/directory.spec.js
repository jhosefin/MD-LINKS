const {
  isDirectory, isFile, readDirectoryRecursively, searchMd,
} = require("../src/lib/directory");

describe("isFile", () => {
  test("should return true for existing file", () => {
    const filePath = "./test-files/good-links.md";
    expect(isFile(filePath)).toBe(true);
  });

  test("should return false for non-existing file", () => {
    const filePath = "./test-files/carpeta";
    expect(isFile(filePath)).toBe(false);
  });

  test("should return false for directory", () => {
    const dirPath = "./no-existe/good-links.md";
    expect(isFile(dirPath)).toBe(false);
  });
});

describe("isDirectory", () => {
  test("should return true for existing directory", () => {
    const dirPath = "./test-files/carpeta/carpeta2";
    expect(isDirectory(dirPath)).toBe(true);
  });

  test("should return false for non-existing directory", () => {
    const dirPath = "./test-files/carpeta/carpeta5";
    expect(isDirectory(dirPath)).toBe(false);
  });

  test("should return false for file", () => {
    const filePath = "./test-files/good-links.md";
    expect(isDirectory(filePath)).toBe(false);
  });
});

describe("readDirectoryRecursively", () => {
  test("should return an array of file paths", () => {
    const directoryPath = "./test-files";
    const result = readDirectoryRecursively(directoryPath);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    // Verificar que todos los elementos en el resultado sean archivos
    result.forEach((filePath) => {
      expect(isFile(filePath)).toBe(true);
    });
  });

  test("should return an empty array for non-existing directory", () => {
    const directoryPath = "./vacio";
    const result = readDirectoryRecursively(directoryPath);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  test("should return an empty array for file path", () => {
    const filePath = "./test-files/carpeta/carpeta2/carpeta3/carpeta4";
    const result = readDirectoryRecursively(filePath);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("searchMd", () => {
  test("should return true for file with .md extension", () => {
    const filePath = "./test-files/good-links.md";
    const result = searchMd(filePath);

    expect(result).toBe(true);
  });

  test("should return false for file without .md extension", () => {
    const filePath = "./test-files/carpeta/archivo3.txt";
    const result = searchMd(filePath);

    expect(result).toBe(false);
  });

  test("should return false for directory path", () => {
    const directoryPath = "./vacio";
    const result = searchMd(directoryPath);

    expect(result).toBe(false);
  });
});
