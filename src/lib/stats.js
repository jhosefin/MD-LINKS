const stats = (array) => {
  const elements = [];
  array.forEach((element) => { elements.push(element.url); });
  const unique = [...new Set(elements)];
  return {
    total: elements.length,
    unique: unique.length,
  };
};

const broken = (array) => {
  const elements = [];
  array.forEach((element) => { elements.push(element.href); });
  const unique = [...new Set(elements)];
  const brokens = array.filter((element) => element.ok === "fail");
  return {
    total: elements.length,
    unique: unique.length,
    broken: brokens.length,
  };
};

module.exports = {
  stats,
  broken,
};
