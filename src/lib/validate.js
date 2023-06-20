const axios = require("axios");

function validateLinks(array) {
  const requests = array.map((link) => axios
    .get(link.url)
    .then((res) => {
      const respuesta = res.status;
      if (respuesta >= 200 && respuesta <= 400) {
        return {
          line: link.line,
          href: link.url,
          text: link.text,
          file: link.ruta,
          status: respuesta,
          ok: "ok",
        };
      }
      return {
        line: link.line,
        href: link.url,
        text: link.text,
        file: link.ruta,
        status: res.status,
        ok: "fail",
      };
    })
    .catch((error) => ({
      line: link.line,
      href: link.url,
      text: link.text,
      file: link.ruta,
      status: error.response ? error.response.status : null,
      ok: "fail",
    })));

  return Promise.all(requests);
}

module.exports = {
  validateLinks,
};
