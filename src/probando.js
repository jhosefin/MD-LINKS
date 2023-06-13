const { MdLinks } = require("./index");
const { MdLinks2 } = require("./index2");

MdLinks2("test-files",  { validate: false })
.then((resolve) =>{
console.log(resolve);
})
.catch((error) =>{
console.log(error);
})
