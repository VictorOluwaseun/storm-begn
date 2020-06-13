const {
  resolve
} = require("path");
const {
  setDbPath
} = require("./my-modules/crudOperations");

setDbPath(resolve("db/data.json"));