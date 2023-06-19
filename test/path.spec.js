const { isAbsolutePath, isPathValid, toAbsolute } = require("../src/lib/path");

describe("isAbsolutePath", () => {
  test("should return true for absolute path", () => {
    const filePath = "/test-files";
    return expect(isAbsolutePath(filePath)).resolves.toBe(true);
  });

  test("should return false for relative path", () => {
    const filePath = "./test-files/good-links.md";
    return expect(isAbsolutePath(filePath)).resolves.toBe(false);
  });

  test("should return false for invalid path", () => {
    const filePath = "nonexistent/file.txt";
    return expect(isAbsolutePath(filePath)).resolves.toBe(false);
  });
});

describe("isPathValid", () => {
  test("should return true for valid path", () => {
    const filePath = "./test-files/good-links.md";
    return expect(isPathValid(filePath)).resolves.toBe(true);
  });

  test("should return false for invalid path", () => {
    const filePath = "nonexistent/file.txt";
    return expect(isPathValid(filePath)).resolves.toBe(false);
  });
});

describe("toAbsolute", () => {
  test("should resolve to absolute path", () => {
    const route = "./test-files/good-links.md";
    const expectedAbsolutePath = "C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\good-links.md";

    return expect(toAbsolute(route)).resolves.toBe(expectedAbsolutePath);
  });

  test("should reject with error for invalid path", () => {
    const route = "nonexistent/path";

    return expect(toAbsolute(route)).rejects.toThrow();
  });
});