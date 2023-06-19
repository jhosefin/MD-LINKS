const axios = require('axios')

function validateLinks(array) {
  const requests = array.reduce((acc, links) => {
    const linkRequests = links.map((link) => {
      return axios
        .get(link.url)
        .then((res) => {
          const respuesta = res.status;
          if (respuesta >= 200 && respuesta <= 400) {
            return {
              href: link.url,
              text: link.text,
              file: link.ruta,
              status: respuesta,
              ok: "ok",
            };
          } else {
            return {
              href: link.url,
              text: link.text,
              file: link.ruta,
              status: res.status,
              ok: "fail",
            };
          }
        })
        .catch((error) => ({
          href: link.url,
          text: link.text,
          file: link.ruta,
          status: error.response ? error.response.status : null,
          ok: "fail",
        }));
    });

    return [...acc, ...linkRequests];
  }, []);

  return Promise.all(requests);
}

module.exports = {
  validateLinks,
};
