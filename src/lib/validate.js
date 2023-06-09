const axios = require('axios')

function validateLinks(array) {
  const requests = array.map((element) =>
    axios
      .get(element.url)
      .then((res) => {
        const respuesta = res.status;
        if (respuesta >= 200 && respuesta <= 400) {
          return {
            href: element.url,
            text: element.text,
            file: element.ruta,
            status: respuesta,
            ok: "ok",
          };
        } else {
          return {
            href: element.url,
            text: element.text,
            file: element.ruta,
            /* status: respuesta,
            ok: "fail", */
          };
        }
      })
      .catch((error) => ({
        href: element.url,
        text: element.text,
        file: element.ruta,
        status: error.response ? error.response.status : null,
        ok: "fail",
      }))
  );
  return Promise.all(requests);
}

module.exports = {
  validateLinks,
};
