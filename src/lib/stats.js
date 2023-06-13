function totalLiks(arrLinks) {
  const total = arrLinks.length;
  return `Total: ${total}`;
}

function uniqueLinks(arrLinks) {
  const unique = new Set(arrLinks.map((element) => element.href));
  return `Unique: ${unique.size}`;
}

function brokenLinks(arrLinks) {
  const broken = arrLinks.filter((element) => element.value.ok === "fail").length;
  return `Broken: ${broken}`;
}

const stats = (array) => {
  let elements = []
  array.forEach((element) => { elements.push(element.href) })
  const unique = [... new Set(elements)]

  return {
    total: elements.length,
    unique: unique.length
  }
}

const broken = (array) => {
  let elements = []
  array.forEach((element) => { elements.push(element.href) })
  const unique = [... new Set(elements)]
  const broken = array.filter((element) => element.ok === 'fail')
    return {
      total: elements.length,
      unique: unique.length,
      broken: broken.length
    }
}

module.exports = {
  totalLiks,
  uniqueLinks,
  brokenLinks,
  stats,
  broken,
};