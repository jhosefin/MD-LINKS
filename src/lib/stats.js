
const allStats = (array) => {
  let elements = []
  array.forEach((element) => { elements.push(element.url) })
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
  allStats,
  broken,
};