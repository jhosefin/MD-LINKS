const { isAbsolutePath, isPathValid, toAbsolute } = require("../src/lib/path");
const fs = require("fs");

jest.mock("fs", () => ({
  access: jest.fn((path, callback) => {
    // Simular aquí el comportamiento de fs.access
    if (path === "/test-files") {
      callback(null);
    } else {
      callback(new Error("Path does not exist"));
    }
  }),
  realpath: jest.fn((path, callback) => {
    // Simular aquí el comportamiento de fs.realpath
    const absolutePath = "C:\\Users\\Rebeca\\Desktop\\Laboratoria\\Proyecto 4\\MD-LINKS\\test-files\\good-links.md";
    callback(null, absolutePath);
  }),
}));

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

